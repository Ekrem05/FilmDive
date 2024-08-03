import Imdb from "../../components/Imdb/Imdb";
export default function MovieStats({ movie }) {
  const genres = movie.genres.map((genre) => `${genre.name}`).join(", ");
  return (
    <>
      <section className="stats flex flex-row items-center">
        <Imdb
          widthStar={30}
          rating={movie.voteAverage.toFixed(1)}
          ratingColor="text-accentdrk"
        />
      </section>
      <p className="text-accentdrk tracking-tight ">{genres}</p>
      <p className="text-highlightdrk w-[58rem] opacity-80">{movie.overview}</p>
    </>
  );
}
