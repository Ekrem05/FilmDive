import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: {
    movies: [],
    series: [],
  },
};

const watchlistSlice = createSlice({
  name: "watchlistState",
  initialState: initialState,
  reducers: {
    setWatchlist(state, action) {
      state.items = action.payload;
    },
    clearWatchlist(state, action) {
      state.items = {
        movies: [],
        series: [],
      };
    },
  },
});

export const watchlistActions = watchlistSlice.actions;
export default watchlistSlice.reducer;
