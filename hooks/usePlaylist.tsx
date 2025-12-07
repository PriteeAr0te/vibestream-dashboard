import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addSongToPlaylist } from "@/store/slices/playlistSlice";

export function usePlaylist() {
  const dispatch = useDispatch();
  const playlists = useSelector((state: RootState) => state.playlists.playlists);

  const addSong = (playlistId: string, song: any) => {
    dispatch(addSongToPlaylist({ playlistId, songId: song.id }));
  };

  return {
    playlists,
    addSongToPlaylist: addSong,
  };
}
