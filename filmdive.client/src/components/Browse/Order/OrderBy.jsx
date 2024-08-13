import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router";
export default function OrderBy() {
  const theme = useSelector((state) => state.movie.theme);
  const { genres, year, rating, cast } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  function handleChange(value) {
    const root = pathname.split("/")[1];
    navigate(
      `/${root}/${genres ? genres : "all"}/${year ? year : `all`}/${
        rating ? rating : "all"
      }/${value}/${cast ? cast : ""}`
    );
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger
        className="w-36 !bg-base font-bold
 text-primary focus:border-r-headerColor outline-none border-none  transition duration-300 ease-in-out"
      >
        <SelectValue placeholder="Order by" />
      </SelectTrigger>
      <SelectContent
        className={`rounded-xl ${
          theme === "light"
            ? "!bg-[#f3d0d7] !text-[#12111e]"
            : "!bg-[#12111e] !text-[#f3d0d7]"
        } opacity-100 h-48 overflow-y-hidden border-none`}
      >
        <SelectGroup className={`rounded-xl border-headerColor`}>
          <SelectItem className="duration-75" value="popularity.desc">
            Most popular
          </SelectItem>
          <SelectItem className=" duration-75" value="popularity.asc">
            Least popular
          </SelectItem>
          <SelectItem className="  duration-75" value="revenue.desc">
            Highest revenue
          </SelectItem>
          <SelectItem className=" duration-75" value="revenue.asc">
            Lowest revenue
          </SelectItem>
          <SelectItem
            className="  duration-75"
            value="primary_release_date.desc"
          >
            Newest release date
          </SelectItem>
          <SelectItem className=" duration-75" value="primary_release_date.asc">
            Oldest release date
          </SelectItem>

          <SelectItem className="  duration-75" value="vote_average.desc">
            Highest rated
          </SelectItem>
          <SelectItem className="duration-75" value="vote_average.asc">
            Lowest rated
          </SelectItem>
          <SelectItem className="duration-75" value="vote_count.desc">
            Most votes
          </SelectItem>
          <SelectItem className=" duration-75" value="vote_count.asc">
            Least votes
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
