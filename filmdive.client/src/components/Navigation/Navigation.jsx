import svg from "../../assets/logo-transparent-white.svg";
import NavButton from "./NavButton";
import { Link } from "react-router-dom";
import {
  useScroll,
  motion,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import UserSection from "./UserSection";
import { BsList } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { black } from "tailwindcss/colors";
import { duration } from "@mui/material";
const listVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { type: "spring" } },
};

export default function Navigation() {
  const [open, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(
    scrollY,
    [0, 200, 500],
    [
      "linear-gradient(180deg,rgba(0, 0, 0, 0.7) 10%,transparent)",
      "linear-gradient(180deg,rgba(0, 0, 0, 0.7) 50%,transparent)",
      "linear-gradient(180deg,rgba(0, 0, 0, 0.8) 100%,transparent)",
    ]
  );
  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }
  return (
    <motion.header
      className={"w-[100%] myHeader fixed z-[1]"}
      style={{
        backgroundImage: navOpacity,
      }}
    >
      <ul className="hidden sm:flex justify-between items-center p-5">
        <ul className="flex flex-row items-center basis-[40%] justify-around">
          <li>
            <Link to="/">
              <img
                className=" w-10 xl:w-16 hover:cursor-pointer"
                src={svg}
                alt=""
              />
            </Link>
          </li>
          <li>
            <NavButton label={"Movies"} link="/movies" />
          </li>
          <li>
            <NavButton label={"TV Series"} link="/series" />
          </li>
          <li>
            <NavButton label={"Watch list"} link="/watch" />
          </li>
        </ul>
        {!localStorage.getItem("token") ? (
          <ul className="flex gap-4">
            <li>
              <NavButton label={"Sign Up"} link="/auth/signup" />
            </li>
            <li>
              <NavButton label={"Log In"} link="/auth/login" />
            </li>
          </ul>
        ) : (
          <UserSection />
        )}
      </ul>
      <motion.section
        className={` sm:hidden flex flex-col ${open ? "bg-black" : ""} `}
      >
        <ul className="w-full flex items-center py-5 px-5">
          <li className="flex-grow flex justify-center">
            <Link to="/">
              <img
                className=" w-12 xl:w-16 hover:cursor-pointer"
                src={svg}
                alt=""
              />
            </Link>
          </li>
          <li>
            {open ? (
              <IoMdClose className="text-white size-6" onClick={toggleMenu} />
            ) : (
              <BsList className="text-white size-6" onClick={toggleMenu} />
            )}
          </li>
        </ul>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{
                opacity: 0,
                x: 100,
                transition: { duration: 0.1 },
              }}
              className="flex py-5 flex-col gap-5 items-center "
            >
              <motion.ul
                variants={listVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col text-6xl gap-5 w-full"
              >
                <motion.li
                  key={"Movies"}
                  variants={itemVariants}
                  className="border-b-secondarydrk flex justify-center pb-3 mx-4 border-b"
                >
                  <NavButton
                    label={"Movies"}
                    link="/movies"
                    onClick={toggleMenu}
                  />
                </motion.li>
                <motion.li
                  key={"TV Series"}
                  variants={itemVariants}
                  className="border-b-secondarydrk flex justify-center pb-3 mx-4 border-b"
                >
                  <NavButton
                    label={"TV Series"}
                    link="/series"
                    onClick={toggleMenu}
                  />
                </motion.li>
                <motion.li
                  key={"Watch list"}
                  variants={itemVariants}
                  className="border-b-secondarydrk flex justify-center pb-3 mx-4 border-b"
                >
                  <NavButton
                    label={"Watch list"}
                    link="/watch"
                    onClick={toggleMenu}
                  />
                </motion.li>
              </motion.ul>

              {!localStorage.getItem("token") ? (
                <motion.ul className="flex gap-4">
                  <motion.li
                    initial={{
                      x: -20,
                      opacity: 0,
                    }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <NavButton
                      label={"Sign Up"}
                      link="/auth/signup"
                      onClick={toggleMenu}
                    />
                  </motion.li>
                  <motion.li
                    initial={{
                      x: -20,
                      opacity: 0,
                    }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <NavButton
                      label={"Log In"}
                      link="/auth/login"
                      onClick={toggleMenu}
                    />
                  </motion.li>
                </motion.ul>
              ) : (
                <UserSection />
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.header>
  );
}
