import { Skeleton } from "@/components/ui/skeleton";
import MovieCardSkeleton from "./MovieCardSkeleton";
export default function MovieListSkeleton() {
  return (
    <>
      <section className="hidden md:flex overflow-x-hidden gap-3">
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
      </section>
      <section className="flex md:hidden overflow-x-hidden  gap-5 ">
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
      </section>
    </>
  );
}
