"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import { Heart, Play } from "lucide-react";
import { toggleLikedSong } from "@/store/slices/likedSongsSlice";
import { setQueue, setTrack } from "@/store/slices/playerSlice";
import type { Song } from "@/store/slices/likedSongsSlice";

export default function LikedSongsPage() {
  const dispatch = useDispatch();

  const likedSongs = useSelector(
    (state: RootState) => state.likedSongs.items
  );

  const handlePlay = (song: Song) => {
    dispatch(setQueue(likedSongs));
    dispatch(setTrack(song));
  };

  const handleUnlike = (song: Song) => {
    dispatch(toggleLikedSong(song));
  };

  return (
    <div className="w-full p-6 text-foreground">
      <h1 className="text-3xl font-bold mb-6">Liked Songs</h1>

      {likedSongs.length === 0 ? (
        <p className="text-para text-lg">You haven’t liked any songs yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {likedSongs.map((song) => (
            <div
              key={song.id}
              className="flex items-center justify-between bg-accent rounded-xl p-3 transition"
            >
              {/* LEFT: Thumbnail + Info */}
              <div
                className="flex items-center gap-3 cursor-pointer"
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

              {/* RIGHT: Buttons */}
              <div className="flex items-center gap-4">
                {/* PLAY */}
                <button
                  onClick={() => handlePlay(song)}
                  className="p-2 bg-primary rounded-full hover:scale-105 transition"
                >
                  <Play size={18} className="text-white" />
                </button>

                {/* UNLIKE */}
                <button
                  onClick={() => handleUnlike(song)}
                  className="p-2 rounded-full hover:bg-br transition"
                >
                  <Heart size={18} className="text-red-500 fill-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
