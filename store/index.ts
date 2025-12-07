import { configureStore } from "@reduxjs/toolkit";
import uiPreferencesReducer, { UiPreferencesState } from "./slices/uiPreferencesSlice";

const PERSIST_KEY = "vibe_ui_preferences_v1";

function loadState(): UiPreferencesState | undefined {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as UiPreferencesState;
  } catch {
    return undefined;
  }
}

function saveState(state: UiPreferencesState) {
  try {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(state));
  } catch {
  }
}

const preloaded = typeof window !== "undefined" ? loadState() : undefined;

export const store = configureStore({
  reducer: {
    uiPreferences: uiPreferencesReducer,
  },
  preloadedState: preloaded ? { uiPreferences: preloaded } : undefined,
});

store.subscribe(() => {
  const state = store.getState();
  saveState(state.uiPreferences);
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
