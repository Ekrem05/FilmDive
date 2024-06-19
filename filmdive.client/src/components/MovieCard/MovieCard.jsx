import { motion } from "framer-motion";
import Imdb from "../Imdb/Imdb";
import { Link } from "react-router-dom";
import placeholder from "../../assets/MoviePlaceholder.jpg";
import LazyImage from "../Image/LazyImage";
export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <motion.li
        className="flex flex-col max-w-[100%] bg-black rounded-xl pb-2 hover:cursor-pointer "
        whileHover={{ scale: 1.1 }}
      >
        <LazyImage path={movie.posterPath} />
        <p className=" text-highlightdrk text-lg w-64 text-center overflow-ellipsis overflow-hidden whitespace-nowrap pl-3 pr-3">
          {movie.title}
        </p>
        <div className="w-[100%] flex justify-between items-center pr-3">
          {movie.voteAverage > 0 && (
            <Imdb rating={movie.voteAverage.toFixed(1)} widthStar={20} />
          )}
          <p className="text-accentdrk bg-transparentdrk text-sm p-[0.1rem]">
            {movie.releaseYear}
          </p>
        </div>
      </motion.li>
    </Link>
  );
}
