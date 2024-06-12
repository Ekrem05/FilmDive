import Trending from "./Trending/Trending";
import { useState } from "react";
import { aboveTheFoldAnimation } from "../../utils/animations";
import { motion, AnimatePresence } from "framer-motion";
import MovieInfo from "./MovieInfo";
export default function AboveTheFold() {
  const [movie, setMovie] = useState({
    name: "Kung Fu Panda 4",
    overview:
      "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
    imageUrl:
      "https://image.tmdb.org/t/p/original/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
  });
  function changeMainImage(movie) {
    setMovie((prev) => {
      return { ...prev, ...movie };
    });
  }

  return (
    <AnimatePresence>
      <section className="relative bg-primarydrk h-auto pb-8">
        <motion.img
          key={movie.name}
          {...aboveTheFoldAnimation}
          id="hero-img"
          src={movie.imageUrl}
          alt=""
        />
        <AnimatePresence>
          {" "}
          <section className="absolute w-[100%] pl-20 bottom-0 mt-44 mb-10 max-w-screen-lg flex flex-col gap-5">
            <MovieInfo movie={movie} />
            <Trending onItemHover={changeMainImage} />
          </section>
        </AnimatePresence>
      </section>
    </AnimatePresence>
  );
}
