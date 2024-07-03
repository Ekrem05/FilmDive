import { motion } from "framer-motion";
import { aboveTheFoldAnimation } from "../../utils/animations";
import { Link } from "react-router-dom";
import Play from "../Icons/Play";
import Info from "../Icons/Info";
import Imdb from "../Imdb/Imdb";
export default function MovieInfo({ movie }) {
  return (
    <>
      <motion.h2
        className=" font-extrabold tracking-tight 2xl:text-5xl text-headersdrk max-w-xl xl:text-3xl "
        key={movie.imageUrl}
        {...aboveTheFoldAnimation}
      >
        {movie.title}
      </motion.h2>
      <div className="flex flex-col gap-1 w-1/2 ">
        <div className="flex flex-row gap-2">
          <p className="text-highlightdrk 2xl:text-2xl xl:text-lg">
            {movie.releaseYear}
          </p>
          <Imdb rating={movie.voteAverage.toFixed(1)} width={40} text="2xl" />
        </div>

        <p className="movieName text-sm  2xl:text-xl xl:text-base text-accentdrk overflow-hidden max-w-xl text-ellipsis whitespace-normal">
          {movie.overview}
        </p>
      </div>

      <motion.section
        className="flex gap-2 xl:gap-8"
        key={movie.overview}
        {...aboveTheFoldAnimation}
      >
        <motion.button
          className="bg-highlightdrk pt-1 pb-1 pl-3 pr-3 rounded-md text-xs xl:text-2xl xl:w-44 w-28  2xl:scale-100 xl:scale-[.8] flex justify-center items-center gap-1"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <span>
            <Play />
          </span>
          Watch now
        </motion.button>
        <Link
          className="text-highlightdrk bg-transparentdrk border border-solid text-xs xl:text-2xl border-highlightdrk pt-1 pb-1 pl-3 pr-3 rounded-md flex justify-center items-center gap-1"
          to={`movie/${movie.id}`}
        >
          <span>
            <Info fill={"#EEEEEE"} />
          </span>
          More Info
        </Link>
      </motion.section>
    </>
  );
}
