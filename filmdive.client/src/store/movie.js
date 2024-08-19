import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedMovie: null,
  trendingMovies: [],
  theme: null,
  page: null,
  searchResult: [],
};

const movieSlice = createSlice({
  name: "moviesState",
  initialState: initialState,
  reducers: {
    select(state, action) {
      state.selectedMovie = action.payload;
    },
    initialFetchMovies(state, action) {
      state.selectedMovie = action.payload[0];
      state.trendingMovies = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSearchResult(state, action) {
      state.searchResult = action.payload;
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
