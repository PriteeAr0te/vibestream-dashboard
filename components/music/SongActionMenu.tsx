"use client";

import { useState } from "react";
import { MoreVertical, Heart, ListPlus } from "lucide-react";
import { PlaylistSelectModal } from "./PlaylistSelectModal";

export default function SongActionsMenu({ song }: { song: any }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="p-2 hover:bg-muted rounded-full"
        onClick={() => setOpenModal(true)}
      >
        <MoreVertical size={18} />
      </button>

      {openModal && (
        <PlaylistSelectModal
          song={song}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
