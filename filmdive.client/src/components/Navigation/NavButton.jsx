import { movieActions } from "@/store/movie";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function NavButton({ label, link, onClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.movie.page);
  function handleClick() {
    navigate(link);
    onClick();
  }
  function handleRedirect() {
    dispatch(movieActions.setPage(link));
    navigate(link);
  }
  return (
    <>
      {onClick ? (
        <button
          className="text-primaryText text-lg font-default font-light tracking-tighter"
          onClick={handleClick}
        >
          {label}
        </button>
      ) : (
        <button
          className={`text-primaryText border-callToAction hover:bg-callToAction ${
            page === link && "border-b-2 border-callToAction"
          } px-4 py-1 rounded-3xl  text-lg font-default font-light tracking-tighter`}
          onClick={handleRedirect}
        >
          {label}
        </button>
      )}
    </>
  );
}
