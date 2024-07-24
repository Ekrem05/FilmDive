import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
export default function OrderBy() {
  const { genres, year, rating } = useParams();
  const navigate = useNavigate();
  function handleChange(value) {
    const currentYear = new Date().getFullYear();
    navigate(
      `/browse/${genres ? genres : "all"}/${
        year ? year : `${1878};${currentYear}`
      }/${rating}/${value}`
    );
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger
        className="w-36 bg-bgdrk font-bold
 text-highlightdrk focus:border-r-secondarydrk outline-none  transition duration-300 ease-in-out"
      >
        <SelectValue placeholder="Order by" />
      </SelectTrigger>
      <SelectContent className="rounded-xl bg-bgdrk h-48 overflow-y-hidden">
        <SelectGroup className="bg-bgdrk rounded-xl border-secondarydrk">
          <SelectItem
            className="text-accentdrk hover:bg-highlightdrk hover:text-white duration-75"
            value="popularity.desc"
          >
            Most popular
          </SelectItem>
          <SelectItem
            className="text-accentdrk hover:bg-highlightdrk hover:text-white duration-75"
            value="popularity.asc"
          >
            Least popular
          </SelectItem>
          <SelectItem
            className="text-accentdrk hover:bg-highlightdrk hover:text-white duration-75"
            value="revenue.desc"
          >
            Highest revenue
          </SelectItem>
          <SelectItem
            className="text-accentdrk hover:bg-highlightdrk hover:text-white duration-75"
            value="revenue.asc"
          >
            Lowest revenue
          </SelectItem>
          <SelectItem
            className="text-accentdrk hover:bg-highlightdrk hover:text-white duration-75"
            value="primary_release_date.desc"
          >
            Newest release date
          </SelectItem>
          <SelectItem
            className="text-accentdrk hover:bg-highlightdrk hover:text-white duration-75"
            value="primary_release_date.asc"
          >
            Oldest release date
          </SelectItem>

          <SelectItem
            className="text-accentdrk hover:bg-highlightdrk hover:text-white duration-75"
            value="vote_average.desc"
          >
            Highest rated
          </SelectItem>
          <SelectItem
            className="text-accentdrk hover:bg-highlightdrk hover:text-white duration-75"
            value="vote_average.asc"
          >
            Lowest rated
          </SelectItem>
          <SelectItem
            className="text-accentdrk hover:bg-highlightdrk hover:text-white duration-75"
            value="vote_count.desc"
          >
            Most votes
          </SelectItem>
          <SelectItem
            className="text-accentdrk hover:bg-highlightdrk hover:text-white duration-75"
            value="vote_count.asc"
          >
            Least votes
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}