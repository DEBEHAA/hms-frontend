import Loader from "@/components/shared/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const DashboardSkeleton = () => {
  return (
    <main className="grid h-screen grid-cols-1 bg-white lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block">
        <div className="flex h-[80px] items-center border-b border-r border-lightBG px-8">
          <Skeleton className="h-8 w-36" />
        </div>
        <div className="py-5">
          <Skeleton className="ml-8 h-5 w-12 rounded-sm" />
          <div className="mt-8 flex flex-col gap-[22px]">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-2 px-8",
                  index === 4 && "border-b border-lightBG pb-[22px]",
                )}
              >
                <Skeleton className="size-6 rounded-sm" />
                <Skeleton className="h-6 w-40 rounded-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 grid-rows-[auto_1fr]">
        <div className="flex h-16 items-center justify-between px-5 sm:h-[80px]">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-sm sm:size-11 lg:hidden" />
            <div className="">
              <Skeleton className="h-5 w-20 sm:w-24" />
              <Skeleton className="mt-2 hidden h-4 w-32 sm:block sm:w-44" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-10 rounded-full" />
            <div className="hidden sm:block">
              <Skeleton className="mb-2 h-3.5 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-center bg-lightBG">
          <div className="flex w-full max-w-64 flex-col items-center gap-4 rounded-md bg-white pb-8 pt-6 shadow-sm">
            <Loader className="size-20" />
            <h4 className="text-lg text-gray-500">Please Wait</h4>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardSkeleton;
