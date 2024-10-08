import { motion } from "framer-motion";
import Imdb from "../Imdb/Imdb";
import { Link } from "react-router-dom";
import placeholder from "../../assets/MoviePlaceholder.jpg";
import LazyImage from "../Image/LazyImage";
export default function BrowseCard({ subject, movie }) {
  return (
    <Link to={`/${subject}/${movie.id}`} className="w-full 2xl:w-full xl:w-60">
      <motion.li
        className="flex flex-col  hover:bg-primary p-4 transition-colors duration-200  rounded-xl hover:cursor-pointer "
        whileHover={{ scale: 0.9 }}
      >
        <LazyImage path={movie.posterPath} />
        <p className=" text-primaryText lg:text-lg w-full text-sm  text-center overflow-ellipsis overflow-hidden whitespace-nowrap  pr-3">
          {movie.title}
        </p>
        <div className="w-[100%] flex justify-between items-center pr-3">
          {movie.voteAverage > 0 && (
            <Imdb rating={movie.voteAverage.toFixed(1)} widthStar={20} />
          )}
          <p className="text-callToAction text-xs bg-transparentdrk md:text-sm p-[0.1rem]">
            {movie.releaseYear}
          </p>
        </div>
      </motion.li>
    </Link>
  );
}
