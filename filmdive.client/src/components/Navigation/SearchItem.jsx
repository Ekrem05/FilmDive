import { useNavigate } from "react-router";

export default function SearchItem({ item }) {
  const navigate = useNavigate();
  function handleClick() {
    if (item.itemType === "Movie") {
      navigate(`/movie/${item.id}`);
    } else if (item.itemType === "Series") {
      navigate(`/details/${item.id}`);
    } else if (item.itemType === "Person") {
      navigate(`/movies/all/all/all/default/${item.id}`);
    }
  }
  return (
    <div
      className="flex text-primaryText items-center gap-3 hover:cursor-pointer hover:bg-primary rounded-md p-1"
      onClick={handleClick}
      key={item.key}
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${item.imagePath}`}
        className="w-16 rounded-3xl"
        alt=""
      />
      <p>{item.name}</p>
      <p className="text-callToAction">{item.year}</p>
    </div>
  );
}
