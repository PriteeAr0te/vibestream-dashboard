"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Heart, Plus } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { toggleLikedSong } from "@/store/slices/likedSongsSlice";
import { togglePlay, playNext, playPrev } from "@/store/slices/playerSlice";
import { PlaylistSelectModal } from "@/components/music/PlaylistSelectModal";

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((s: RootState) => s.player);
  const likedSongs = useSelector((s: RootState) => s.likedSongs.items);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showModal, setShowModal] = useState(false);

  const isLiked = !!currentTrack && likedSongs.some((s) => s.id === currentTrack.id);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.preview || "/fallback.mp3";
    audio.volume = volume;
    audio.load();

    if (isPlaying) audio.play().catch(() => {});
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    isPlaying ? audio.play().catch(() => {}) : audio.pause();
  }, [isPlaying]);

  const handleEnded = useCallback(() => {
    dispatch(playNext());
  }, [dispatch]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    setProgress(audio.currentTime / audio.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    const value = +e.target.value;
    audio.currentTime = value * audio.duration;
    setProgress(value);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="fixed bottom-1 left-0 w-full bg-accent border-t border-br p-3 flex flex-col md:flex-row items-center justify-between gap-3 z-50">
        
        <div className="flex items-center gap-3">
          {currentTrack ? (
            <Image
              src={currentTrack.image || "/fallback.jpg"}
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
            <button onClick={() => dispatch(playPrev())} className="p-2 hover:bg-br rounded-full">
              <SkipBack size={20} />
            </button>

            <button onClick={() => dispatch(togglePlay())} className="p-2 bg-primary rounded-full hover:scale-105">
              {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
            </button>

            <button onClick={() => dispatch(playNext())} className="p-2 hover:bg-br rounded-full">
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
            disabled={!currentTrack}
            onClick={() => dispatch(toggleLikedSong(currentTrack!))}
            className="p-2 rounded-full hover:bg-br disabled:opacity-40"
          >
            {isLiked ? (
              <Heart size={18} className="fill-red-500 text-red-500" />
            ) : (
              <Heart size={18} />
            )}
          </button>

          <button
            disabled={!currentTrack}
            onClick={() => setShowModal(true)}
            className="p-2 rounded-full hover:bg-br disabled:opacity-40"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {showModal && currentTrack && (
        <PlaylistSelectModal song={currentTrack} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
