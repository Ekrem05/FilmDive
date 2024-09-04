import { useEffect, useRef, useState } from "react";
import useGetCast from "@/hooks/useGetCast";
import useSearchCast from "@/hooks/useSearchCast";
import CastSkeleton from "@/components/Skeleton/CastSkeleton";
import CastItem from "./CastItem";
export default function Cast() {
  const [value, setValue] = useState({ isTyping: false, message: "" });
  const timeoutRef = useRef(null);
  const { data: popularCast, isPending, isError, error } = useGetCast();
  const { searchNow, searchResult, searching } = useSearchCast();

  function handleChange(event) {
    console.log(event.target.value);
    setValue({ isTyping: true, message: event.target.value });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      searchNow({ name: event.target.value });
      setValue((prevState) => ({ ...prevState, isTyping: false }));
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
        className="rounded-xl px-2 py-1 outline-none text-primaryText bg-headerColor"
        placeholder="Include movies with..."
        value={value.message}
        onChange={handleChange}
      />
      <ul className={`flex flex-col gap-1 pr-2 h-screen overflow-y-auto`}>
        {popularCast &&
          !searchResult &&
          !searching &&
          popularCast.map((item) => <CastItem item={item} />)}
        {(searching || value.isTyping) && <CastSkeleton />}
        {searchResult &&
          searchResult.length > 0 &&
          searchResult.map((item) => <CastItem item={item} />)}
        {searchResult && searchResult.length === 0 && <p>Nothing found</p>}
      </ul>
    </section>
  );
}
