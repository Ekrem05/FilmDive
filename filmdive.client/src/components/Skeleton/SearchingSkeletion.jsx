import { Skeleton } from "@/components/ui/skeleton";
export default function SearchingSkeletion() {
  console.log("in");
  return (
    <ul className="absolute bg-base flex flex-col gap-5 rounded-b-md overflow-y-auto h-64  w-64 sm:w-72  px-3 py-2">
      <li className="flex items-center justify-between">
        <Skeleton className="w-12 h-20 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-24 rounded-md h-4" />
          <Skeleton className="w-24 rounded-md h-4" />
        </div>
        <Skeleton className="w-16 h-4 rounded-md" />
      </li>
      <li className="flex items-center justify-between">
        <Skeleton className="w-12 h-20 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-24 rounded-md h-4" />
          <Skeleton className="w-24 rounded-md h-4" />
        </div>
        <Skeleton className="w-16 h-4 rounded-md" />
      </li>
      <li className="flex items-center justify-between">
        <Skeleton className="w-12 h-20 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-24 rounded-md h-4" />
          <Skeleton className="w-24 rounded-md h-4" />
        </div>
        <Skeleton className="w-16 h-4 rounded-md" />
      </li>
      <li className="flex items-center justify-between">
        <Skeleton className="w-12 h-20 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-24 rounded-md h-4" />
          <Skeleton className="w-24 rounded-md h-4" />
        </div>
        <Skeleton className="w-16 h-4 rounded-md" />
      </li>
    </ul>
  );
}
