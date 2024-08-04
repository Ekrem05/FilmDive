import { useMutation, useQuery } from "@tanstack/react-query";
import { browseMovies, getPopularMovies } from "../../http/movies";
import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard/Card";
import { useInView } from "react-intersection-observer";
import MovieListSkeleton from "../Skeleton/MovieListSkeleton";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../Browse/Genres/Badge";
import { useParams } from "react-router";
import { browseActions } from "@/store/browse";
import Button from "../Buttons/Button";
import OrderBy from "../Browse/Order/OrderBy";
import useBrowseMovies from "@/hooks/useBrowseMovies";

export default function BrowseMovies() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { getFirstPage, loadMore, gettingMovies, isPending } =
    useBrowseMovies();
  const genres = useSelector((state) => state.browse.genres);
  const movies = useSelector((state) => state.browse.filteredMovies);
  const { genres: genreIds, year, rating, orderBy, cast } = useParams();
  console.log({ genreIds, year, rating, orderBy, cast });
  useEffect(() => {
    let [fromYear, toYear] = [0, 0];
    if (year && year !== "all") {
      [fromYear, toYear] = year.split(";");
    }
    getFirstPage({
      genres: genreIds !== "all" && genreIds ? genreIds.split(" ") : [],
      fromYear: fromYear,
      toYear: toYear,
      orderBy: orderBy && orderBy !== "default" ? orderBy : "",
      cast: cast && cast !== "all" ? cast.split(" ") : [],
    });
  }, [genres, genreIds, year, orderBy, cast]);

  function handleLoadMore() {
    let [fromYear, toYear] = [0, 0];
    if (year && year !== "all") {
      [fromYear, toYear] = year.split(";");
    }
    loadMore({
      page: movies.page + 1,
      genres: genreIds !== "all" && genreIds ? genreIds.split(" ") : [],
      fromYear: fromYear,
      toYear: toYear,
      orderBy: orderBy && orderBy !== "default" ? orderBy : "",
      cast: cast && cast !== "all" ? cast.split(" ") : [],
    });
  }

  const list = useRef();
  return (
    <>
      <section className="pt-32 pl-10 pr-10 flex flex-col gap-14 overflow-x-hidden">
        <header className="flex justify-between">
          <section className="flex gap-3">
            <h3 className="2xl:text-5xl xl:text-3xl font-bold text-headersdrk ">
              Discover
            </h3>
            <OrderBy />
          </section>

          <ul className="flex gap-3">
            {genres.length > 0 &&
              genres.map((genre) => (
                <li key={genre.id}>
                  <Badge genre={genre} />
                </li>
              ))}
          </ul>
        </header>

        {movies.data.length === 0 && (
          <div className="flex w-full gap-11" ref={ref}>
            <MovieListSkeleton />
          </div>
        )}
        {movies.data.length > 0 && (
          <section className="flex flex-col items-center overflow-y-hidden overflow-x-hidden">
            <ul
              className="grid grid-flow-row grid-cols-6 gap-3 w-[100%]"
              ref={list}
            >
              {movies.data.map((movie) => {
                return (
                  <MovieCard key={movie.id} movie={movie} subject={"movie"} />
                );
              })}
            </ul>
            <Button styling={"mt-16"} onClick={handleLoadMore}>
              Load More
            </Button>
          </section>
        )}
      </section>
    </>
  );
}
