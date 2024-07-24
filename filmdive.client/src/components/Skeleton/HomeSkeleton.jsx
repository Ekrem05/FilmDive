import { Skeleton } from "@/components/ui/skeleton";
export default function HomeSkeleton() {
  return (
    <section className="flex w-[100%] h-svh">
      <section className="absolute top-[45%] left-[4%] flex flex-row gap-5">
        <section className="flex flex-col gap-6">
          <Skeleton className="w-[30rem] bg-secondarydrk h-24" />
          <section className="flex gap-4">
            <Skeleton className="w-20 bg-secondarydrk h-8" />
            <Skeleton className="w-10 bg-secondarydrk h-8" />
          </section>
          <Skeleton className="w-[30rem] bg-secondarydrk h-14" />
          <section className="flex gap-4">
            <Skeleton className="w-32 bg-secondarydrk h-8" />
            <Skeleton className="w-32 bg-secondarydrk h-8" />
          </section>
          <section className="flex flex-col gap-4 mt-10">
            <Skeleton className="w-52 bg-secondarydrk h-14" />
            <section className="flex gap-4 pl-12">
              <Skeleton className="w-32 bg-secondarydrk h-52" />
              <Skeleton className="w-32 bg-secondarydrk h-52" />
              <Skeleton className="w-32 bg-secondarydrk h-52" />
              <Skeleton className="w-32 bg-secondarydrk h-52" />
              <Skeleton className="w-32 bg-secondarydrk h-52" />
              <Skeleton className="w-32 bg-secondarydrk h-52" />
              <Skeleton className="w-32 bg-secondarydrk h-52" />
              <Skeleton className="w-32 bg-secondarydrk h-52" />
              <Skeleton className="w-32 bg-secondarydrk h-52" />
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
