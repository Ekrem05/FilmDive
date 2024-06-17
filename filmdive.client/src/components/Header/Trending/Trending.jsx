import TrendingCard from "./TrendingCard";
import { useEffect, useRef } from "react";
export default function Trending({ movies }) {
  const list = useRef();

  function handleWheel(event) {
    event.preventDefault();
    list.current.scrollLeft += event.deltaY;
  }
  useEffect(() => {
    list.current.addEventListener("wheel", handleWheel);
  });
  return (
    <section className="pt-10">
      <h3 className="text-[36pt] text-headersdrk ">Trending</h3>
      <ul
        className="trending-list flex items-start overflow-x-scroll gap-5"
        ref={list}
      >
        {movies.map((movie) => {
          return <TrendingCard key={movie.id} movie={movie} />;
        })}
      </ul>
    </section>
  );
}
