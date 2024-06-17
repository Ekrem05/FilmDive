import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../http/movies";
import Imdb from "../components/Imdb/Imdb";
export default function MovieDetails() {
  const params = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["details"],
    queryFn: () => getMovieDetails(params.id),
  });
  console.log(data);
  return (
    <>
      <section className="relative bg-bgdrk h-auto pb-8">
        <img
          id="details-img"
          src={`https://image.tmdb.org/t/p/original/${data.backdropPath}`}
          alt=""
        />
        <section className="absolute w-[100%] top-[10%] left-[6%] flex flex-row gap-5">
          <img
            width={"350px"}
            src={`https://image.tmdb.org/t/p/original/${data.posterPath}`}
            alt=""
          />
          <article className="flex flex-col">
            <h2 className="text-[46pt] text-headersdrk max-w-xl">
              {data.title}
            </h2>
            <section className="flex flex-row gap-2">
              <Imdb widthStar={30} rating={5.5} />
              <div>{data.runtime}m</div>
              <div>{data.releaseDate.slice(0, 4)}</div>
            </section>
            <ul>
              {data.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <p>{data.overview}</p>
          </article>
        </section>
      </section>
    </>
  );
}
