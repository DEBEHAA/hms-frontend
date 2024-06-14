import { cn } from "@/lib/utils";
import Loader from "./Loader";

const FullpageLoader = ({ message, className }) => {
  return (
    <div className="flex min-h-[calc(100dvh-80px)] items-center justify-center">
      <div className="flex flex-col gap-2">
        <Loader className={cn("size-20", className)} />
        {message && <p className="text-center">{message}</p>}
      </div>
    </div>
  );
};

export default FullpageLoader;
