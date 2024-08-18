import { useQuery } from "@tanstack/react-query";
import MovieStats from "../components/MovieDetails/MovieStats";
import MovieCredits from "../components/MovieDetails/MovieCredits";
import MovieClips from "../components/MovieDetails/MovieClips";
import LazyImage from "@/components/Image/LazyImage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import authorize from "@/utils/authorize";
import useWatchlist from "@/hooks/useWatchlist";
import { useLocation, useNavigate } from "react-router-dom";
import DetailsSkeleton from "@/components/Skeleton/DetailsSkeleton";
import Button from "@/components/Buttons/Button";
import Companies from "@/components/MovieDetails/Companies";
import YouMayAlsoLike from "@/components/Lists/YouMayAlsoLike";
import { getRecommendations, getShowDetails } from "@/http/series";
import SeriesStats from "@/components/MovieDetails/SeriesStats";
export default function SeriesDetails() {
  const params = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["series-details", params.id],
    queryFn: async () => {
      const token = await authorize();
      return getShowDetails({ id: params.id, token: token });
    },
  });
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      console.log(data.isSaved);
      setIsSaved(data.isSaved);
    }
  }, [pathname, params.id, data]);
  const { add, remove } = useWatchlist();
  const navigate = useNavigate();
  async function handleBookmark() {
    const token = await authorize();
    if (token) {
      setIsSaved(true);
      add({
        token: token,
        id: params.id,
        posterPath: data.posterPath,
        title: data.title,
        voteAverage: data.voteAverage,
        releaseDate: data.firstAirDate.split("T")[0],
        genre: "series",
      });
    } else {
      navigate("/auth/login");
    }
  }
  async function handleRemoval() {
    const token = await authorize();
    if (token) {
      setIsSaved(false);
      remove({
        token: token,
        id: params.id,
        genre: "series",
      });
    } else {
      navigate("/auth/login");
    }
  }
  console.log(isSaved);
  return (
    <>
      {isPending && (
        <section className="bg-base w-[100%] h-[100%]">
          <DetailsSkeleton />
        </section>
      )}
      {!isPending && (
        <main className=" bg-base flex flex-col gap-10 pb-32">
          <section className=" relative flex flex-col md:block gap-64 md:gap-5 bg-base pb-8 ">
            <div className="hidden md:block">
              <LazyImage
                path={data.backdropPath}
                id="details-img"
                className=""
              />
            </div>

            <section className="relative md:absolute top-40  md:top-[15%] md:left-52  flex flex-col md:flex-row gap-5">
              <section className="flex flex-col gap-4 md:justify-normal justify-center items-center">
                <div className="relative">
                  <img
                    className="self-start  rounded-2xl"
                    width={"350px"}
                    src={`https://image.tmdb.org/t/p/original/${data.posterPath}`}
                    alt=""
                  />
                  {isSaved ? (
                    <IoBookmark
                      className={`absolute top-1 right-1 z-1 text-primaryText size-12 hover:bg-primary  bg-gray-600 hover:cursor-pointer bg-opacity-50 rounded-2xl p-2 `}
                      onClick={handleRemoval}
                    />
                  ) : (
                    <IoBookmarkOutline
                      className={`absolute top-1 right-1 z-1 text-white size-12 hover:bg-primary  bg-gray-600 hover:cursor-pointer bg-opacity-50 rounded-2xl p-2 `}
                      onClick={handleBookmark}
                    />
                  )}
                </div>

                <Button
                  text={"Watch now"}
                  styling={"2xl:w-9/12 text-base bg-primary"}
                  path={data.homepage}
                  newTab={true}
                ></Button>
              </section>

              <article className="flex flex-col gap-4 w-full px-4 ">
                <h2 className="text-4xl md:text-start text-center text-primaryText max-w-xl font-extrabold tracking-tight lg:text-5xl scroll-m-20">
                  {data.title}
                </h2>
                <SeriesStats series={data} />
                <MovieCredits movie={data} />
                <MovieClips movie={data} />
              </article>
            </section>
            <Companies data={data.productionCompanies} />
          </section>
          <YouMayAlsoLike
            id={data.id}
            fn={getRecommendations}
            subject={"details"}
          />
        </main>
      )}
    </>
  );
}
