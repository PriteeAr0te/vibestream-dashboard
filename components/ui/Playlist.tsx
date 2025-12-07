"use client";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { setQueue, setTrack } from "@/store/slices/playerSlice";
import type { Song as PlayerSong } from "@/store/slices/likedSongsSlice";

export default function PlaylistPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useDispatch();

  const playlist = useSelector((state: RootState) =>
    state.playlists.playlists.find(p => p.id === id)
  );

  const allSongs = useSelector((state: RootState) => state.playlists.allSongs);

  if (!playlist) return <p className="p-4">Playlist not found.</p>;

  const songs: PlayerSong[] = allSongs
    .filter((song) => playlist.songs.includes(song.id))
    .map((s) => ({ id: s.id, title: s.name, artist: s.artist, image: s.artworkUrl100 }));

  return (
    <div className="w-full p-3 lg:p-6">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={playlist.artworkUrl100}
          alt={playlist.name}
          width={200}
          height={200}
          className="rounded-md"
        />
        <div>
          <h1 className="text-3xl font-bold">{playlist.name}</h1>
          <p className="text-sm text-para">{songs.length} Songs</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div
            key={song.id}
            onClick={() => {
              dispatch(setQueue(songs));
              dispatch(setTrack(song));
            }}
            className="bg-accent rounded-xl p-3 hover:bg-br transition shadow-sm cursor-pointer"
          >
            <Image
              src={song.image}
              alt={song.title}
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-[180px]"
            />
            <p className="mt-2 font-semibold truncate">{song.title}</p>
            <p className="text-sm text-para truncate">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
