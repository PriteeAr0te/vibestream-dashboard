import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlaybackQuality = "normal" | "high";

export interface UiPreferencesState {
  autoplay: boolean;
  toastEnabled: boolean;
  playbackQuality: PlaybackQuality;
  crossfade: number; 
  recentActivity: boolean;
}

const DEFAULT_STATE: UiPreferencesState = {
  autoplay: true,
  toastEnabled: true,
  playbackQuality: "normal",
  crossfade: 0,
  recentActivity: true,
};

const slice = createSlice({
  name: "uiPreferences",
  initialState: DEFAULT_STATE,
  reducers: {
    setAutoplay(state, action: PayloadAction<boolean>) {
      state.autoplay = action.payload;
    },
    setToastEnabled(state, action: PayloadAction<boolean>) {
      state.toastEnabled = action.payload;
    },
    setPlaybackQuality(state, action: PayloadAction<PlaybackQuality>) {
      state.playbackQuality = action.payload;
    },
    setCrossfade(state, action: PayloadAction<number>) {
      state.crossfade = Math.max(0, Math.min(10, action.payload));
    },
    setRecentActivity(state, action: PayloadAction<boolean>) {
      state.recentActivity = action.payload;
    },
    resetPreferences(state) {
      return DEFAULT_STATE;
    },
  },
});

export const {
  setAutoplay,
  setToastEnabled,
  setPlaybackQuality,
  setCrossfade,
  setRecentActivity,
  resetPreferences,
} = slice.actions;

export default slice.reducer;
