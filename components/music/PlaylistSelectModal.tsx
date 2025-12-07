"use client";

import { toast } from "react-toastify";
import { usePlaylist } from "../../hooks/usePlaylist";

export function PlaylistSelectModal({
  song,
  onClose,
}: {
  song: any;
  onClose: () => void;
}) {
  const { playlists, addSongToPlaylist } = usePlaylist();

  const handleSelect = (playlistId: string) => {
    addSongToPlaylist(playlistId, song);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-accent p-4 rounded-xl w-[300px] space-y-3">
        <h2 className="font-semibold text-lg">Add to Playlist</h2>

        {playlists.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No playlists found. Create one!
          </p>
        )}

        <ul className="space-y-2 max-h-[200px] overflow-y-auto">
          {playlists.map((p) => (
            <li
              key={p.id}
              className="p-2 bg-muted rounded cursor-pointer hover:bg-muted-foreground/20"
              onClick={() => {
                handleSelect(p.id);
                toast.success("Song added to playlist");
              }}
            >
              {p.name}
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="w-full py-2 bg-secondary rounded text-sm hover:opacity-75"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
