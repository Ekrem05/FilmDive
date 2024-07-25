import svg from "../../assets/logo-transparent-white.svg";
import { useInput } from "../hooks/useInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../../http/movies";
import { AnimatePresence, motion } from "framer-motion";
import { aboveTheFoldAnimation } from "../../utils/animations";
import {
  isEmail,
  hasMinLength,
  isNotEmpty,
  containsNumber,
  passwordValidations,
} from "@/utils/validatioin";
import Input from "./Input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "./Checkbox";
import { signup } from "@/http/auth";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["trending", "signing"],
    queryFn: getTrendingMovies,
  });
  const { mutate } = useMutation({
    mutationFn: signup,
    onMutate: () => {
      console.log("mutating");
    },
    onSuccess: (response) => {
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refresh token", response.data.refreshToken);
        navigate("/");
      }
    },
  });
  const navigate = useNavigate();
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
  } = useInput("", (value) => hasMinLength(value, 5) && containsNumber(value));

  function handleSubmission(event) {
    event.preventDefault();
    if (isEmailValid && isPasswordValid) {
      const fd = new FormData(event.target);
      const inputs = Object.fromEntries(fd.entries());
      console.log(inputs);
      mutate({ email: inputs.email, password: inputs.password });
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
                Signup
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
                inputValidations={passwordValidations}
              />
              <p className="form-actions">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  type="submit"
                  className="button bg-headersdrk pt-1 pb-1 pl-3 pr-3 rounded-md text-xs xl:text-2xl  2xl:scale-100 xl:scale-[.8] flex justify-center items-center gap-1 w-full"
                >
                  Sign up
                </motion.button>
              </p>
              <footer className="text-headersdrk flex flex-col gap-5">
                <div className="flex gap-4">
                  <Checkbox />
                </div>
                <div className="flex gap-2">
                  <p>Already have an account?</p>
                  <Link to={"/auth/login"} className="text-highlightdrk">
                    Log In
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
