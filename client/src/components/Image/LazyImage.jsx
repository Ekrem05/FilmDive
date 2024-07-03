import { useState } from "react";
import placeholder from "../../assets/MoviePlaceholder.jpg";

export default function LazyImage({ path, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);

  function handleLoad() {
    setIsLoaded(true);
  }
  return (
    <>
      <img
        src={placeholder}
        alt=""
        className={isLoaded ? "hidden" : "block"}
        {...props}
      />

      <img
        {...props}
        className={
          isLoaded ? "rounded-xl grow max-w-[200%] overflow-hidden" : "hidden"
        }
        width={"250px"}
        src={`https://image.tmdb.org/t/p/original/${path}`}
        alt=""
        onLoad={handleLoad}
      />
    </>
  );
}
