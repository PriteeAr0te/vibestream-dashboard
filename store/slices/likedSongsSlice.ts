import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Song {
  id: string;
  title: string;
  artist: string;
  image: string;
  preview?: string;
}

export interface LikedSongsState {
  items: Song[];
}

const PERSIST_KEY = "vibe_liked_songs_v1";

// Load from localStorage
function loadState(): LikedSongsState {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return { items: [] };
    return JSON.parse(raw) as LikedSongsState;
  } catch {
    return { items: [] };
  }
}

// Save to localStorage
function saveState(state: LikedSongsState) {
  try {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(state));
  } catch {}
}

const initialState: LikedSongsState = loadState();

export const likedSongsSlice = createSlice({
  name: "likedSongs",
  initialState,
  reducers: {
    toggleLikedSong: (state, action: PayloadAction<Song>) => {
      const exists = state.items.find((song) => song.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((song) => song.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveState(state); // persist immediately
    },
    clearLikedSongs: (state) => {
      state.items = [];
      saveState(state);
    },
  },
});

export const { toggleLikedSong, clearLikedSongs } = likedSongsSlice.actions;
export default likedSongsSlice.reducer;
