import whiteLogo from "../../assets/logo-transparent-white.svg";
import darkLogo from "../../assets/logo-transparent-bg.svg";

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
import { darkModeNavbar, lightModeNavbar } from "@/utils/animations";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "@/store/movie";
import Search from "./Search/Search";
import { userDetails } from "@/http/auth";
import { useQuery } from "@tanstack/react-query";
import authorize from "@/utils/authorize";
const listVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { type: "spring" } },
};

export default function Navigation() {
  const theme = useSelector((state) => state.movie.theme);
  const dispatch = useDispatch();
  const [open, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["details"],
    queryFn: async () => {
      const token = await authorize();
      if (token) {
        return userDetails({ token });
      }
      throw Error();
    },
  });

  const navOpacity = useTransform(
    scrollY,
    [0, 200, 500],
    theme === "dark" ? darkModeNavbar : lightModeNavbar
  );
  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }
  return (
    <motion.header
      className={"w-[100%] fixed z-[1]"}
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
                src={theme === "dark" ? whiteLogo : darkLogo}
                onClick={() => dispatch(movieActions.setPage(""))}
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
            <NavButton label={"Watch list"} link="/watchlist" />
          </li>
        </ul>
        <ul className="flex gap-32 items-center">
          <li>
            <Search />
          </li>
          {isError || !localStorage.getItem("token") ? (
            <ul className="flex">
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
      </ul>
      <motion.section
        className={` sm:hidden flex flex-col ${open ? "bg-base" : ""} `}
      >
        <ul className="w-full flex items-center py-5 px-5">
          <li>
            {open ? (
              <IoMdClose
                className="text-primaryText size-6"
                onClick={toggleMenu}
              />
            ) : (
              <BsList
                className="text-primaryText size-6"
                onClick={toggleMenu}
              />
            )}
          </li>
          <li className="flex-grow flex justify-center">
            <Link to="/">
              <img
                className=" w-12 xl:w-16 hover:cursor-pointer"
                src={theme === "dark" ? whiteLogo : darkLogo}
                alt=""
              />
            </Link>
          </li>
          <li>
            <Search />
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
                  className="border-b-headerColor flex justify-center pb-3 mx-4 border-b"
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
                  className="border-b-headerColor flex justify-center pb-3 mx-4 border-b"
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
                  className="border-b-headerColor flex justify-center pb-3 mx-4 border-b"
                >
                  <NavButton
                    label={"Watch list"}
                    link="/watchlist"
                    onClick={toggleMenu}
                  />
                </motion.li>
              </motion.ul>

              {isError || !localStorage.getItem("token") ? (
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
