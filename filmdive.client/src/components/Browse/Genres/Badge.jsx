import IconArrows_remove from "@/components/Icons/IconArrows_remove";
import { useNavigate, useParams } from "react-router";
export default function Badge({ genre }) {
  const navigate = useNavigate();
  const { genres, year, rating, orderBy, cast } = useParams();
  function removeGenre() {
    navigate(
      `/browse/${
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
    <div className="flex items-center bg-secondarydrk rounded-xl px-3">
      <p className="text-highlightdrk">{genre.name}</p>
      <div
        className="text-highlightdrk text-2xl hover:cursor-pointer"
        onClick={removeGenre}
      >
        <IconArrows_remove />
      </div>
    </div>
  );
}
