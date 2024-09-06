import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useWatchlist from "@/hooks/useWatchlist";
import authorize from "@/utils/authorize";
import { useSelector } from "react-redux";
import Card from "@/components/MovieCard/Card";
export default function Watchlist() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("movies");
  const items = useSelector((state) => state.watchlist.items);
  const { get } = useWatchlist();
  useEffect(() => {
    async function fetchData() {
      const token = await authorize();
      if (token) {
        get({ token: token });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/auth/login");
      }
    }
    fetchData();
  }, []);
  return (
    <section className="bg-base pb-10 min-h-screen">
      <main className="pt-32 flex flex-col">
        <ul className="flex justify-start px-8 gap-4 text-primaryText">
          <li>
            <button
              className={`${
                selected === "movies" && "bg-primary  text-base "
              } px-3 rounded-t-2xl`}
              onClick={() => setSelected("movies")}
            >
              Movies
            </button>
          </li>
          <li>
            <button
              className={`${
                selected === "series" && "bg-primary  text-base "
              } px-3 rounded-t-2xl`}
              onClick={() => setSelected("series")}
            >
              Tv series
            </button>
          </li>
        </ul>
        <div>
          {
            <ul className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 bg-transparentdrk border-t-2 border-primary">
              {selected === "movies" ? (
                items.movies.length > 0 ? (
                  items.movies.map((item) => (
                    <li key={item.id}>
                      <Card movie={item} subject={"movie"} lazyLoad={false} />
                    </li>
                  ))
                ) : (
                  <p className="text-primaryText col-span-full text-center py-10">
                    You don't have any saved movies
                  </p>
                )
              ) : selected === "series" && items.series.length > 0 ? (
                items.series.map((item) => (
                  <li key={item.id}>
                    <Card movie={item} subject={"details"} lazyLoad={false} />
                  </li>
                ))
              ) : (
                <p className="text-primaryText col-span-full text-center py-10">
                  You don't have any saved TV series
                </p>
              )}
            </ul>
          }
        </div>
      </main>
    </section>
  );
}
