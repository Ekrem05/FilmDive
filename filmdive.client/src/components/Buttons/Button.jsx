import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function Button({
  children,
  text,
  styling,
  isLink = false,
  path,
  newTab,
  onClick,
}) {
  const tailwind =
    "bg-primaryText pt-1 pb-1 pl-3 pr-3 rounded-md text-xs xl:text-2xl xl:w-44 w-28  2xl:scale-100 xl:scale-[.8] flex justify-center items-center gap-1 " +
    styling;
  if (isLink) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <Link to={path} className={tailwind}>
          <span>{children}</span>
          {text}
        </Link>
      </motion.button>
    );
  }
  if (newTab) {
    return (
      <motion.a
        href={path}
        className={tailwind}
        target="_blank"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <span>{children}</span>
        {text}
      </motion.a>
    );
  }
  return (
    <motion.button
      className={tailwind}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 500 }}
      onClick={onClick}
    >
      <span>{children}</span>
      {text}
    </motion.button>
  );
}
