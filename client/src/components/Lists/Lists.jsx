import MovieCard from "../MovieCard/MovieCard";
import PopularMovies from "./PopularMovies";
import UpcomingMovies from "./UpcomingMovies";
export default function Lists() {
  return (
    <main className="bg- bg-bgdrk flex flex-col pl-5 pr-5 md:pl-20 md:pr-20">
      <PopularMovies />
      <UpcomingMovies />
    </main>
  );
}
