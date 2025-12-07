"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTrendingSongs } from "../../../hooks/useTrendingSongs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleLikedSong } from "../../../store/slices/likedSongsSlice";
import { Play, Heart } from "lucide-react";
import Spinner from "@/components/common/Spinner";

interface Song {
  id: string;
  title: string;
  artist: string;
  image: string;
  preview?: string;
}

export default function ForYouPage() {
  const dispatch = useDispatch();
  const likedSongs = useSelector((state: RootState) => state.likedSongs.items);

  const [limit, setLimit] = useState(10);
  const { data: songs = [], isLoading, isError } = useTrendingSongs("songs", limit);

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && songs.length >= limit) {
          setLimit((prev) => prev + 10);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [songs, limit]);

  if (isLoading) return <p className="p-4"><Spinner /></p>;
  if (isError) return <p className="p-4">Failed to load songs</p>;

  const handleLike = (song: Song) => {
    dispatch(toggleLikedSong(song));
  };

  const isLiked = (id: string) => likedSongs.some((s) => s.id === id);

  return (
    <div className="w-full p-6 text-foreground">
      <h1 className="text-3xl font-bold mb-6">For You</h1>

      <div className="flex flex-col gap-3">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center justify-between bg-accent rounded-xl p-3 hover:bg-br transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Image
                src={song.image}
                alt={song.title}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />

              <div className="flex flex-col">
                <p className="font-semibold truncate max-w-[200px] sm:max-w-[300px]">{song.title}</p>
                <p className="text-sm text-para truncate max-w-[200px] sm:max-w-[300px]">
                  {song.artist}
                </p>
              </div>
            </div>


            <div className="flex items-center gap-4">

              <button
                className="p-2 bg-primary rounded-full hover:scale-105 transition"
                onClick={() => console.log("Play", song.title)}
              >
                <Play size={18} className="text-white" />
              </button>

              <button
                className={`p-2 rounded-full transition ${isLiked(song.id) ? "bg-red-500" : "bg-accent hover:bg-br"
                  }`}
                onClick={() => handleLike(song)}
              >
                <Heart size={18} className="text-white" />
              </button>
            </div>
          </div>
        ))}

        <div ref={loaderRef} className="h-10"></div>
      </div>
    </div>
  );
}
