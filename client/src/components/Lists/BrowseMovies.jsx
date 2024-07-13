import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../http/movies";
import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { useInView } from "react-intersection-observer";
import MovieListSkeleton from "../Skeleton/MovieListSkeleton";

export default function BrowseMovies() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopularMovies,
    enabled: inView,
  });
  const list = useRef();
  useEffect(() => {
    console.log(inView);
  }, [inView]);

  return (
    <>
      <section className="pt-32 pl-10 pr-10 flex flex-col gap-14">
        <h3 className="2xl:text-5xl xl:text-3xl font-bold text-headersdrk ">
          Most Popular
        </h3>
        {!data && (
          <div className="flex w-full gap-11" ref={ref}>
            <MovieListSkeleton />
          </div>
        )}
        {data && (
          <ul
            className="grid grid-flow-row grid-cols-6 gap-3 w-[100%]"
            ref={list}
          >
            {data.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </ul>
        )}
      </section>
    </>
  );
}
