import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { CgSpinner } from "react-icons/cg";
import { ImSpinner3 } from "react-icons/im";
import { ImSpinner4 } from "react-icons/im";
import { ImSpinner9 } from "react-icons/im";
import { CgSpinnerTwoAlt } from "react-icons/cg";
export default function Search() {
  const [isOpen, setIsOpen] = useState();

  function toggleSearchbar() {
    setIsOpen((prev) => !prev);
  }
  return (
    <section className="flex">
      <IoIosSearch
        className="size-12 p-3 rounded-full bg-transparentdrk text-primaryText hover:cursor-pointer"
        onClick={toggleSearchbar}
      />
      <AnimatePresence mode="popLayout">
        {isOpen && (
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
            type="text"
            placeholder="Search for movies/tv series"
            className={`bg-transparent px-4 text-callToAction outline-none hover:bg-base focus:bg-primary rounded-xl`}
          />
        )}
        <CgSpinnerTwoAlt className="size-12 p-3 rounded-full bg-transparentdrk text-primaryText hover:cursor-pointer animate-spin duration-500" />
      </AnimatePresence>
    </section>
  );
}
