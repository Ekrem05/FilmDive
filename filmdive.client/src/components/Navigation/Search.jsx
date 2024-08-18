import { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { CgSpinner } from "react-icons/cg";
import { ImSpinner3 } from "react-icons/im";
import { ImSpinner4 } from "react-icons/im";
import { ImSpinner9 } from "react-icons/im";
import { CgSpinnerTwoAlt } from "react-icons/cg";
export default function Search() {
  const [isOpen, setIsOpen] = useState();
  const [search, setSearch] = useState({ isTyping: false, message: "" });
  function toggleSearchbar() {
    setIsOpen((prev) => !prev);
  }
  const timeoutRef = useRef();
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
        console.log("sEARCH NOW");
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
  return (
    <section className="flex">
      <IoIosSearch
        className="size-12 p-3 rounded-full bg-transparentdrk text-primaryText hover:cursor-pointer"
        onClick={toggleSearchbar}
      />
      <AnimatePresence mode="popLayout">
        {isOpen && (
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
              className={`bg-transparent px-4 text-callToAction outline-none hover:bg-base focus:bg-primary rounded-xl`}
            />
            <CgSpinnerTwoAlt
              className={` size-12 p-3 rounded-full bg-transparentdrk text-primaryText hover:cursor-pointer ${
                search.isTyping
                  ? "visible animate-spin duration-500"
                  : "invisible"
              }`}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
