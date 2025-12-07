export type TopFeedItem = {
  artistName: string;
  id: string;
  name: string;
  artworkUrl100: string;
  url: string;
};

export type SearchResultItem = {
  trackId?: number;
  artistName: string;
  trackName?: string;
  collectionName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  trackTimeMillis?: number;
  kind?: string;
  collectionId?: number;
  trackViewUrl?: string;
};

const ITUNES_SEARCH_BASE = "https://itunes.apple.com/search";
const ITUNES_RSS_BASE = "https://rss.itunes.apple.com/api/v1";

export async function fetchTopSongs(
  country = "in",
  limit = 20
): Promise<TopFeedItem[]> {
  const url = `${ITUNES_RSS_BASE}/${country}/apple-music/top-songs/all/${limit}/explicit.json`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch top songs: ${res.status}`);
  }

  const json = await res.json();
  return (json?.feed?.results ?? []) as TopFeedItem[];
}

export async function searchSongs(
  term: string,
  limit = 25
): Promise<SearchResultItem[]> {
  if (!term || term.trim() === "") return [];
  const q = encodeURIComponent(term.trim());
  const url = `${ITUNES_SEARCH_BASE}?term=${q}&media=music&limit=${limit}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`iTunes search failed: ${res.status}`);
  }

  const json = await res.json();
  return (json?.results ?? []) as SearchResultItem[];
}
