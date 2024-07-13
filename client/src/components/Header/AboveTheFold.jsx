import Trending from "./Trending/Trending";
import { aboveTheFoldAnimation } from "../../utils/animations";
import MovieInfo from "./MovieInfo";
import {
  useScroll,
  motion,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingMovies } from "../../http/movies";
import { useQuery } from "@tanstack/react-query";
import { movieActions } from "../../store/movie";
import HomeSkeleton from "../Skeleton/HomeSkeleton";

export default function AboveTheFold() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["movies"],
    queryFn: getTrendingMovies,
  });
  const { scrollY } = useScroll();
  const titleScale = useTransform(scrollY, [0, 200, 500], [0, 10, 20]);
  const movieDetails = useTransform(scrollY, [0, 200, 500], [0, 10, 20]);

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
  const temp = false;
  if (!data) {
    return (
      <section className="relative bg-bgdrk h-svh pb-8">
        <HomeSkeleton />
      </section>
    );
  }
  return (
    <>
      {selectedMovie && (
        <section className="relative bg-bgdrk h-auto pb-8">
          <AnimatePresence>
            <motion.img
              style={{ y: titleScale }}
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
            <section className="absolute w-[100%] 2xl:pl-20 pl-8 bottom-0 2xl:mt-44 md:mt-12 md:pl-10 xl:pl-20 flex flex-col gap-5">
              <MovieInfo movie={selectedMovie} />
              <Trending movies={trendingMovies} />
            </section>
          </AnimatePresence>
        </section>
      )}
    </>
  );
}
