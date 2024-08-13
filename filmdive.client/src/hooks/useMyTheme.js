import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { movieActions } from "@/store/movie";
export default function useMyTheme(theme) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!theme) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        dispatch(movieActions.setTheme("dark"));
      } else {
        dispatch(movieActions.setTheme("light"));
      }
    }
    dispatch(movieActions.setPage(""));
  }, [theme]);
}
