import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPlaylistsFromStorage } from "@/store/slices/playlistSlice";

export function useLoadPlaylists() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaylistsFromStorage());
  }, [dispatch]);
}
