import Star from "../Icons/Star";
export default function Imdb({
  rating,
  widthStar = 30,
  text = "l",
  xl = "text-lg",
  ratingColor = "text-white",
}) {
  return (
    <div className={`flex items-center ${ratingColor}`}>
      <Star width={widthStar} />
      <span className={`text-sm  2xl:text-${text} xl:${xl}`}>{rating}</span>
    </div>
  );
}
