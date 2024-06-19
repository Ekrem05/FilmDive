import MovieCard from "../MovieCard/MovieCard";
import PopularMovies from "./PopularMovies";
import UpcomingMovies from "./UpcomingMovies";
export default function Lists() {
  return (
    <main className="bg- bg-bgdrk flex flex-col p-10 pl-20 pr-20">
      <PopularMovies />
      <UpcomingMovies />
    </main>
  );
}
