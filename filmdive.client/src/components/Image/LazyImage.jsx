import { useState } from "react";
import placeholder from "../../assets/MoviePlaceholder.jpg";
import { AnimatePresence, motion } from "framer-motion";
export default function LazyImage({ path, lazyLoad = true, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);

  function handleLoad() {
    setIsLoaded(true);
  }
  return (
    <>
      <AnimatePresence mode="popLayout">
        {!isLoaded && lazyLoad && (
          <motion.img
            src={placeholder}
            initial={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            alt=""
            {...props}
          />
        )}
      </AnimatePresence>
      <motion.img
        {...props}
        className={
          isLoaded ? "rounded-xl grow 2xl:w-full  overflow-hidden" : "hidden"
        }
        src={`https://image.tmdb.org/t/p/original/${path}`}
        alt=""
        loading="eager"
        onLoad={handleLoad}
      />
    </>
  );
}
