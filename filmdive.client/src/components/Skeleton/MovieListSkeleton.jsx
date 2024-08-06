import { Skeleton } from "@/components/ui/skeleton";
import MovieCardSkeleton from "./MovieCardSkeleton";
export default function MovieListSkeleton() {
  return (
    <>
      <section className="hidden md:flex gap-3">
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
      </section>
      <section className="flex md:hidden  gap-10 ">
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
      </section>
    </>
  );
}
