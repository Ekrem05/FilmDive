import Star from "../Icons/Star";
export default function MovieStats({ movie }) {
  const genres = movie.genres.map((genre) => `${genre.name}`).join(", ");
  return (
    <>
      <section className="stats md:flex hidden  flex-row items-center">
        <div className={`flex items-center text-white`}>
          <Star className={"w-8 fill-primaryText"} />
          <span className={`text-xl md:text-xs text-primaryText  lg:text-xl`}>
            {movie.voteAverage.toFixed(1)}
          </span>
        </div>
      </section>
      <p className="text-callToAction tracking-tight hidden  md:block ">
        {genres}
      </p>
      <section className=" md:hidden flex-row justify-evenly">
        <div className={`flex items-center text-white`}>
          <Star className={"w-7"} />
          <span className={`text-xl md:text-xs lg:text-lg`}>
            {movie.voteAverage.toFixed(1)}
          </span>
        </div>
        <p className="text-primary tracking-tight   md:block ">{genres}</p>
      </section>
      <p className="text-primaryText md:w-[58rem] opacity-100">
        {movie.overview}
      </p>
    </>
  );
}
