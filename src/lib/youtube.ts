import { youtubeSnapshot } from "@/content/youtubeSnapshot";
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

const asVideo = (id: string, title: string, published: string): YoutubeVideo => ({
  id,
  title,
  published,
  thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
});

/** The official YouTube Data API (needs YOUTUBE_API_KEY). Reliable from any server. */
async function fromApi(key: string): Promise<YoutubeVideo[]> {
  const url =
    "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=12" +
    `&playlistId=${uploadsPlaylistId}&key=${encodeURIComponent(key)}`;
  const res = await fetch(url, { next: { revalidate: 900 }, signal: AbortSignal.timeout(8000) });
  if (!res.ok) return [];
  const data = (await res.json()) as {
    items?: {
      snippet?: { title?: string; publishedAt?: string; resourceId?: { videoId?: string } };
      contentDetails?: { videoPublishedAt?: string };
    }[];
  };
  return (data.items ?? [])
    .map((i) => {
      const id = i.snippet?.resourceId?.videoId;
      const title = i.snippet?.title;
      const published = i.contentDetails?.videoPublishedAt ?? i.snippet?.publishedAt;
      return id && title && published && title !== "Private video" && title !== "Deleted video"
        ? asVideo(id, title, published)
        : null;
    })
    .filter((v): v is YoutubeVideo => v !== null)
    .sort((a, b) => b.published.localeCompare(a.published));
}

/** The public RSS feeds. They fail now and then (404/500), more often from cloud servers. */
async function fromRss(): Promise<YoutubeVideo[]> {
  const feeds = [
    `https://www.youtube.com/feeds/videos.xml?channel_id=${site.feeds.youtubeChannelId}`,
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${uploadsPlaylistId}`,
  ];
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      // Each attempt has its own query string so a cached failure is never reused.
      const res = await fetch(`${feeds[attempt % 2]}&attempt=${attempt}`, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; SiteFeed/1.0)" },
        next: { revalidate: 900 },
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        const videos = parse(await res.text());
        if (videos.length > 0) return videos;
      }
    } catch {
      // try the next attempt
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  return [];
}

/**
 * Latest uploads, best source first: the YouTube Data API when YOUTUBE_API_KEY is set, then the
 * public RSS feeds, then a saved list (scripts/update-youtube-snapshot.mjs) so the section never
 * comes up empty when YouTube refuses the server. Results are cached for 15 minutes.
 */
export async function latestVideos(limit = 6): Promise<YoutubeVideo[]> {
  const key = process.env.YOUTUBE_API_KEY?.trim();
  if (key) {
    try {
      const videos = await fromApi(key);
      if (videos.length > 0) return videos.slice(0, limit);
    } catch {
      // fall through to the next source
    }
  }
  const rss = await fromRss();
  if (rss.length > 0) return rss.slice(0, limit);
  return youtubeSnapshot.slice(0, limit).map((v) => asVideo(v.id, v.title, v.published));
}
