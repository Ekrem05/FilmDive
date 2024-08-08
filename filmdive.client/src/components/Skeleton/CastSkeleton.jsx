import { Skeleton } from "@/components/ui/skeleton";
export default function CastSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Skeleton className="w-full h-[250px] bg-headerColor self-center rounded-2xl" />
        <div className="flex justify-between">
          <Skeleton className="w-4/6 h-7  bg-headerColor self-center rounded-2xl" />
          <Skeleton className="w-1/5 h-4 bg-headerColor self-center rounded-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="w-full h-[250px] bg-headerColor self-center rounded-2xl" />
        <div className="flex justify-between">
          <Skeleton className="w-4/6 h-7  bg-headerColor self-center rounded-2xl" />
          <Skeleton className="w-1/5 h-4 bg-headerColor self-center rounded-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="w-full h-[250px] bg-headerColor self-center rounded-2xl" />
        <div className="flex justify-between">
          <Skeleton className="w-4/6 h-7  bg-headerColor self-center rounded-2xl" />
          <Skeleton className="w-1/5 h-4 bg-headerColor self-center rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
