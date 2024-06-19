import { Link } from "react-router-dom";
export default function MovieCredits({ movie }) {
  console.log(movie);
  const starring = movie.credits.cast.map((person) => person.name).join(", ");
  const directing = movie.credits.crew.map((person) => person.name).join(", ");

  return (
    <>
      <section className="flex gap-4">
        <h5 className="text-accentdrk">Starring</h5>
        <p className="text-highlightdrk w-[50rem] opacity-80">{starring}</p>
      </section>
      <section className="flex gap-4">
        <h5 className="text-accentdrk">Directing</h5>
        <p className="text-highlightdrk w-[50rem] opacity-85">{directing}</p>
      </section>
    </>
  );
}
