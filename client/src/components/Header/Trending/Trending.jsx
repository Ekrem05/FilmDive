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
    <section className="pt-10 2xl:flex flex-col gap-4 pl-20 xl:flex lg:flex hidden">
      <h3 className="2xl:text-5xl xl:text-3xl text-headersdrk ">Trending</h3>
      <ul
        className="trending-list flex items-start overflow-x-scroll gap-5 pl-5"
        ref={list}
      >
        {movies.map((movie) => {
          return <TrendingCard key={movie.id} movie={movie} />;
        })}
      </ul>
    </section>
  );
}
