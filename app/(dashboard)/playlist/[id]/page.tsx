"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { RootState } from "@/store";
import { setQueue, setTrack } from "@/store/slices/playerSlice";
import {
  setAllSongs,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "@/store/slices/playlistSlice";
import { useTrendingSongs } from "@/hooks/useTrendingSongs";
import { Trash2, Play } from "lucide-react";
import { useParams } from "next/navigation";
import Spinner from "@/components/common/Spinner";

export default function PlaylistPage() {
  const { id: playlistId } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const playlist = useSelector((state: RootState) =>
    state.playlists.playlists.find((pl) => pl.id === playlistId)
  );
  const allSongs = useSelector((state: RootState) => state.playlists.allSongs);

  const { data: mockSongs } = useTrendingSongs("songs", 20);

  useEffect(() => {
    if (!mockSongs) return;

    dispatch(
      setAllSongs(
        mockSongs.map((s) => ({
          id: s.id,
          name: s.title,
          artist: s.artist,
          artworkUrl100: s.image,
        }))
      )
    );
  }, [mockSongs, dispatch]);

  useEffect(() => {
    if (!playlist || !mockSongs) return;

    if (playlist.songs.length === 0) {
      const firstSongs = mockSongs.slice(0, 20).map((s) => s.id);
      firstSongs.forEach((songId) =>
        dispatch(addSongToPlaylist({ playlistId, songId }))
      );
    }
  }, [playlist, mockSongs, dispatch, playlistId]);

  if (!playlist) return <div className="p-4">
    <Spinner />
  </div>;

  const songs = allSongs.filter((song) => playlist.songs.includes(song.id));

  const toPlayerSong = (s: typeof songs[0]) => ({
    id: s.id,
    title: s.name,
    artist: s.artist,
    image: s.artworkUrl100,
  });

  const playSong = (song: typeof songs[0]) => {
    dispatch(setQueue(songs.map(toPlayerSong)));
    dispatch(setTrack(toPlayerSong(song)));
  };

  return (
    <div className="w-full p-3 lg:p-6 mb-48 sm:mb-24">
      <div className="flex items-center gap-3 lg:p-6 mb-6">
        <Image
          src={playlist.artworkUrl100}
          alt={playlist.name}
          width={160}
          height={160}
          className="rounded-lg border  border-br"
        />
        <div>
          <h1 className="text-3xl font-bold">{playlist.name}</h1>
          <p className="text-sm text-para">{songs.length} Songs</p>
        </div>
      </div>

      <div className="space-y-3">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center justify-between gap-2 bg-accent px-4 py-3 rounded-xl hover:bg-br transition"
          >
            <div className="flex items-center gap-4">
              <Image
                src={song.artworkUrl100}
                alt={song.name}
                width={55}
                height={55}
                className="rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{song.name}</p>
                <p className="text-sm text-para">{song.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Play
                className="cursor-pointer"
                onClick={() => playSong(song)}
              />
              <Trash2
                className="cursor-pointer text-red-400"
                onClick={() =>
                  dispatch(
                    removeSongFromPlaylist({
                      playlistId,
                      songId: song.id,
                    })
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
