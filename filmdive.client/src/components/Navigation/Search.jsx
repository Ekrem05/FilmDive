import { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { CgSpinner } from "react-icons/cg";
import { ImSpinner3 } from "react-icons/im";
import { ImSpinner4 } from "react-icons/im";
import { ImSpinner9 } from "react-icons/im";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useSelector } from "react-redux";
import useSearch from "@/hooks/useSearch";
import SearchingSkeletion from "../Skeleton/SearchingSkeletion";
import SearchItem from "./SearchItem";
import { useLocation } from "react-router";
export default function Search() {
  const [isOpen, setIsOpen] = useState();
  const [search, setSearch] = useState({ isTyping: false, message: "" });
  //const result = useSelector((state) => state.movie.searchResult);
  function toggleSearchbar() {
    setIsOpen((prev) => !prev);
  }
  const timeoutRef = useRef();
  const sectionRef = useRef(null);
  const location = useLocation();
  const { mutate, result, isPending } = useSearch();
  function handleChange(event) {
    console.log(event.target.value);
    setSearch({ isTyping: true, message: event.target.value });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    if (search.isTyping) {
      timeoutRef.current = setTimeout(async () => {
        mutate({ keyword: search.message });
        setSearch((prevState) => ({ ...prevState, isTyping: false }));
      }, 1000);
    }
    console.log(search);
    return () => {
      console.log("clear");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search.message]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sectionRef.current && !sectionRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sectionRef]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  return (
    <section className="flex" ref={sectionRef}>
      <IoIosSearch
        className="size-12 p-3 rounded-full bg-transparentdrk text-primaryText hover:cursor-pointer"
        onClick={toggleSearchbar}
      />
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <section>
            <div className="flex">
              <motion.input
                initial={{
                  opacity: 0,

                  X: 200,
                  transition: { duration: 0.2 },
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: 100,
                  transition: { duration: 0.1 },
                }}
                onChange={handleChange}
                type="text"
                placeholder="Search for movies/tv series"
                className={`bg-transparent px-4 text-callToAction w-64  sm:w-72 outline-none hover:bg-primary focus:bg-base rounded-t-xl`}
              />
              <CgSpinnerTwoAlt
                className={` size-12 p-3 rounded-full bg-transparentdrk text-primaryText hover:cursor-pointer ${
                  search.isTyping
                    ? "visible animate-spin duration-500"
                    : "invisible"
                }`}
              />
            </div>
            {search.isTyping && <SearchingSkeletion />}
            {!search.isTyping && !isPending && result && result.length > 0 && (
              <ul className="absolute bg-base flex flex-col gap-5 rounded-b-md overflow-y-auto h-64  w-64 sm:w-72  px-3 py-2">
                {!search.isTyping && !isPending ? (
                  result.map((item) => (
                    <li key={item.key}>
                      <SearchItem item={item} />
                    </li>
                  ))
                ) : (
                  <SearchingSkeletion />
                )}
              </ul>
            )}
          </section>
        )}
      </AnimatePresence>
    </section>
  );
}
