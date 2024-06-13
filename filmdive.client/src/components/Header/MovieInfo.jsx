import { motion } from "framer-motion";
import { aboveTheFoldAnimation } from "../../utils/animations";

import Play from "../Icons/Play";
import Info from "../Icons/Info";
import Imdb from "../Imdb/Imdb";
export default function MovieInfo({ movie }) {
  const releaseYear = movie.releaseDate.slice(0, 4);
  return (
    <>
      <motion.h2
        className=" text-[46pt] text-white max-w-xl "
        key={movie.imageUrl}
        {...aboveTheFoldAnimation}
      >
        {movie.title}
      </motion.h2>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <p className="text-accentdrk text-2xl">{releaseYear}</p>
          <Imdb rating={"8.8"} width={40} text="2xl" />
        </div>

        <p className="movieName text-xl text-secondarydrk overflow-hidden max-w-xl text-ellipsis whitespace-normal">
          {movie.overview}
        </p>
      </div>

      <motion.section
        className="flex gap-8"
        key={movie.overview}
        {...aboveTheFoldAnimation}
      >
        <button className="bg-highlightdrk pt-1 pb-1 pl-3 pr-3 rounded-md text-2xl flex justify-center items-center gap-1">
          <span>
            <Play />
          </span>
          Watch now
        </button>
        <button className="text-highlightdrk bg-transparentdrk border border-solid border-highlightdrk pt-1 pb-1 pl-3 pr-3 rounded-md text-2xl flex justify-center items-center gap-1">
          <span>
            <Info fill={"#EEEEEE"} />
          </span>
          More Info
        </button>
      </motion.section>
    </>
  );
}
