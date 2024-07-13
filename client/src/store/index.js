import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../store/movie";
import browseSlice from "../store/browse";
const store = configureStore({
  reducer: { movie: movieSlice, browse: browseSlice },
});
export default store;
