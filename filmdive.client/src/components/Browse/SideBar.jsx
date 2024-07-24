
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
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { browseActions } from "@/store/browse";
import { browseMovies } from "@/http/movies";
import YearSelection from "./Year/YearSelection";
export default function SideBar() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
  const { genres, year, rating } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      if (genres) {
        const selectedGenres = data.filter((genre) =>
          genres.split(" ").includes(`${genre.id}`)
        );
        dispatch(browseActions.setGenres(selectedGenres));
      } else {
        dispatch(browseActions.setGenres(""));
      }
    }
  }, [data, genres]);

  return (
    <>
      <ul className="mt-32 flex flex-col px-8 bg-#1F1D36 text-accentdrk h-[800px]">
        <Accordion type="single" className="w-52" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl text-highlightdrk">
              Genres
            </AccordionTrigger>
            <AccordionContent className="w-full">
              <GenreSelection genres={data} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" className="w-full" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl text-highlightdrk">
              Year
            </AccordionTrigger>
            <AccordionContent className="w-full">
              <YearSelection />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" className="w-full" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl text-highlightdrk">
              Genres
            </AccordionTrigger>
            <AccordionContent className="w-full">
              <GenreSelection genres={data} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ul>
    </>
  );
}
