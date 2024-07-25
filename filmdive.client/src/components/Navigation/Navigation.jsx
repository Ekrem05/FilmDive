import svg from "../../assets/logo-transparent-white.svg";
import NavButton from "./NavButton";
import { Link } from "react-router-dom";
import { useScroll, motion, useTransform } from "framer-motion";
import { useEffect } from "react";
export default function Navigation() {
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
  return (
    <motion.header
      className={"w-[100%] myHeader fixed z-[1]"}
      style={{
        backgroundImage: navOpacity,
      }}
    >
      <ul className="flex justify-between items-center p-5">
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
            <NavButton label={"Movies"} link="/browse" />
          </li>
          <li>
            <NavButton label={"TV Series"} link="/browse" />
          </li>
          <li>
            <NavButton label={"Browse"} link="/browse" />
          </li>
        </ul>
        <ul className="flex gap-4">
          <li>
            <NavButton label={"Sign Up"} link="/auth/signup" />
          </li>
          <li>
            <NavButton label={"Log In"} link="/auth/login" />
          </li>
        </ul>
      </ul>
    </motion.header>
  );
}
