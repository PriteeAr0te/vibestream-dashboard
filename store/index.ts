import { configureStore } from "@reduxjs/toolkit";
import uiPreferencesReducer, { UiPreferencesState } from "./slices/uiPreferencesSlice";
import likedSongsReducer, { LikedSongsState } from "./slices/likedSongsSlice";
import playerReducer from './slices/playerSlice'

const UI_PERSIST_KEY = "vibe_ui_preferences_v1";

function loadUIState(): UiPreferencesState | undefined {
  try {
    const raw = localStorage.getItem(UI_PERSIST_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as UiPreferencesState;
  } catch {
    return undefined;
  }
}

function saveUIState(state: UiPreferencesState) {
  try {
    localStorage.setItem(UI_PERSIST_KEY, JSON.stringify(state));
  } catch {}
}

const preloadedUI = typeof window !== "undefined" ? loadUIState() : undefined;

export const store = configureStore({
  reducer: {
    uiPreferences: uiPreferencesReducer,
    likedSongs: likedSongsReducer,
    player: playerReducer,
  },
  preloadedState: preloadedUI ? { uiPreferences: preloadedUI } : undefined,
});

store.subscribe(() => {
  const state = store.getState();
  saveUIState(state.uiPreferences);
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
