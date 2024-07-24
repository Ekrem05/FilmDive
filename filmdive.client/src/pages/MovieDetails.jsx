import { Await, Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../http/movies";
import MovieStats from "../components/MovieDetails/MovieStats";
import MovieCredits from "../components/MovieDetails/MovieCredits";
import MovieClips from "../components/MovieDetails/MovieClips";
import LazyImage from "@/components/Image/LazyImage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DetailsSkeleton from "@/components/Skeleton/DetailsSkeleton";
import Button from "@/components/Buttons/Button";
import Companies from "@/components/MovieDetails/Companies";
import YouMayAlsoLike from "@/components/Lists/YouMayAlsoLike";
export default function MovieDetails() {
  const params = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["details", params.id],
    queryFn: () => getMovieDetails(params.id),
  });
  const { pathname } = useLocation();
  console.log(data);
  useEffect(() => {
    console.log("here");
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      {isPending && (
        <section className="bg-bgdrk w-[100%] h-[100%]">
          <DetailsSkeleton />
        </section>
      )}
      {!isPending && (
        <main className=" bg-bgdrk flex flex-col gap-10">
          <section className="relative bg-bgdrk h-auto pb-8 ">
            <LazyImage path={data.backdropPath} id="details-img" />

            <section className="absolute  top-[15%] left-[10%] flex flex-row gap-5">
              <section className="flex flex-col gap-4 items-center">
                <img
                  className="self-start relative rounded-2xl"
                  width={"350px"}
                  src={`https://image.tmdb.org/t/p/original/${data.posterPath}`}
                  alt=""
                />
                <Button
                  text={"Watch now"}
                  styling={"2xl:w-9/12 text-bgdrk"}
                  path={data.homepage}
                  newTab={true}
                ></Button>
              </section>

              <article className="flex flex-col gap-4">
                <h2 className="text-4xl  text-headersdrk max-w-xl font-extrabold tracking-tight lg:text-5xl scroll-m-20">
                  {data.title}
                </h2>
                <MovieStats movie={data} />
                <MovieCredits movie={data} />
                <MovieClips movie={data} />
              </article>
            </section>
            <Companies data={data.productionCompanies} />
          </section>
          <YouMayAlsoLike id={data.id} />
        </main>
      )}
    </>
  );
}
