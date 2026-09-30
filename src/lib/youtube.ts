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

/**
 * Latest uploads from the channel's public RSS feed. No API key is needed. The result is cached
 * and refreshed every 15 minutes; if YouTube cannot be reached the list is empty and the page still renders.
 */
export async function latestVideos(limit = 6): Promise<YoutubeVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${site.feeds.youtubeChannelId}`,
      { next: { revalidate: 900 } },
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    return entries
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
      .sort((a, b) => b.published.localeCompare(a.published))
      .slice(0, limit);
  } catch {
    return [];
  }
}
