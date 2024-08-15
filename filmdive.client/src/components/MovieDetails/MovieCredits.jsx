import { Link } from "react-router-dom";
export default function MovieCredits({ movie }) {
  console.log(movie);
  const starring = movie.credits.cast.map((person) => person.name).join(", ");
  const directing = movie.credits.crew.map((person) => person.name).join(", ");

  return (
    <>
      <section className="flex gap-4">
        <h5 className="text-callToAction">Starring</h5>
        <p className="text-primaryText w-[50rem] opacity-90">{starring}</p>
      </section>
      <section className="flex gap-4">
        <h5 className="text-callToAction">Directing</h5>
        <p className="text-primaryText w-[50rem] opacity-90">{directing}</p>
      </section>

      {movie.revenue !== 0 && (
        <section className="flex gap-4">
          <h5 className="text-callToAction">Revenue</h5>
          <p className="text-primaryText w-[50rem] opacity-90">
            {movie.revenue.toLocaleString(`en-US`)}$
          </p>
        </section>
      )}
    </>
  );
}
