import { getGenres } from "@/http/movies";
import { browseActions } from "@/store/browse";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { handler } from "tailwindcss-animate";
import useGetCast from "@/hooks/useGetCast";
import useSearchCast from "@/hooks/useSearchCast";
import CastSkeleton from "@/components/Skeleton/CastSkeleton";
import CastItem from "./CastItem";
export default function Cast({}) {
  const formRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");
  const timeoutRef = useRef(null);
  const { data: popularCast, isPending, isError, error } = useGetCast();
  const { searchNow, searchResult, searching } = useSearchCast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { genres, year, rating, orderBy } = useParams();

  function handleChange(event) {
    console.log(event.target.value);
    setValue(event.target.value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      searchNow({ name: event.target.value });
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return (
    <section className="flex flex-col gap-3 h-screen">
      <input
        type="text"
        className="rounded-xl px-2 py-1 outline-none text-highlightdrk bg-secondarydrk"
        placeholder="Include movies with..."
        value={value}
        onChange={handleChange}
      />
      <ul className={`flex flex-col gap-1 pr-2 h-screen overflow-y-auto`}>
        {popularCast &&
          !searchResult &&
          !searching &&
          popularCast.map((item) => <CastItem item={item} />)}
        {searching && <CastSkeleton />}
        {searchResult && searchResult.map((item) => <CastItem item={item} />)}
      </ul>
    </section>
  );
}
