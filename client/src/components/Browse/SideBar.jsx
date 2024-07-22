import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <Select>
          <SelectTrigger
            className="w-36 bg-bgdrk font-bold
           text-highlightdrk focus:border-r-secondarydrk outline-none  transition duration-300 ease-in-out"
          >
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-bgdrk h-36">
            <SelectGroup className="bg-bgdrk rounded-xl border-secondarydrk ">
              <SelectLabel className="text-highlightdrk rounded-xl">
                Genre
              </SelectLabel>
              <SelectItem
                className="text-accentdrk hover:bg-highlightdrk hover:text-white duration-75"
                value="est"
              >
                Eastern Standard Time (EST)
              </SelectItem>
              <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
              <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ul>
    </>
  );
}
