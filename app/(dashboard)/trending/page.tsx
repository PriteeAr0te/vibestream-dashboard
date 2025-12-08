"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTrendingSongs } from "../../../hooks/useTrendingSongs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleLikedSong } from "@/store/slices/likedSongsSlice";
import { Play, Heart } from "lucide-react";
import Spinner from "@/components/common/Spinner";
import { setQueue, setTrack } from "@/store/slices/playerSlice";
import type { Song } from "@/store/slices/likedSongsSlice";

export default function ForYouPage() {
  const dispatch = useDispatch();

  const likedSongs = useSelector(
    (state: RootState) => state.likedSongs.items
  );

  const isLiked = (id: string) =>
    likedSongs.some((song) => song.id === id);

  const [limit, setLimit] = useState(10);
  const { data: songs = [], isLoading, isError } =
    useTrendingSongs("songs", limit);

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

  if (isLoading)
    return (
      <div className="p-4">
        <Spinner />
      </div>
    );

  if (isError) return <p className="p-4">Failed to load songs</p>;

  const handlePlay = (song: Song) => {
    dispatch(setQueue(songs));
    dispatch(setTrack(song));
  };

  const handleLike = (song: Song) => {
    dispatch(toggleLikedSong(song));
  };

  return (
    <div className="w-full p-3 lg:p-6 text-foreground mb-48 sm:mb-24">
      <h1 className="text-3xl font-bold mb-6">For You</h1>

      <div className="flex flex-col gap-3">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex sm:flex-row flex-col-reverse gap-y-2 items-center justify-between bg-accent rounded-xl p-3 transition"
          >
            <div
              className="w-full sm:w-fit flex items-center gap-3 cursor-pointer"
              onClick={() => handlePlay(song)}
            >
              <Image
                src={song.image}
                alt={song.title}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />

              <div className="flex flex-col">
                <p className="font-semibold truncate max-w-[200px] sm:max-w-[300px]">
                  {song.title}
                </p>
                <p className="text-sm text-para truncate max-w-[200px] sm:max-w-[300px]">
                  {song.artist}
                </p>
              </div>
            </div>

            <div className="sm:w-fit w-full flex sm:justify-start justify-end items-center gap-4">

              <button
                onClick={() => handlePlay(song)}
                className="p-2 bg-primary rounded-full hover:scale-105 transition"
              >
                <Play size={18} className="text-white" />
              </button>

              <button
                onClick={() => handleLike(song)}
                className="p-2 rounded-full hover:bg-br transition"
              >
                {isLiked(song.id) ? (
                  <Heart
                    size={18}
                    className="text-red-500 fill-red-500"
                  />
                ) : (
                  <Heart size={18} className="text-icon" />
                )}
              </button>
            </div>
          </div>
        ))}

        <div ref={loaderRef} className="h-10"></div>
      </div>
    </div>
  );
}
