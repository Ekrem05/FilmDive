export default function TrendingCard({ movie }) {
  return (
    <>
      <img
        className="rounded-xl"
        width={"150px"}
        src={`https://image.tmdb.org/t/p/original/${movie.imageUrl}`}
        alt=""
      />
      <p className="text-accentdrk text-xl w-32 text-center overflow-ellipsis overflow-hidden whitespace-nowrap">
        {movie.name}
      </p>
      <div className="w-[100%] flex justify-between items-center pr-3">
        <Imdb rating={movie.rating} />
        <p className="text-secondarydrk">{movie.releaseDate}</p>
      </div>
    </>
  );
}
