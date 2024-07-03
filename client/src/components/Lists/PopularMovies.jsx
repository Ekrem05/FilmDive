import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../http/movies";
import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
export default function PopularMovies() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopularMovies,
  });
  const list = useRef();

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
      {data && (
        <section className="pt-10">
          <h3 className="text-[36pt] text-headersdrk ">Most Popular</h3>
          <ul
            className="trending-list flex items-start overflow-x-scroll gap-5 w-[100%]"
            ref={list}
          >
            {data.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </ul>
        </section>
      )}
    </>
  );
}
