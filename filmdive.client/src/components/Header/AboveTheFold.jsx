import Trending from "./Trending/Trending";
import { aboveTheFoldAnimation } from "../../utils/animations";
import { motion, AnimatePresence } from "framer-motion";
import MovieInfo from "./MovieInfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingMovies } from "../../http/movies";
import { useQuery } from "@tanstack/react-query";
import { movieActions } from "../../store/movie";
import placeholder from "../../assets/placeholder.jpg";
import { useScroll } from "framer-motion";
export default function AboveTheFold() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["movies"],
    queryFn: getTrendingMovies,
  });

  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const trendingMovies = useSelector((state) => state.movie.trendingMovies);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data && !isPending) {
      const imageUrls = data.map((movie) => movie.backdropPath);
      // Preload images
      const preloadImages = (urls) => {
        urls.forEach((url) => {
          const img = new Image();
          img.src = `https://image.tmdb.org/t/p/original/${url}`;
          img.onload = () => console.log(`Image preloaded: ${img.src}`);
          img.onerror = () =>
            console.error(`Image failed to preload: ${img.src}`);
        });
      };
      preloadImages(imageUrls);
      dispatch(movieActions.initialFetch(data));
    }
  }, [data, isPending, dispatch]);
  if (isPending) {
    return (
      <section className="relative bg-bgdrk h-auto pb-8">
        <motion.img
          key={"asd"}
          {...aboveTheFoldAnimation}
          id="hero-img"
          src={placeholder}
          alt=""
          decoding="async"
        />
      </section>
    );
  }
  return (
    <>
      {selectedMovie && (
        <section className="relative bg-bgdrk h-auto pb-8">
          <AnimatePresence>
            <motion.img
              key={selectedMovie.title}
              {...aboveTheFoldAnimation}
              while
              id="hero-img"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdropPath}`}
              alt=""
              loading="eager"
              decoding="async"
            />
          </AnimatePresence>
          <AnimatePresence>
            <section className="absolute w-[100%] pl-20 bottom-0 mt-44 mb-10 flex flex-col gap-5">
              <MovieInfo movie={selectedMovie} />
              <Trending movies={trendingMovies} />
            </section>
          </AnimatePresence>
        </section>
      )}
    </>
  );
}
