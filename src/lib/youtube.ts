import { site } from "./site";

export type YoutubeVideo = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
};

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");

/** The channel's "uploads" playlist id: the channel id with its UC prefix swapped for UU. */
export const uploadsPlaylistId = `UU${site.feeds.youtubeChannelId.slice(2)}`;

function parse(xml: string): YoutubeVideo[] {
  return xml
    .split("<entry>")
    .slice(1)
    .map((entry) => {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([^<]*)<\/title>/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (!id || !title || !published) return null;
      return {
        id,
        title: decode(title),
        published,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    })
    .filter((v): v is YoutubeVideo => v !== null)
    .sort((a, b) => b.published.localeCompare(a.published));
}

/**
 * Latest uploads from YouTube's public RSS feeds. No API key is needed. YouTube's feeds fail now
 * and then (404/500, more often from cloud servers), so each attempt alternates between the
 * channel feed and the uploads-playlist feed, and carries its own query string so that a cached
 * failure is never reused. Results are cached for 15 minutes. If every attempt fails the list is
 * empty and the page falls back to YouTube's own embedded player.
 */
export async function latestVideos(limit = 6): Promise<YoutubeVideo[]> {
  const feeds = [
    `https://www.youtube.com/feeds/videos.xml?channel_id=${site.feeds.youtubeChannelId}`,
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${uploadsPlaylistId}`,
  ];
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const res = await fetch(`${feeds[attempt % 2]}&attempt=${attempt}`, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; SiteFeed/1.0)" },
        next: { revalidate: 900 },
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        const videos = parse(await res.text());
        if (videos.length > 0) return videos.slice(0, limit);
      }
    } catch {
      // try the next attempt
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  return [];
}
