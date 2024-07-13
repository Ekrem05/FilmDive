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

export default function SideBar() {
  return (
    <>
      <ul className="mt-32 flex flex-col basis-10/12 px-8 bg-#1F1D36 text-accentdrk h-[800px] overflow-x-hidden overflow-scroll">
        <Accordion type="single" className="w-full" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl text-highlightdrk">
              Genres
            </AccordionTrigger>
            <AccordionContent className="w-full">
              <GenreSelection />
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
