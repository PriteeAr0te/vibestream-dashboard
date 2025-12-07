import { useQuery } from "@tanstack/react-query";
import { TopFeedItem } from "../lib/api/itunes";

export function useTrendingSongs() {
  return useQuery<TopFeedItem[]>({
    queryKey: ["trending-songs"],
    queryFn: async () => {
      const res = await fetch("/api/trending");
      if (!res.ok) throw new Error("Failed to fetch trending");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}
