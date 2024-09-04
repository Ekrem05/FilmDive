import React, { useEffect } from "react";
import Lottie from "lottie-react";
import json from "../../public/notFoundAnimation.json";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function NotFound() {
  return (
    <Link
      className={`flex ${localStorage.getItem(
        "theme"
      )} w-full h-screen justify-center bg-base`}
      to={"/"}
    >
      <Lottie
        animationData={json}
        loop={true}
        autoplay={true}
        className="w-full"
      />
    </Link>
  );
}
