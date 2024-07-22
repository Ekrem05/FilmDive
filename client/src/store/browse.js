import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredMovies: {
    page: 0,
    data: [],
    totalResults: 0,
  },
  genres: "",
};

const browseSlice = createSlice({
  name: "browsingState",
  initialState,
  reducers: {
    setGenres(state, action) {
      state.genres = action.payload;
    },
    initialFetch(state, action) {
      state.selectedMovie = action.payload[0];
      state.trendingMovies = action.payload;
    },
    loadMore(state, action) {
      state.filteredMovies = {
        page: action.payload.page || state.filteredMovies.page + 1, // Increment page if not provided
        data: [...state.filteredMovies.data, ...action.payload.result], // Append new results
        totalResults:
          action.payload.totalResults || state.filteredMovies.totalResults, // Update total results
      };
    },
    getFirstPage(state, action) {
      state.filteredMovies = {
        page: action.payload.page, // Increment page if not provided
        data: action.payload.result, // Append new results
        totalResults: action.payload.totalResults, // Update total results
      };
    },
  },
});

export const browseActions = browseSlice.actions;
export default browseSlice.reducer;
