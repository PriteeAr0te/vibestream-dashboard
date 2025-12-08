import { useQuery } from "@tanstack/react-query";

export interface Item {
  id: string;
  title: string;
  artist: string;
  image: string;
  preview?: string;
}

export function useTrendingSongs(type: "songs" | "albums" | "playlists", limit = 50) {
  return useQuery({
    queryKey: ["trending", type, limit],
    queryFn: async (): Promise<Item[]> => {
      const res = await fetch(`/api/trending?type=${type}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch trending");
      const data = await res.json();

      const results: Item[] = data.results.map((item: Item) => ({
        id: item.id,
        title: item.title,
        artist: item.artist,
        image: item.image,
        preview: item.preview || "/fallback.mp3",
      }));

      return results;
    },

    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
}
