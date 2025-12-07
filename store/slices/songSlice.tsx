import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  id: string;
  title: string;
  artist: string;
  image?: string;
  preview?: string;
}

interface SongState {
  allSongs: Song[];
}

const initialState: SongState = {
  allSongs: [],
};

export const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.allSongs = action.payload;
    },
    addSong: (state, action: PayloadAction<Song>) => {
      state.allSongs.push(action.payload);
    },
  },
});

export const { setSongs, addSong } = songSlice.actions;
export default songSlice.reducer;
