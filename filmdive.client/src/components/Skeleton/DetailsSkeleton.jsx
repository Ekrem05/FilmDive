import { Skeleton } from "@/components/ui/skeleton";
export default function DetailsSkeleton() {
  return (
    <>
      <section className=" hidden md:flex sm:pt-56 sm:pl-56  w-[100%] h-svh flex-col">
        <section className=" top-[15%] left-[10%]  flex flex-row gap-5">
          <section className=" flex flex-col items-center gap-4">
            <Skeleton className="w-[350px] h-[525px] bg-purple-50 self-center rounded-2xl" />

            <Skeleton className="w-64 bg-base h-9" />
          </section>

          <section className="flex flex-col gap-6">
            <Skeleton className="w-64 bg-purple-50 h-14" />
            <section className="flex gap-4">
              <Skeleton className="w-8 bg-base h-6" />
              <Skeleton className="w-8 bg-base h-6" />
              <Skeleton className="w-8 bg-base h-6" />
            </section>
            <Skeleton className="w-[50rem] bg-base h-24" />
            <section className="flex gap-4">
              <Skeleton className="w-24 bg-base h-6" />
              <Skeleton className="w-[36rem] bg-base h-6" />
            </section>
            <section className="flex gap-4">
              <Skeleton className="w-24 bg-base h-6" />
              <Skeleton className="w-[36rem] bg-base h-6" />
            </section>
            <Skeleton className="w-64 bg-base h-6" />
          </section>
        </section>
      </section>
      <section className=" min-h-[2700px] flex sm:hidden  pt-40">
        <section className="flex flex-col gap-5  overflow-x-hidden items-center">
          <section className="w-full flex justify-center content-center">
            <Skeleton className="w-4/5 h-[525px] bg-base self-center rounded-2xl" />
          </section>
          <section className="flex flex-col gap-6 w-4/5 items-center">
            <Skeleton className="w-full bg-base h-14" />
            <section className="flex gap-4">
              <Skeleton className="w-8 bg-base h-6" />
              <Skeleton className="w-8 bg-base h-6" />
              <Skeleton className="w-8 bg-base h-6" />
            </section>
            <Skeleton className="w-full bg-base h-24" />
            <section className="flex gap-4">
              <Skeleton className="w-full bg-base h-6" />
              <Skeleton className="w-full bg-base h-6" />
            </section>
            <section className="flex gap-4">
              <Skeleton className="w-full bg-base h-6" />
              <Skeleton className="w-full bg-base h-6" />
            </section>
          </section>
          <section className="flex gap-4 flex-col items-center pt-32">
            <Skeleton className="w-40 h-40 rounded-xl bg-base " />
            <Skeleton className="w-40 h-40 rounded-xl bg-base " />
            <Skeleton className="w-40 h-40 rounded-xl bg-base " />
            <Skeleton className="w-40 h-40 rounded-xl bg-base " />
          </section>

          <section className="flex gap-4  overflow-x-auto justify-center pt-40">
            <Skeleton className="w-40 h-40 rounded-xl bg-base " />
            <Skeleton className="w-40 h-40 rounded-xl bg-base " />
            <Skeleton className="w-40 h-40 rounded-xl bg-base " />
            <Skeleton className="w-40 h-40 rounded-xl bg-base " />
          </section>
        </section>
      </section>
    </>
  );
}
