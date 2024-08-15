import { aboveTheFoldAnimation } from "../../utils/animations";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import Info from "../Icons/Info";
import Imdb from "../Imdb/Imdb";
import Button from "../Buttons/Button";
import { useScroll, motion, useTransform } from "framer-motion";
export default function MovieInfo({ movie }) {
  const { scrollY } = useScroll();
  const movieDetails = useTransform(scrollY, [0, 800], [0, -300]);
  const movieDetailsOpacity = useTransform(
    scrollY,
    [0, 100, 200, 400, 600, 800],
    [1, 1, 0.8, 0.6, 0.4, 0]
  );

  return (
    <motion.section
      className="flex flex-col gap-4"
      style={{ opacity: movieDetailsOpacity, y: movieDetails }}
    >
      <motion.h2
        className=" font-extrabold tracking-tight 2xl:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primaryText to-primary max-w-xl xl:text-3xl "
        key={movie.imageUrl}
        {...aboveTheFoldAnimation}
      >
        {movie.title}
      </motion.h2>
      <div className="flex flex-col gap-1 w-4/5 sm:w-1/2 ">
        <div className="flex flex-row gap-2">
          <p className="text-primaryText 2xl:text-2xl xl:text-lg">
            {movie.releaseYear}
          </p>
          <Imdb rating={movie.voteAverage.toFixed(1)} width={40} text="2xl" />
        </div>

        <p className="movieName text-sm opacity-65 2xl:text-xl  text-primaryText overflow-hidden max-w-xl text-ellipsis whitespace-normal">
          {movie.overview}
        </p>
      </div>

      <motion.section
        className="flex gap-2 xl:gap-8"
        key={movie.overview}
        {...aboveTheFoldAnimation}
      >
        <Button
          styling={
            "bg-callToAction text-base hover:bg-primary transition-colors duration-200"
          }
          text={"Watch now"}
        >
          <FaPlay className="w-4" />
        </Button>
        <Button
          styling={"text-primaryText bg-transparentdrk  "}
          isLink={true}
          path={`movie/${movie.id}`}
          text={"More Info"}
        ></Button>
      </motion.section>
    </motion.section>
  );
}
