import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard/Card";
import { useInView } from "react-intersection-observer";
import MovieListSkeleton from "../Skeleton/MovieListSkeleton";
import { getAiringTodayTvSeries } from "@/http/series";

export default function CardList({ fn, fnKey, title, subject }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { isPending, isError, data, error } = useQuery({
    queryKey: fnKey,
    queryFn: fn,
    enabled: inView,
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
      <section className="pt-10">
        <h3 className="2xl:text-5xl drop-shadow-2xl xl:text-3xl font-bold  text-primaryText  mb-4 ">
          {title}
        </h3>
        {!data && (
          <div className="flex w-full gap-11" ref={ref}>
            <MovieListSkeleton />
          </div>
        )}
        {data && (
          <ul
            className="trending-list flex items-start gap-4  overflow-x-scroll 2xl:gap-1 xl:gap-5 w-[100%]"
            ref={list}
          >
            {data.map((movie) => {
              return (
                <MovieCard key={movie.id} movie={movie} subject={subject} />
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
