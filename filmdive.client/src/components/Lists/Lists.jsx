import CardList from "./CardList";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getUpcomingMovies,
} from "../../http/movies";
import {
  getAiringTodayTvSeries,
  getAiringTvSeries,
  getPopularTvSeries,
} from "@/http/series";

export default function Lists() {
  return (
    <main className="bg- bg-bgdrk flex flex-col pl-5 pr-5 md:pl-20 md:pr-20 pb-10">
      <CardList
        fn={getNowPlayingMovies}
        fnKey={["now-playing"]}
        subject={"movie"}
        title={"Now playing"}
        key={"Now playing movies"}
      />
      <CardList
        fn={getPopularMovies}
        fnKey={["popular-movies"]}
        subject={"movie"}
        title={"Most popular"}
        key={"most popular movies"}
      />
      <CardList
        fn={getUpcomingMovies}
        fnKey={["upcomming-movies"]}
        subject={"movie"}
        title={"Upcomming"}
        key={"upcomming-movies"}
      />
      <CardList
        fn={getPopularTvSeries}
        fnKey={["popular-tv-series"]}
        subject={"details"}
        title={"Popular TV Series"}
        key={"popular-tv-series"}
      />

      <CardList
        fn={getAiringTodayTvSeries}
        fnKey={["airing-today-series"]}
        subject={"details"}
        title={"Airing Today"}
        key={"airing-today"}
      />
      <CardList
        fn={getAiringTvSeries}
        fnKey={["on-the-air"]}
        subject={"details"}
        title={"On The Air"}
        key={"on-the-air"}
      />
    </main>
  );
}
