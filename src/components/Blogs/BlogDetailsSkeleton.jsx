import { Skeleton } from "../ui/skeleton";

const BlogDetailsSkeleton = () => {
  return (
    <div className="mb-3 rounded-lg bg-white p-5 md:p-10">
      <Skeleton className="mx-auto mb-5 h-5 w-3/4 md:h-7 lg:h-8" />
      <Skeleton className="mb-3 aspect-video w-full" />
      <Skeleton className="mx-auto mb-3 h-5 w-1/2 min-w-[240px] max-w-[360px]" />
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        <Skeleton className="h-[18px] w-[80px] rounded-full" />
        <Skeleton className="h-[18px] w-[70px] rounded-full" />
        <Skeleton className="h-[18px] w-[90px] rounded-full" />
        <Skeleton className="h-[18px] w-[80px] rounded-full" />
        <Skeleton className="h-[18px] w-[70px] rounded-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-24" />
        <Skeleton className="h-16" />
        <Skeleton className="h-20" />
      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;
