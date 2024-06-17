import { createSlice } from "@reduxjs/toolkit";
const initialState = { selectedMovie: null, trendingMovies: [] };

const movieSlice = createSlice({
  name: "moviesState",
  initialState: initialState,
  reducers: {
    select(state, action) {
      state.selectedMovie = action.payload;
    },
    initialFetch(state, action) {
      state.selectedMovie = action.payload[0];
      state.trendingMovies = action.payload;
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
