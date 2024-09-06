import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GenreSelection from "./Genres/GenreSelection";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getGenres } from "@/http/movies";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { browseActions } from "@/store/browse";
import { browseMovies } from "@/http/movies";
import YearSelection from "./Year/YearSelection";
import Rating from "./Rating/Rating";
import Cast from "./Cast/Cast";
import useGenres from "@/hooks/useGenres";
import useSeriesGenres from "@/hooks/useSeriesGenres";

export default function SideBar() {
  const { genres, year, rating } = useParams();
  const { data: movieGenres, error, getMovieRecipes } = useGenres();
  const { data: seriesGenres, getSeriesGenres } = useSeriesGenres();
  const { pathname } = useLocation();
  const route = pathname.split("/")[1];
  useEffect(() => {
    if (route && route === "series") {
      getSeriesGenres();
    } else {
      getMovieRecipes();
    }
  }, [route]);
  return (
    <>
      <ul className="hidden  mt-32 sm:flex flex-col ml-10 bg-#1F1D36 text-secondaryText sm:h-screen ">
        <Accordion type="single" className="w-52" collapsible>
          <AccordionItem value="item-1 " className="border-b-secondaryText">
            <AccordionTrigger className="text-lg xl:text-2xl text-primaryText">
              Genres
            </AccordionTrigger>
            <AccordionContent className="w-full ">
              <GenreSelection
                data={
                  route == "series"
                    ? seriesGenres
                    : route === "movies" && movieGenres
                }
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" className="w-52" collapsible>
          <AccordionItem value="item-1" className="border-b-secondaryText">
            <AccordionTrigger className="text-lg xl:text-2xl text-primaryText">
              Year
            </AccordionTrigger>
            <AccordionContent className="w-52">
              <YearSelection />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" className="w-52" collapsible>
          <AccordionItem value="item-1" className="border-b-secondaryText">
            <AccordionTrigger className="text-lg xl:text-2xl text-primaryText">
              Rating
            </AccordionTrigger>
            <AccordionContent className="w-full">
              <Rating />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {route && route === "movies" && (
          <Accordion type="single" className="w-52" collapsible>
            <AccordionItem value="item-1" className="border-b-secondaryText">
              <AccordionTrigger className="text-lg xl:text-2xl text-primaryText">
                Cast
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <Cast />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </ul>
      <section className="flex sm:hidden mt-32"></section>
    </>
  );
}
