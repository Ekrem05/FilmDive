import svg from "../../assets/logo-transparent-white.svg";
import { useInput } from "../hooks/useInput";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTrendingMovies } from "../../http/movies";
import { AnimatePresence, motion } from "framer-motion";
import { authFoldAnimation } from "../../utils/animations";
import {
  hasMinLength,
  isNotEmpty,
  hasMaxLength,
  containsNumber,
  passwordValidations,
  usernameValidations,
} from "@/utils/validatioin";
import Input from "./Input";
import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";
import { useLocation } from "react-router-dom";
import { login } from "@/http/auth";
export default function LogIn() {
  const [serverValidation, setServerValidation] = useState({
    username: true,
    password: true,
    unauthorized: false,
  });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["trending", "signing"],
    queryFn: getTrendingMovies,
  });
  const { mutate, isPending: submitting } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refresh token", response.data.refreshToken);
        navigate("/");
      }
      if (response.status === 400) {
        const newValidationState = {
          username: true,
          password: true,
          unauthorized: false,
        };

        if (response.errors) {
          const errors = response.errors;
          if (errors.Username) {
            newValidationState.username = false;
          }
          if (errors.Password) {
            newValidationState.password = false;
          }
          if (errors[0]) {
            newValidationState.unauthorized = true;
          }
        }
        setServerValidation(newValidationState);
      }
    },
  });
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
      username: true,
      password: true,
    });
  }, [username, password]);
  function handleSubmission(event) {
    event.preventDefault();
    if (isUsernameValid && isPasswordValid) {
      const fd = new FormData(event.target);
      const inputs = Object.fromEntries(fd.entries());
      mutate({ username: inputs.username, password: inputs.password });
    }
  }
  {
    console.log(currentBg);
  }
  return (
    <section className=" relative flex  justify-center bg-bgdrk h-auto pb-8">
      {data && (
        <>
          <AnimatePresence>
            <motion.img
              key={data[currentBg].title}
              {...authFoldAnimation}
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
              {serverValidation.unauthorized && (
                <div className="text-rose-600">
                  <p>Wrong username or password</p>
                </div>
              )}
              <p className="form-actions">
                {submitting ? (
                  <button
                    disabled
                    className="button bg-headersdrk opacity-50 pt-1 pb-1 pl-3 pr-3 rounded-md text-xs xl:text-2xl  2xl:scale-100 xl:scale-[.8] flex justify-center items-center gap-1 w-full"
                  >
                    Logging in ...
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    type="submit"
                    className="button bg-headersdrk pt-1 pb-1 pl-3 pr-3 rounded-md text-xs xl:text-2xl  2xl:scale-100 xl:scale-[.8] flex justify-center items-center gap-1 w-full"
                  >
                    Log In
                  </motion.button>
                )}
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
