import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../store/movie";
const store = configureStore({
  reducer: { movie: movieSlice },
});
export default store;
