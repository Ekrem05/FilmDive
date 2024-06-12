import Star from "../Icons/Star";
export default function Imdb({ rating, widthStar = 30, text = "l" }) {
  return (
    <div className="flex items-center">
      <Star width={widthStar} />
      <span className={`text-white text-${text}`}>{rating}</span>
    </div>
  );
}
