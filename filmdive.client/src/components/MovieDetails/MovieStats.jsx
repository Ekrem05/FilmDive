import Star from "../Icons/Star";
export default function MovieStats({ movie }) {
  const genres = movie.genres.map((genre) => `${genre.name}`).join(", ");
  return (
    <>
      <section className="stats md:flex hidden  flex-row items-center">
        <div className="flex items-center justify-start gap-5 text-primaryText">
          <div className={`flex items-center text-primaryText`}>
            <Star className={"w-8 fill-primaryText"} />
            <span className={`text-xl md:text-xs  lg:text-xl`}>
              {movie.voteAverage.toFixed(1)}
            </span>
          </div>
          <span className="text-primary">|</span>
          <h4 className="text-lg">{movie.releaseDate.split("-")[0]}</h4>
          {movie.runtime !== 0 && (
            <>
              <span className="text-primary">|</span>
              <h4 className="text-lg">{movie.runtime}m</h4>
            </>
          )}
        </div>
      </section>
      <p className="text-callToAction tracking-tight hidden  md:block ">
        {genres}
      </p>
      <section className=" md:hidden flex-row justify-evenly">
        <div className={`flex items-center text-white`}>
          <Star className={"w-7 fill-primaryText"} />
          <span className={`text-xl md:text-xs lg:text-lg text-primaryText `}>
            {movie.voteAverage.toFixed(1)}
          </span>
        </div>
        <p className="text-callToAction tracking-tight   md:block ">{genres}</p>
      </section>
      <p className="text-primaryText md:w-[58rem] opacity-100">
        {movie.overview}
      </p>
    </>
  );
}
