import { useEffect, useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export default function MovieClips({ movie }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-primaryText mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Trailers and clips
      </h2>
      <section className=" sm:w-64 xl:w-[30rem] 2xl:w-[56rem] overflow-x-auto ">
        <ul className="flex   p-4  gap-5 ">
          {movie.videos.map((video) => {
            return (
              <li
                key={video.key}
                className="bg-gradient-to-tr from-base   md:block to-primaryText"
              >
                <iframe
                  //className="w-96 "
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder="0"
                  allowFullScreen="1"
                  loading="lazy"
                ></iframe>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
