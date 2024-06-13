import Trending from "./Trending/Trending";
import { useEffect, useState } from "react";
import { aboveTheFoldAnimation } from "../../utils/animations";
import { motion, AnimatePresence } from "framer-motion";
import { getTrendingMovies } from "../../http/movies";
import MovieInfo from "./MovieInfo";
export default function AboveTheFold() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    async function request() {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
      return movies;
    }
    request();
  }, []);
  return (
    <AnimatePresence>
      {trendingMovies[0] && (
        <section className="relative bg-primarydrk h-auto pb-8">
          <motion.img
            key={trendingMovies[0].title}
            {...aboveTheFoldAnimation}
            id="hero-img"
            src={`https://image.tmdb.org/t/p/original/${trendingMovies[0].backdropPath}`}
            alt=""
          />
          <AnimatePresence>
            {" "}
            <section className="absolute w-[100%] pl-20 bottom-0 mt-44 mb-10 flex flex-col gap-5">
              <MovieInfo movie={trendingMovies[0]} />
              <Trending movies={trendingMovies} />
            </section>
          </AnimatePresence>
        </section>
      )}
    </AnimatePresence>
  );
}
