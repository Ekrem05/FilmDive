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

export default function BrowseMovies() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const dispatch = useDispatch();
  const { mutate, isPending: gettingMovies } = useMutation({
    mutationFn: browseMovies,
    onMutate: () => {},
    onSuccess: (data) => {
      console.log(data);
      dispatch(browseActions.loadMore(data));
    },
  });
  const { mutate: getFirstPage, isPending } = useMutation({
    mutationFn: browseMovies,
    onMutate: () => {},
    onSuccess: (data) => {
      console.log(data);
      dispatch(browseActions.getFirstPage(data));
    },
  });
  const genres = useSelector((state) => state.browse.genres);
  const movies = useSelector((state) => state.browse.filteredMovies);
  const { genres: genreIds, year, rating, orderBy } = useParams();
  console.log({ genres, year, rating, orderBy });
  useEffect(() => {
    console.log(year);
    if (genreIds) {
      const currentYear = new Date().getFullYear();
      let [fromYear, toYear] = [1878, currentYear];
      if (year) {
        [fromYear, toYear] = year.split(";");
      }
      getFirstPage({
        genres: genreIds === "all" ? [] : genreIds.split(" "),
        fromYear: fromYear,
        toYear: toYear,
        orderBy: orderBy ? orderBy : "",
      });
    } else {
      console.log("hlll");
      getFirstPage({ genres: [] });
    }
  }, [genres, genreIds, year, orderBy]);
  function loadMore() {
    const currentYear = new Date().getFullYear();
    let [fromYear, toYear] = [1878, currentYear];
    if (year) {
      [fromYear, toYear] = year.split(";");
    }
    mutate({
      genres: genreIds ? (genreIds === "all" ? [] : genreIds.split(" ")) : [],
      page: movies.page + 1,
      fromYear: fromYear,
      toYear: toYear,
      orderBy: orderBy ? orderBy : "",
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
                return <MovieCard key={movie.id} movie={movie} />;
              })}
            </ul>
            <Button styling={"mt-16"} onClick={loadMore}>
              Load More
            </Button>
          </section>
        )}
      </section>
    </>
  );
}
