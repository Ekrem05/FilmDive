import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../store/movie";
import browseSlice from "../store/browse";
import watchlistSlice from "../store/watchlist";
const store = configureStore({
  reducer: {
    movie: movieSlice,
    browse: browseSlice,
    watchlist: watchlistSlice,
  },
});
export default store;
