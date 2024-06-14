import { Skeleton } from "../ui/skeleton";

const DoctorsSkeleton = () => {
  return (
    <div className="w-full rounded-md bg-white p-5">
      <Skeleton className="mb-5 h-4 w-[240px]" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {[...Array(6)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-full border border-gray-200/50 bg-gray-50 p-5 lg:flex lg:gap-6 lg:p-2 xl:gap-4"
          >
            <Skeleton className="mb-5 size-40 bg-gray-200/70 lg:h-full xl:h-[136px] 2xl:h-full" />
            <div className="2xl:py-2">
              <Skeleton className="mb-6 h-5 w-48 bg-gray-200/70" />
              <Skeleton className="mb-4 h-4 w-48 bg-gray-200/70" />
              <Skeleton className="mb-4 h-4 w-40 bg-gray-200/70" />
              <Skeleton className="mb-4 h-4 w-52 bg-gray-200/70" />
              <Skeleton className="mb-7 h-4 w-36 bg-gray-200/70" />
              <div className="flex items-center gap-2 sm:flex-col md:flex-row">
                <Skeleton className="h-8 w-full max-w-[100px] bg-gray-200/70 sm:max-w-full md:max-w-[110px] 2xl:w-[140px]" />
                <Skeleton className="h-8 w-full max-w-[120px] bg-gray-200/70 sm:max-w-full md:max-w-[130px] 2xl:w-[160px]" />
              </div>
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default DoctorsSkeleton;
