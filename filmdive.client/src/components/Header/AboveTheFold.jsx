import Trending from "./Trending/Trending";
import { useEffect, useState } from "react";
import { aboveTheFoldAnimation } from "../../utils/animations";
import { motion, AnimatePresence } from "framer-motion";
import { getTrendingMovies } from "../../http/movies";
import MovieInfo from "./MovieInfo";
import { useQuery } from "@tanstack/react-query";
export default function AboveTheFold() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["movies"],
    queryFn: getTrendingMovies,
  });
  return (
    <AnimatePresence>
      {data && (
        <section className="relative bg-primarydrk h-auto pb-8">
          <motion.img
            key={data[0].title}
            {...aboveTheFoldAnimation}
            id="hero-img"
            src={`https://image.tmdb.org/t/p/original/${data[0].backdropPath}`}
            alt=""
          />
          <AnimatePresence>
            {" "}
            <section className="absolute w-[100%] pl-20 bottom-0 mt-44 mb-10 flex flex-col gap-5">
              <MovieInfo movie={data[0]} />
              <Trending movies={data} />
            </section>
          </AnimatePresence>
        </section>
      )}
    </AnimatePresence>
  );
}
