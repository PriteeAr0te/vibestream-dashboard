import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Song {
  id: string;
  name: string;
  artist: string;
  artworkUrl100: string;
}

export interface Playlist {
  id: string;
  name: string;
  artworkUrl100: string;
  songs: string[];
}

export interface PlaylistsState {
  playlists: Playlist[];
  allSongs: Song[];
}

const initialState: PlaylistsState = {
  playlists: [],
  allSongs: [],
};

const LOCAL_STORAGE_KEY = "playlists";

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    loadPlaylistsFromStorage(state) {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          state.playlists = JSON.parse(saved);
        }
      }
    },
    setAllSongs(state, action: PayloadAction<Song[]>) {
      state.allSongs = action.payload;
    },
    addPlaylist(state, action: PayloadAction<{ id: string; name: string; artworkUrl100: string }>) {
      const { id, name, artworkUrl100 } = action.payload;
      if (!state.playlists.find(p => p.id === id)) {
        state.playlists.push({ id, name, artworkUrl100, songs: [] });
        if (typeof window !== "undefined") localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.playlists));
      }
    },
    addSongToPlaylist(state, action: PayloadAction<{ playlistId: string; songId: string }>) {
      const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
      if (playlist && !playlist.songs.includes(action.payload.songId)) {
        playlist.songs.push(action.payload.songId);
        if (typeof window !== "undefined") localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.playlists));
      }
    },
    removeSongFromPlaylist(state, action: PayloadAction<{ playlistId: string; songId: string }>) {
      const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter(id => id !== action.payload.songId);
        if (typeof window !== "undefined") localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.playlists));
      }
    },
  },
});

export const {
  loadPlaylistsFromStorage,
  setAllSongs,
  addPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
