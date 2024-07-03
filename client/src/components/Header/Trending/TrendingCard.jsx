import Imdb from "../../Imdb/Imdb";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../../store/movie";
import { motion } from "framer-motion";
export default function TrendingCard({ movie }) {
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.movie.trendingMovies);
  function handleClick(event) {
    const movieId = movie.id;
    const movieToSelect = trending.find((movie) => movie.id == movieId);
    dispatch(movieActions.select(movieToSelect));
  }
  return (
    <motion.li
      className="flex flex-col items-center basis-30 bg-black rounded-xl pb-2 hover:cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
    >
      <img
        className="rounded-xl"
        width={"150px"}
        src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`}
        alt=""
      />
      <p className=" text-highlightdrk text-lg w-32 text-center overflow-ellipsis overflow-hidden whitespace-nowrap pl-3 pr-3">
        {movie.title}
      </p>
      <div className="w-[100%] flex justify-between items-center pr-3">
        <Imdb rating={movie.voteAverage.toFixed(1)} widthStar={20} />
        <p className="text-accentdrk bg-transparentdrk text-sm p-[0.1rem]">
          {movie.releaseYear}
        </p>
      </div>
    </motion.li>
  );
}
