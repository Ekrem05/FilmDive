import { useMutation, useQuery } from "@tanstack/react-query";
import { browseMovies, getPopularMovies } from "../../http/movies";
import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard/Card";
import { useInView } from "react-intersection-observer";
import MovieListSkeleton from "../Skeleton/MovieListSkeleton";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../Browse/Genres/Badge";
import { useLocation, useParams } from "react-router";
import { browseActions } from "@/store/browse";
import Button from "../Buttons/Button";
import OrderBy from "../Browse/Order/OrderBy";
import { BsFilterLeft } from "react-icons/bs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import YearSelection from "../Browse/Year/YearSelection";
import GenreSelection from "../Browse/Genres/GenreSelection";
import Cast from "../Browse/Cast/Cast";
import Rating from "../Browse/Rating/Rating";
import useGenres from "@/hooks/useGenres";
import BrowseCard from "../MovieCard/BrowseCard";
import BrowseSkeleton from "../Skeleton/BrowseSkeleton";
import useBrowseSeries from "@/hooks/useBrowseSeries";
import useSeriesGenres from "@/hooks/useSeriesGenres";
export default function BrowseSeries() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { getFirstPage, loadMore, gettingMovies, isPending } =
    useBrowseSeries();
  const { data } = useSeriesGenres();
  console.log("genre ", data);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.browse.genres);
  const series = useSelector((state) => state.browse.filteredSeries);
  const { genres: genreIds, year, rating, orderBy, cast } = useParams();
  useEffect(() => {
    let [fromYear, toYear] = [0, 0];
    if (year && year !== "all") {
      [fromYear, toYear] = year.split(";");
    }
    let [fromRating, toRating] = [0, 10];
    if (rating && rating != "all") {
      [fromRating, toRating] = rating.split(";");
    }

    getFirstPage({
      page: 1,
      genres: genreIds !== "all" && genreIds ? genreIds.split(" ") : [],
      fromYear,
      toYear,
      fromRating,
      toRating,
      orderBy: orderBy ? orderBy : "popularity.desc",
      cast: cast && cast !== "all" ? cast.split(" ") : [],
    });
  }, [pathname, genres, genreIds, year, orderBy, cast, rating]);
  useEffect(() => {
    if (data) {
      if (genreIds) {
        const selectedGenres = data.filter((genre) =>
          genreIds.split(" ").includes(`${genre.id}`)
        );
        dispatch(browseActions.setGenres(selectedGenres));
      } else {
        dispatch(browseActions.setGenres(""));
      }
    }
  }, [data, genreIds]);
  function handleLoadMore() {
    let [fromYear, toYear] = [0, 0];
    if (year && year !== "all") {
      [fromYear, toYear] = year.split(";");
    }
    let [fromRating, toRating] = [0, 10];
    if (rating && rating != "all") {
      [fromRating, toRating] = rating.split(";");
    }
    loadMore({
      page: series.page + 1,
      genres: genreIds !== "all" && genreIds ? genreIds.split(" ") : [],
      fromRating,
      toRating,
      fromYear,
      toYear,
      orderBy: orderBy ? orderBy : "popularity.desc",
      cast: cast && cast !== "all" ? cast.split(" ") : [],
    });
  }
  const list = useRef();
  return (
    <>
      <section className="sm:pt-32 px-10 flex flex-col 2xl:gap-14 overflow-x-hidden w-full min-h-[2000px]">
        <header className="flex justify-between">
          <section className="w-full justify-between sm:justify-start flex gap-3">
            <h3 className="text-2xl 2xl:text-5xl xl:text-3xl font-bold text-headerColor ">
              Discover
            </h3>
            <OrderBy />
          </section>

          <ul className="hidden 2xl:flex gap-3">
            {genres &&
              genres.length > 0 &&
              genres.map((genre) => (
                <li key={genre.id}>
                  <Badge genre={genre} />
                </li>
              ))}
          </ul>
        </header>
        <section className="flex 2xl:hidden flex-col gap-4  mt-10 mb-3">
          <ul className="gap-3 flex flex-wrap">
            {genres &&
              genres.length > 0 &&
              genres.map((genre) => (
                <li key={genre.id} className="">
                  <Badge genre={genre} />
                </li>
              ))}
          </ul>
          <section className="block sm:hidden">
            <Sheet>
              <SheetTrigger className="text-headerColor">
                <BsFilterLeft className="size-6" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="text-white !bg-base overflow-y-auto border-r-secondaryText"
              >
                <ul className="sm:flex flex-col bg-#1F1D36 text-secondaryText sm:h-screen ">
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      value="item-1"
                      className="border-b-secondaryText"
                    >
                      <AccordionTrigger className="text-lg  border-none xl:text-2xl text-primaryText">
                        Genres
                      </AccordionTrigger>
                      <AccordionContent className="w-full border-none">
                        <GenreSelection data={data} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      value="item-1"
                      className="border-b-secondaryText"
                    >
                      <AccordionTrigger className="text-lg xl:text-2xl text-primaryText">
                        Year
                      </AccordionTrigger>
                      <AccordionContent className="">
                        <YearSelection />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      value="item-1"
                      className="border-b-secondaryText"
                    >
                      <AccordionTrigger className="text-lg xl:text-2xl text-primaryText">
                        Rating
                      </AccordionTrigger>
                      <AccordionContent className="w-full">
                        <Rating />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </ul>
              </SheetContent>
            </Sheet>
          </section>
        </section>
        {series.data.length === 0 && !gettingMovies && !isPending && (
          <p className="text-center text-headerColor text-xl">
            There are no movies based on your filters
          </p>
        )}
        {series.data.length > 0 && (
          <section className="flex flex-col items-center overflow-y-hidden overflow-x-hidden pb-16">
            <ul
              className="grid grid-flow-row w-[100%]  2xl:grid-cols-6 xl:grid-cols-4 gap-3 lg:grid-cols-3 md:grid-cols-3  sm:grid-cols-2 grid-cols-2"
              ref={list}
            >
              {series.data.map((movie) => {
                return (
                  <BrowseCard
                    key={movie.id}
                    movie={movie}
                    subject={"details"}
                  />
                );
              })}
              {isPending && <BrowseSkeleton />}
            </ul>
            {series.page < series.totalPages && (
              <Button styling={"mt-16 bg-primary"} onClick={handleLoadMore}>
                Load More
              </Button>
            )}
          </section>
        )}
      </section>
    </>
  );
}
