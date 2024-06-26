import { useEffect, useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export default function MovieClips({ movie }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-headersdrk mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Trailers and clips
      </h2>
      <ScrollArea className="w-[56rem] ">
        <ul className="flex trending-list p-4 items-start overflow-x-scroll gap-5 ">
          {movie.videos.map((video) => {
            return (
              <li
                key={video.key}
                className="bg bg-gradient-to-tr from-bgdrk to-highlightdrk"
              >
                <iframe
                  width="500px"
                  height="300px"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder="0"
                  allowFullScreen="1"
                  loading="lazy"
                ></iframe>
              </li>
            );
          })}
        </ul>
        <ScrollBar
          orientation="horizontal"
          className={"bg-highlightdrk hover:cursor-pointer "}
        />
      </ScrollArea>
    </section>
  );
}
