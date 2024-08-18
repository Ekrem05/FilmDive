import { Await, Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getRecommendations } from "../http/movies";
import MovieStats from "../components/MovieDetails/MovieStats";
import MovieCredits from "../components/MovieDetails/MovieCredits";
import MovieClips from "../components/MovieDetails/MovieClips";
import LazyImage from "@/components/Image/LazyImage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DetailsSkeleton from "@/components/Skeleton/DetailsSkeleton";
import Button from "@/components/Buttons/Button";
import Companies from "@/components/MovieDetails/Companies";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import YouMayAlsoLike from "@/components/Lists/YouMayAlsoLike";
import useWatchlist from "@/hooks/useWatchlist";
import authorize from "@/utils/authorize";
export default function MovieDetails() {
  const [isSaved, setIsSaved] = useState(false);
  const params = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["details", params.id],
    queryFn: async () => {
      const token = await authorize();
      return getMovieDetails({ id: params.id, token: token });
    },
  });
  const { add, remove } = useWatchlist();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(data);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      setIsSaved(data.isSaved);
    }
  }, [pathname, params.id, data]);
  async function handleBookmark() {
    const token = await authorize();
    if (token) {
      setIsSaved(true);
      add({
        token: token,
        id: params.id,
        posterPath:data.posterPath,
        title: data.title,
        voteAverage: data.voteAverage,
        releaseDate: data.releaseDate,
        genre: "movie",
      });
    } else {
      navigate("/auth/login");
    }
  }
  async function handleRemoval() {
    const token = await authorize();
    if (token) {
      setIsSaved(false);
      console.log("sss");
      remove({
        token: token,
        id: params.id,
        genre: "movie",
      });
    } else {
      navigate("/auth/login");
    }
  }
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
                <MovieStats movie={data} />
                <MovieCredits movie={data} />
                <MovieClips movie={data} />
              </article>
            </section>
            <Companies data={data.productionCompanies} />
          </section>
          <YouMayAlsoLike
            id={data.id}
            fn={getRecommendations}
            subject={"movie"}
          />
        </main>
      )}
    </>
  );
}
