import Star from "@/components/Icons/Star";
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
      className="flex flex-col items-center basis-30 hover:bg-primary rounded-2xl transition-colors duration-200 py-4  px-3 pb-2 hover:cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 0.9 }}
    >
      <img
        className="rounded-xl"
        src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`}
        alt=""
      />
      <p className=" text-primaryText 2xl:text-lg  w-32 text-center overflow-ellipsis overflow-hidden whitespace-nowrap pl-1 pr-3">
        {movie.title}
      </p>
      <div className="w-[100%] flex justify-between items-center pr-3">
        <div className={`flex items-center `}>
          <Star className={"w-5 md:w-5 fill-primaryText"} />
          <span className={`text-xs lg:text-lg  `}>
            {movie.voteAverage.toFixed(1)}
          </span>
        </div>
        <p className="text-callToAction bg-transparentdrk text-sm p-[0.1rem]">
          {movie.releaseYear}
        </p>
      </div>
    </motion.li>
  );
}
