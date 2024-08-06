import { Link } from "react-router-dom";
import json from "../../../public/Animation.json";
import Lottie from "lottie-react";
import csharp from "../../../public/csharp.svg";
import postgre from "../../../public/postgre.svg";
import vite from "../../../public/vite.svg";
import redux from "../../../public/redux.svg";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import logo from "../../assets/logo-transparent-white.svg";
import { useRef } from "react";
export default function Footer() {
  return (
    <footer className="bg-black text-headersdrk flex flex-col pt-20 pb-6 gap-10">
      <main className="flex px-10">
        <ul className="grid grid-cols-3">
          <li className="flex flex-col gap-4">
            <h2 className="text-4xl  text-headersdrk max-w-xl font-extrabold tracking-tight lg:text-5xl ">
              About the developer
            </h2>
            <section>
              <p className="w-4/5">
                <h3 className="text-4xl  text-headersdrk max-w-xl font-extrabold tracking-tight lg:text-2xl ">
                  Ekrem Beytula{" "}
                  <span className="text-highlightdrk">
                    Software Development
                  </span>
                </h3>
                Specializing in software development, with expertise in building
                top-level web applications from the ground up.
              </p>
            </section>
            <section>
              <p className="font-extralight">Phone: 0886534085</p>
              <p className="font-extralight">
                Email: ekrem.beytula.dev@gmail.com
              </p>
            </section>
          </li>
          <li>
            <h2 className="text-4xl  text-headersdrk max-w-xl font-extrabold tracking-tight lg:text-5xl ">
              Tech stack
            </h2>
            <div className="flex items-center gap-4">
              <a href="https://react.dev/">
                <Lottie
                  animationData={json}
                  loop={true}
                  autoplay={true}
                  style={{ width: 50, height: 50 }}
                />
              </a>

              <a href={"https://dotnet.microsoft.com/en-us/languages/csharp"}>
                <img src={csharp} alt="" width={40} />
              </a>

              <a href="https://www.postgresql.org/">
                <img src={postgre} alt="" width={40} />
              </a>
              <a href="https://redux.js.org/">
                <img src={redux} alt="" width={40} />
              </a>
              <a href="https://vitejs.dev/">
                <img src={vite} alt="" width={40} />
              </a>
            </div>
          </li>
          <li>
            <section className="flex gap-8 items-center">
              <h2 className="text-4xl  text-headersdrk max-w-xl font-extrabold tracking-tight lg:text-5xl ">
                Film Dive
              </h2>
              <img src={logo} alt="" width={100} />
            </section>

            <ul className="flex flex-col gap-4">
              <li className="font-light">
                <Link to={"/browse"}>Movies</Link>
              </li>
              <li className="font-light">
                <Link to={"/browse"}>Tv Series</Link>
              </li>
              <li className="font-light">
                <Link to={"/browse"}>Movies</Link>
              </li>
              <li className="font-light">
                <Link to={"/browse"}>Watch list</Link>
              </li>
            </ul>
          </li>
        </ul>
      </main>
      <section className="w-full">
        <div className="flex  justify-center gap-10">
          <a href="">
            <FaGithub className="size-7" />
          </a>
          <a href="">
            <FaLinkedin className="size-7" />
          </a>
          <a href="">
            <FaDiscord className="size-7" />
          </a>
          <a href="">
            <FaFacebookSquare className="size-7" />
          </a>
          <a href="">
            <FaInstagramSquare className="size-7" />
          </a>
        </div>
      </section>
      <p className="opacity-40 px-4">
        &copy; Film dive {new Date().getFullYear()}
      </p>
    </footer>
  );
}
