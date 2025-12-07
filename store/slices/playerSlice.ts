import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "./likedSongsSlice";

export interface PlayerState {
  currentTrack: Song | null;
  queue: Song[];
  isPlaying: boolean;
}

const initialState: PlayerState = {
  currentTrack: null,
  queue: [],
  isPlaying: false,
};

const PERSIST_KEY = "vibe_player_state_v1";

function loadState(): PlayerState {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return initialState;
    return JSON.parse(raw) as PlayerState;
  } catch {
    return initialState;
  }
}

function saveState(state: PlayerState) {
  try {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(state));
  } catch {}
}

const preloadedState: PlayerState = loadState();

export const playerSlice = createSlice({
  name: "player",
  initialState: preloadedState,
  reducers: {
    setTrack: (state, action: PayloadAction<Song>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
      saveState(state);
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
      saveState(state);
    },
    setQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload;
      saveState(state);
    },
    playNext: (state) => {
      if (!state.queue.length) return;
      const currentIndex = state.currentTrack
        ? state.queue.findIndex((s) => s.id === state.currentTrack?.id)
        : -1;
      const nextIndex = (currentIndex + 1) % state.queue.length;
      state.currentTrack = state.queue[nextIndex];
      state.isPlaying = true;
      saveState(state);
    },
    playPrev: (state) => {
      if (!state.queue.length) return;
      const currentIndex = state.currentTrack
        ? state.queue.findIndex((s) => s.id === state.currentTrack?.id)
        : 0;
      const prevIndex =
        (currentIndex - 1 + state.queue.length) % state.queue.length;
      state.currentTrack = state.queue[prevIndex];
      state.isPlaying = true;
      saveState(state);
    },
  },
});

export const { setTrack, togglePlay, setQueue, playNext, playPrev } =
  playerSlice.actions;
export default playerSlice.reducer;
