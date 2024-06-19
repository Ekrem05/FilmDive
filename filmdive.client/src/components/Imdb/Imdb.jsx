import Star from "../Icons/Star";
export default function Imdb({
  rating,
  widthStar = 30,
  text = "l",
  ratingColor = "text-white",
}) {
  return (
    <div className={`flex items-center ${ratingColor}`}>
      <Star width={widthStar} />
      <span className={`  text-${text}`}>{rating}</span>
    </div>
  );
}
