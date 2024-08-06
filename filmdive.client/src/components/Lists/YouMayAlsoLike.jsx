import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../../http/movies";
import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard/Card";
import { useInView } from "react-intersection-observer";
import MovieListSkeleton from "../Skeleton/MovieListSkeleton";

export default function YouMayAlsoLike({ id, subject, fn }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
  });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["youmaylike", id],
    queryFn: () => {
      return fn(id);
    },
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
      <section className="md:pt-10 md:pl-20 md:pr-20 px-5">
        <h3 className="2xl:text-5xl xl:text-3xl font-bold text-headersdrk  mb-4 ">
          You may also like
        </h3>
        {isPending && (
          <div className="flex  md:gap-11 overflow-x-auto gap-1" ref={ref}>
            {console.log("wtf")}
            <MovieListSkeleton />
          </div>
        )}
        {data && (
          <ul
            className="trending-list flex items-start gap-4   overflow-x-scroll 2xl:gap-5 xl:gap-5 md:w-[100%]"
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
