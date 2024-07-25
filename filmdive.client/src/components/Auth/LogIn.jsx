import svg from "../../assets/logo-transparent-white.svg";
import { useInput } from "../hooks/useInput";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../../http/movies";
import { AnimatePresence, motion } from "framer-motion";
import { aboveTheFoldAnimation } from "../../utils/animations";
import { isEmail, hasMinLength, isNotEmpty } from "@/utils/validatioin";
import Input from "./Input";
import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import Checkbox from "./Checkbox";
import { useLocation } from "react-router-dom";
export default function LogIn() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["trending", "signing"],
    queryFn: getTrendingMovies,
  });
  const [currentBg, setCurrentBg] = useState(0);
  useEffect(() => {
    setCurrentBg(Math.floor(Math.random() * 20));
  }, [data]);

  const {
    inputValue: email,
    isValid: isEmailValid,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));
  const {
    inputValue: password,
    isValid: isPasswordValid,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
  } = useInput("", (value) => hasMinLength(value, 5));

  function handleSubmission(event) {
    event.preventDefault();
    if (isEmailValid && isPasswordValid) {
      /// HTTP Request...
    }
  }
  return (
    <section className="overflow-hidden relative flex  justify-center bg-bgdrk h-auto pb-8">
      {data && (
        <>
          <AnimatePresence>
            <motion.img
              key={data[currentBg].title}
              {...aboveTheFoldAnimation}
              while
              id="hero-img"
              src={`https://image.tmdb.org/t/p/original/${data[currentBg].backdropPath}`}
              alt=""
              loading="eager"
              decoding="async"
            />
          </AnimatePresence>
          <img className=" w-16 xl:w-24 top-12 absolute" src={svg} alt="" />
          <main className="absolute top-48">
            <form
              onSubmit={handleSubmission}
              className="flex flex-col bg-black bg-opacity-50 p-10  gap-5"
            >
              <h2 className="font-extrabold tracking-tight 2xl:text-5xl text-headersdrk max-w-xl xl:text-3xl mb-14">
                Login
              </h2>
              <Input
                label="Email"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                onBlur={() => handleEmailBlur()}
                onChange={(event) => handleEmailChange(event.target.value)}
                value={email}
                isValid={isEmailValid}
                errMsg="Please enter a valid email"
              />
              <Input
                label="Password"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                onBlur={() => handlePasswordBlur()}
                onChange={(event) => handlePasswordChange(event.target.value)}
                value={password}
                isValid={isPasswordValid}
                errMsg="Please enter a valid password"
              />
              <p className="form-actions">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  type="submit"
                  className="button bg-headersdrk pt-1 pb-1 pl-3 pr-3 rounded-md text-xs xl:text-2xl  2xl:scale-100 xl:scale-[.8] flex justify-center items-center gap-1 w-full"
                >
                  Log In
                </motion.button>
              </p>
              <footer className="text-headersdrk flex flex-col gap-5">
                <div className="flex gap-4">
                  <Checkbox />
                </div>
                <div className="flex gap-2">
                  <p>You don't have an account?</p>
                  <Link to={"/auth/signup"} className="text-highlightdrk">
                    Sign Up
                  </Link>
                </div>
              </footer>
            </form>
          </main>
        </>
      )}
    </section>
  );
}
