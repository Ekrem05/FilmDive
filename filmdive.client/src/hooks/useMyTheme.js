import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { movieActions } from "@/store/movie";
import { SaveIcon } from "lucide-react";
export default function useMyTheme() {
  const dispatch = useDispatch();

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === null) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.setItem("theme", "dark");
      dispatch(movieActions.setTheme("dark"));
      return "dark";
    } else {
      localStorage.setItem("theme", "light");
      dispatch(movieActions.setTheme("light"));
      return "light";
    }
  } else {
    localStorage.setItem("theme", savedTheme);
    dispatch(movieActions.setTheme(savedTheme));
    return savedTheme;
  }
}
