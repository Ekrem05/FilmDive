import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../../http/movies";
import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard/Card";
import { useInView } from "react-intersection-observer";
import MovieListSkeleton from "../Skeleton/MovieListSkeleton";

export default function YouMayAlsoLike({ id, subject, fn }) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["youmaylike", id],
    queryFn: () => {
      return fn(id);
    },
  });

  return (
    <>
      <section className="md:pt-10 md:pl-20 md:pr-20 px-5 ">
        <h3 className="2xl:text-5xl xl:text-3xl font-bold text-primaryText  mb-4 ">
          You may also like
        </h3>
        {!data && (
          <div className="flex  md:gap-11 overflow-x-auto gap-1">
            <MovieListSkeleton />
          </div>
        )}
        {data && data.length > 0 && (
          <ul className=" flex gap-4 p-4   overflow-y-hidden overflow-x-auto 2xl:gap-5 xl:gap-5 md:w-full">
            {data.map((movie) => {
              return (
                <MovieCard key={movie.id} movie={movie} subject={subject} />
              );
            })}
          </ul>
        )}
        {data && data.length === 0 && (
          <p className="text-primaryText text-center text-normal md:text-xl">
            Wow! That's rare! We don't have any similar titles
          </p>
        )}
      </section>
    </>
  );
}
