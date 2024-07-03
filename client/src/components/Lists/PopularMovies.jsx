import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../http/movies";
import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { useInView } from "react-intersection-observer";
import MovieListSkeleton from "../Skeleton/MovieListSkeleton";

export default function PopularMovies() {
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
  function handleWheel(event) {
    event.preventDefault();
    list.current.scrollLeft += event.deltaY;
  }
  useEffect(() => {
    if (data && !isPending) {
      list.current.addEventListener("wheel", handleWheel);
    }
  });
  return (
    <>
      <section className="pt-10">
        <h3 className="2xl:text-5xl xl:text-3xl text-headersdrk ">
          Most Popular
        </h3>
        {!data && (
          <div className="flex w-full gap-11" ref={ref}>
            <MovieListSkeleton />
          </div>
        )}
        {data && (
          <ul
            className="trending-list flex items-start gap-4  overflow-x-scroll 2xl:gap-5 xl:gap-5 w-[100%]"
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
