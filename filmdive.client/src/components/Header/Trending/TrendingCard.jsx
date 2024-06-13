import Imdb from "../../Imdb/Imdb";
export default function TrendingCard({ movie }) {
  return (
    <li className="flex flex-col items-center basis-30 bg-black rounded-xl pb-2 hover:cursor-pointer">
      <img
        className="rounded-xl"
        width={"150px"}
        src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`}
        alt=""
      />
      <p className="text-accentdrk text-xl w-32 text-center overflow-ellipsis overflow-hidden whitespace-nowrap">
        Kingdom of the Planet of the Apes
      </p>
      <div className="w-[100%] flex justify-between items-center pr-3">
        <Imdb rating={"8.8"} />
        <p className="text-secondarydrk">2024</p>
      </div>
    </li>
  );
}
