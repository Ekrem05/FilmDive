import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../../http/movies";
import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { useInView } from "react-intersection-observer";
import MovieListSkeleton from "../Skeleton/MovieListSkeleton";

export default function UpcomingMovies() {
  const list = useRef();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
    enabled: inView, // Query is enabled only when inView is true
  });

  const handleWheel = (event) => {
    event.preventDefault();
    if (list.current) {
      list.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    if (data) {
      list.current.addEventListener("wheel", handleWheel);
      return () => {
        if (list.current) {
          list.current.removeEventListener("wheel", handleWheel);
        }
      };
    }
  }, [data]);

  return (
    <>
      <section className="pt-10">
        <h3 className="2xl:text-5xl xl:text-3xl text-headersdrk">Upcoming</h3>
        {!data && (
          <div className="flex w-full gap-11" ref={ref}>
            <MovieListSkeleton />
          </div>
        )}
        {data && (
          <ul
            className="trending-list flex items-start overflow-x-scroll gap-5 w-[100%]"
            ref={list}
          >
            {data.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
