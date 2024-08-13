import { movieActions } from "@/store/movie";
import { IoSunnyOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { PiMoonStarsDuotone } from "react-icons/pi";

export default function ThemeButton() {
  const theme = useSelector((state) => state.movie.theme);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(movieActions.setTheme(theme === "light" ? "dark" : "light"));
  }
  return (
    <button
      className={`fixed bottom-20 ${
        theme === "light" ? "bg-black" : "bg-white"
      } right-5 p-5 rounded-full`}
      onClick={handleClick}
    >
      {theme === "dark" ? (
        <IoSunnyOutline className="size-6 text-black " />
      ) : (
        <PiMoonStarsDuotone className="size-6 text-base" />
      )}
    </button>
  );
}
