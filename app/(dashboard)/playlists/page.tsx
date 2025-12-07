"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/store";
import { useTrendingSongs } from "@/hooks/useTrendingSongs";
import { addPlaylist } from "@/store/slices/playlistSlice";
import CreatePlaylistModal from "@/components/music/CreatePlaylistModal";

export default function AllPlaylistsPage() {
  const playlists = useSelector((state: RootState) => state.playlists.playlists);
  const dispatch = useDispatch();
  const { data: fetchedPlaylists, isLoading } = useTrendingSongs("playlists", 20);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!fetchedPlaylists) return;
    fetchedPlaylists.forEach((item) => {
      if (!playlists.find(pl => pl.id === item.id)) {
        dispatch(
          addPlaylist({
            id: item.id,
            name: item.title,
            artworkUrl100: item.image,
          })
        );
      }
    });
  }, [fetchedPlaylists, dispatch, playlists]);

  if (isLoading) return <p className="p-4">Loading playlists...</p>;

  return (
    <div className="w-full p-3 lg:p-6 mb-48 sm:mb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">All Playlists</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-80 transition"
        >
          Create Playlist
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((pl) => (
          <Link key={pl.id} href={`/playlist/${pl.id}`}>
            <div className="bg-accent rounded-xl p-3 hover:bg-br transition shadow-sm cursor-pointer">
              <Image
                src={pl.artworkUrl100}
                alt={pl.name}
                width={300}
                height={300}
                className="rounded-md object-cover w-full h-[180px]"
              />
              <p className="mt-2 font-semibold truncate">{pl.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {modalOpen && <CreatePlaylistModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
