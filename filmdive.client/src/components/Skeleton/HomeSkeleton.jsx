import { Skeleton } from "@/components/ui/skeleton";
export default function HomeSkeleton() {
  return (
    <section className="flex w-[100%] h-svh">
      <section className="absolute top-[45%] left-[4%] flex flex-row gap-5">
        <section className="flex flex-col gap-6">
          <Skeleton className=" w-40 h-9 md:w-[30rem] bg-headerColor md:h-24" />
          <section className="flex gap-4">
            <Skeleton className="w-20 bg-headerColor h-8" />
            <Skeleton className="w-10 bg-headerColor h-8" />
          </section>
          <Skeleton className=" w-64 md:w-[30rem] bg-headerColor h-14" />
          <section className="flex gap-4">
            <Skeleton className="w-32 bg-headerColor h-8" />
            <Skeleton className="w-32 hidden md:block bg-headerColor h-8" />
          </section>
          <section className="hidden md:flex flex-col gap-4 mt-10">
            <Skeleton className="w-52 bg-headerColor h-14" />
          </section>
        </section>
      </section>
    </section>
  );
}
