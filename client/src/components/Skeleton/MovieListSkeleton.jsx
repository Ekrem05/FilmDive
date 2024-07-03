import { Skeleton } from "@/components/ui/skeleton";
import MovieCardSkeleton from "./MovieCardSkeleton";
export default function MovieListSkeleton() {
  return (
    <>
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
    </>
  );
}
