import IconArrows_remove from "@/components/Icons/IconArrows_remove";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router";
export default function Badge({ genre }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { genres, year, rating, orderBy, cast } = useParams();
  function removeGenre() {
    const root = pathname.split("/")[1];
    navigate(
      `/${root}/${
        genres.includes(" ")
          ? genres
              .split(" ")
              .filter((genres) => genres !== `${genre.id}`)
              .join(" ")
          : "all"
      }/${year ? year : "all"}/${rating ? rating : "all"}/${
        orderBy ? orderBy : "popularity.desc"
      }/${cast ? cast : "all"}`
    );
  }
  return (
    <div className="flex items-center bg-base rounded-xl px-3">
      <p className="text-primaryText">{genre.name}</p>
      <div
        className="text-primaryText text-2xl hover:cursor-pointer"
        onClick={removeGenre}
      >
        <IconArrows_remove />
      </div>
    </div>
  );
}
