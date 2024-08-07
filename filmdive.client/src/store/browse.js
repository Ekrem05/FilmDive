import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredMovies: {
    page: 0,
    data: [],
    totalResults: 0,
    totalPages: 0,
  },
  filteredSeries: {
    page: 0,
    data: [],
    totalResults: 0,
    totalPages: 0,
  },
  genres: null,
};

const browseSlice = createSlice({
  name: "browsingState",
  initialState,
  reducers: {
    setGenres(state, action) {
      state.genres = action.payload;
    },
    removeGenre(state, action) {},
    initialFetchMovies(state, action) {
      state.trendingMovies = action.payload;
    },
    loadMoreMovies(state, action) {
      state.filteredMovies = {
        page: action.payload.page || state.filteredMovies.page + 1, // Increment page if not provided
        data: [...state.filteredMovies.data, ...action.payload.result], // Append new results
        totalResults:
          action.payload.totalResults || state.filteredMovies.totalResults, // Update total results
        totalPages: state.filteredMovies.totalPages,
      };
    },
    getFirstPageMovies(state, action) {
      state.filteredMovies = {
        page: action.payload.page, // Increment page if not provided
        data: action.payload.result, // Append new results
        totalResults: action.payload.totalResults, // Update total results
        totalPages: action.payload.totalPages,
      };
    },
    loadMoreSeries(state, action) {
      state.filteredSeries = {
        page: action.payload.page || state.filteredSeries.page + 1, // Increment page if not provided
        data: [...state.filteredSeries.data, ...action.payload.result], // Append new results
        totalResults:
          action.payload.totalResults || state.filteredSeries.totalResults, // Update total results
        totalPages: state.filteredSeries.totalPages,
      };
    },
    getFirstPageSeries(state, action) {
      state.filteredSeries = {
        page: action.payload.page, // Increment page if not provided
        data: action.payload.result, // Append new results
        totalResults: action.payload.totalResults, // Update total results
        totalPages: action.payload.totalPages,
      };
    },
  },
});

export const browseActions = browseSlice.actions;
export default browseSlice.reducer;
