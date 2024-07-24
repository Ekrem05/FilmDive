import { Skeleton } from "@/components/ui/skeleton";
export default function DetailsSkeleton() {
  return (
    <section className="flex w-[100%] h-svh">
      <section className="absolute top-[15%] left-[10%]  flex flex-row gap-5">
        <Skeleton className="w-[350px] h-[525px] bg-secondarydrk self-center rounded-2xl" />
        <section className="flex flex-col gap-6">
          <Skeleton className="w-64 bg-secondarydrk h-14" />
          <section className="flex gap-4">
            <Skeleton className="w-8 bg-secondarydrk h-6" />
            <Skeleton className="w-8 bg-secondarydrk h-6" />
            <Skeleton className="w-8 bg-secondarydrk h-6" />
          </section>
          <Skeleton className="w-[50rem] bg-secondarydrk h-24" />
          <section className="flex gap-4">
            <Skeleton className="w-24 bg-secondarydrk h-6" />
            <Skeleton className="w-[36rem] bg-secondarydrk h-6" />
          </section>
          <section className="flex gap-4">
            <Skeleton className="w-24 bg-secondarydrk h-6" />
            <Skeleton className="w-[36rem] bg-secondarydrk h-6" />
          </section>
          <Skeleton className="w-64 bg-secondarydrk h-6" />
        </section>
      </section>
    </section>
  );
}
