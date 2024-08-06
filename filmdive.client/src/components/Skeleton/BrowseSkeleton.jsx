import { Skeleton } from "@/components/ui/skeleton";
import MovieCardSkeleton from "./MovieCardSkeleton";
export default function BrowseSkeleton() {
  return (
    <>
      <Skeleton className="lg:w-64 lg:h-[427px] w-36 h-60 bg-secondarydrk" />
      <Skeleton className="lg:w-64 lg:h-[427px] w-36 h-60 bg-secondarydrk" />
      <Skeleton className="lg:w-64 lg:h-[427px] w-36 h-60 bg-secondarydrk" />
      <Skeleton className="lg:w-64 lg:h-[427px] w-36 h-60 bg-secondarydrk" />{" "}
      <Skeleton className="lg:w-64 lg:h-[427px] w-36 h-60 bg-secondarydrk" />{" "}
      <Skeleton className="lg:w-64 lg:h-[427px] w-36 h-60 bg-secondarydrk" />
    </>
  );
}
