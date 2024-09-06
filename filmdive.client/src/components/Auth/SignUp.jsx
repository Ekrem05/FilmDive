import whiteLogo from "../../assets/logo-transparent-white.svg";
import darkLogo from "../../assets/logo-transparent-bg.svg";

import { useInput } from "../hooks/useInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../../http/movies";
import { AnimatePresence, motion } from "framer-motion";
import { authFoldAnimation } from "../../utils/animations";
import {
  isEmail,
  hasMinLength,
  isNotEmpty,
  containsNumber,
  passwordValidations,
  usernameValidations,
  hasMaxLength,
} from "@/utils/validatioin";
import Input from "./Input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "./Checkbox";
import { signup } from "@/http/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [serverValidation, setServerValidation] = useState({
    email: true,
    username: true,
    password: true,
    userAlreadyExists: false,
  });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["trending", "signing"],
    queryFn: getTrendingMovies,
  });
  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: signup,
    onMutate: () => {},
    onSuccess: (response) => {
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        navigate("/");
      }
      if (response.status === 400) {
        const newValidationState = {
          email: true,
          username: true,
          password: true,
          userAlreadyExists: false,
        };

        if (response.errors) {
          const errors = response.errors;
          if (errors.Email) {
            newValidationState.email = false;
          }
          if (errors.Username) {
            newValidationState.username = false;
          }
          if (errors.Password) {
            newValidationState.password = false;
          }
          if (errors[0]) {
            newValidationState.userAlreadyExists = true;
          }
        }
        setServerValidation(newValidationState);
      }
    },
  });
  const theme = useSelector((state) => state.movie.theme);

  const navigate = useNavigate();
  const [currentBg, setCurrentBg] = useState(0);
  useEffect(() => {
    setCurrentBg(Math.floor(Math.random() * 15));
  }, [data]);

  const {
    inputValue: username,
    isValid: isUsernameValid,
    handleChange: handleUsernameChange,
    handleBlur: handleUsernameBlur,
  } = useInput(
    "",
    (value) =>
      isNotEmpty(value) && hasMinLength(value, 3) && hasMaxLength(value, 10)
  );
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
  } = useInput(
    "",
    (value) =>
      hasMinLength(value, 5) && hasMaxLength(value, 20) && containsNumber(value)
  );
  useEffect(() => {
    setServerValidation({
      email: true,
      username: true,
      password: true,
      userAlreadyExists: false,
    });
  }, [username, email, password]);

  function handleSubmission(event) {
    event.preventDefault();
    if (isEmailValid && isPasswordValid) {
      const fd = new FormData(event.target);
      const inputs = Object.fromEntries(fd.entries());

      mutate({
        email: inputs.email,
        username: inputs.username,
        password: inputs.password,
      });
    }
  }
  {
    data;
  }
  return (
    <section className="bg-base gap-10 relative flex-wrap min-h-[100vh] z-0 flex flex-col  items-center">
      {data && (
        <>
          <div className="hidden  sm:block absolute h-[100vh] bg-base z-[-1] ">
            <AnimatePresence>
              <motion.img
                key={data[currentBg].title}
                {...authFoldAnimation}
                while
                id="hero-img"
                className="min-h-[100vh]"
                src={`https://image.tmdb.org/t/p/original/${data[currentBg].backdropPath}`}
                alt=""
                loading="eager"
                decoding="async"
              />
            </AnimatePresence>
          </div>

          <Link to="/">
            <img
              className="w-32 mt-5 sm:mt-20 "
              src={theme === "dark" ? whiteLogo : darkLogo}
              alt=""
            />
          </Link>

          <main className="w-full sm:w-5/6 md:w-4/6 2xl:w-1/3 flex justify-center">
            <form
              onSubmit={handleSubmission}
              className="flex flex-col w-full md:w-4/6 xl:w-1/2 2xl:w-4/5  bg-base bg-opacity-50 p-10  gap-5"
            >
              <h2 className="text-5xl font-extrabold tracking-tight 2xl:text-5xl text-headerColor max-w-xl xl:text-3xl mb-14">
                Signup
              </h2>
              <Input
                label="Username"
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                onBlur={() => handleUsernameBlur()}
                onChange={(event) => handleUsernameChange(event.target.value)}
                value={username}
                isValid={
                  serverValidation.username
                    ? isUsernameValid
                    : serverValidation.username
                }
                errMsg="Please enter a valid username"
                inputValidations={usernameValidations}
              />
              <Input
                label="Email"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                onBlur={() => handleEmailBlur()}
                onChange={(event) => handleEmailChange(event.target.value)}
                value={email}
                isValid={
                  serverValidation.email ? isEmailValid : serverValidation.email
                }
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
                isValid={
                  serverValidation.password
                    ? isPasswordValid
                    : serverValidation.password
                }
                errMsg="Please enter a valid password"
                inputValidations={passwordValidations}
              />
              {serverValidation.userAlreadyExists && (
                <div className="text-rose-600 ">
                  <p>User with this email or username already exists</p>
                </div>
              )}
              <p className="form-actions">
                {isSubmitting ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    type="submit"
                    className="button opacity-50 text-2xl bg-primary pt-1 pb-1 pl-3 pr-3 rounded-md 2xl:text-2xl xl:text-2xl  2xl:scale-100 xl:scale-[.8] flex justify-center items-center gap-1 w-full"
                  >
                    Signing up ...
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    type="submit"
                    className="button text-2xl bg-primary pt-1 pb-1 pl-3 pr-3 rounded-md 2xl:text-2xl xl:text-2xl  2xl:scale-100 xl:scale-[.8] flex justify-center items-center gap-1 w-full"
                  >
                    Sign up
                  </motion.button>
                )}
              </p>
              <footer className="text-primaryText flex flex-col gap-5">
                <div className="flex gap-4">
                  <Checkbox />
                </div>
                <div className="flex gap-2 text-sm md:text-lg">
                  <p>Already have an account?</p>
                  <Link to={"/auth/login"} className="text-primary">
                    Log In
                  </Link>
                </div>
              </footer>
            </form>
          </main>
          <footer className="hidden"></footer>
        </>
      )}
    </section>
  );
}
