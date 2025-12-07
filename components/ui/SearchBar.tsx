"use client";

import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { togglePlay, setTrack, setQueue } from "@/store/slices/playerSlice";
import { useTrendingSongs, Item as SongItem } from "@/hooks/useTrendingSongs";

type Playlist = {
  id: string;
  name: string;
};

type SearchItem = {
  id: string;
  label: string;
  artist?: string;
  type: "song" | "playlist";
  raw: any;
};

export default function SearchBar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const playlists = useSelector((state: RootState) => state.playlists.playlists);
  
  const { data: songs = [], isLoading } = useTrendingSongs("songs", 50);

  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const searchItems: SearchItem[] = useMemo(() => {
    const songItems: SearchItem[] = songs.map(song => ({
      id: song.id,
      label: song.title,
      artist: song.artist,
      type: "song",
      raw: song,
    }));

    const playlistItems: SearchItem[] = playlists.map(pl => ({
      id: pl.id,
      label: pl.name,
      type: "playlist",
      raw: pl,
    }));

    return [...songItems, ...playlistItems];
  }, [songs, playlists]);

  const results = useMemo(() => {
    if (!debounced) return [];
    return searchItems.filter(item =>
      item.label.toLowerCase().includes(debounced.toLowerCase())
    );
  }, [debounced, searchItems]);


const handleClick = (item: SearchItem) => {
  if (item.type === "playlist") {
    router.push(`/playlist/${item.id}`);
  } else if (item.type === "song") {
    const songsOnly = searchItems
      .filter(s => s.type === "song")
      .map(s => s.raw);

    dispatch(setQueue(songsOnly));  
    dispatch(setTrack(item.raw));   
  }

  setQuery("");
};

  return (
    <div className="py-2.5 px-3 min-w-[250px] bg-light rounded-xl flex gap-2 items-center relative">
      <Search size={20} className="text-icon" />
      <input
        type="text"
        placeholder="Search Songs, Playlists..."
        className="w-full bg-transparent outline-none text-foreground placeholder:text-para"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {query && (
        <div className="absolute top-full left-0 w-full mt-1 bg-accent border border-br rounded shadow-lg max-h-64 overflow-y-auto z-50">
          {isLoading ? (
            <p className="p-2 text-para">Loading songs...</p>
          ) : results.length > 0 ? (
            results.map(item => (
              <div
                key={item.id}
                className="p-2 hover:bg-primary/30 cursor-pointer"
                onClick={() => handleClick(item)}
              >
                {item.label}{" "}
                {item.artist && <span className="text-sm text-para">- {item.artist}</span>}
              </div>
            ))
          ) : (
            <p className="p-2 text-para">No search results found</p>
          )}
        </div>
      )}
    </div>
  );
}
