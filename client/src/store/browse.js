import { createSlice } from "@reduxjs/toolkit";
const initialState = { genres: null };

const browseSlice = createSlice({
  name: "browsingState",
  initialState: initialState,
  reducers: {
    setGenres(state, action) {
      state.genres = action.payload;
    },
    initialFetch(state, action) {
      state.selectedMovie = action.payload[0];
      state.trendingMovies = action.payload;
    },
  },
});

export const browseActions = browseSlice.actions;
export default browseSlice.reducer;
