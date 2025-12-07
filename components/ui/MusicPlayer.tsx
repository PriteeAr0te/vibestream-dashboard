"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { togglePlay, playNext, playPrev } from "@/store/slices/playerSlice";
import { toggleLikedSong } from "../../store/slices/likedSongsSlice";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const dispatch = useDispatch();

  const { currentTrack, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  const likedSongs = useSelector(
    (state: RootState) => state.likedSongs.items
  );

  const isLiked = currentTrack
    ? likedSongs.some((song) => song.id === currentTrack.id)
    : false;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;
    audio.src = currentTrack.preview || "/fallback.mp3";

    audio.load();

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.warn("Autoplay blocked");
        });
      }
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    setProgress(audio.currentTime / audio.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const newValue = Number(e.target.value);
    audio.currentTime = newValue * audio.duration;
    setProgress(newValue);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  return (
    <>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />

      <div className="fixed bottom-1 left-0 w-full bg-accent border-t border-br p-3 flex flex-col md:flex-row items-center justify-between gap-3 z-50">
        
        <div className="flex items-center gap-3">
          {currentTrack ? (
            <Image
              src={currentTrack.image}
              alt={currentTrack.title}
              width={50}
              height={50}
              className="rounded-md object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-br rounded-md flex items-center justify-center text-sm text-para">
              N/A
            </div>
          )}

          <div className="flex flex-col">
            <p className="font-semibold truncate max-w-[150px]">
              {currentTrack?.title || "No Track Selected"}
            </p>
            <p className="text-sm text-para truncate max-w-[150px]">
              {currentTrack?.artist || "-"}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(playPrev())}
              className="p-2 cursor-pointer hover:bg-br rounded-full transition"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={() => dispatch(togglePlay())}
              className="p-2 cursor-pointer bg-primary rounded-full transition hover:scale-105"
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white" />
              )}
            </button>

            <button
              onClick={() => dispatch(playNext())}
              className="p-2 cursor-pointer hover:bg-br rounded-full transition"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 rounded-lg accent-primary cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-3">

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-20 h-1 rounded-lg accent-primary cursor-pointer"
          />

          <button
            onClick={() =>
              currentTrack && dispatch(toggleLikedSong(currentTrack))
            }
            className="p-2 rounded-full hover:bg-br cursor-pointer transition"
          >
            {isLiked ? (
              <Heart size={18} className="fill-red-500 text-red-500" />
            ) : (
              <Heart size={18} />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
