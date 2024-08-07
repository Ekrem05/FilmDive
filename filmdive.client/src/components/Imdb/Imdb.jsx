import Star from "../Icons/Star";
export default function Imdb({
  rating,
  widthStar = 30,
  text = "lg",
  xl = "text-lg",
  ratingColor = "text-white",
}) {
  return (
    <div className={`flex items-center ${ratingColor}`}>
      <Star className={"w-5 md:w-7"} />
      <span className={`text-xs lg:text-lg  2xl:text-${text} xl:${xl} `}>
        {rating}
      </span>
    </div>
  );
}
