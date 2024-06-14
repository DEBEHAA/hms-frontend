import { Skeleton } from "@/components/ui/skeleton";
import { getAllNotice } from "@/db/notice";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NoticeForm from "./NoticeForm";

const UpdateNotice = () => {
  const { noticeId } = useParams();

  const noticeQuery = useQuery({
    queryKey: ["notice", noticeId],
    queryFn: () => getAllNotice(`?_id=${noticeId}`),
    enabled: !!noticeId,
  });

  const notice = noticeQuery.data?.data?.notices?.[0] || {};

  return (
    <div>
      {!noticeQuery.isFetching && <NoticeForm notice={notice} />}
      {noticeQuery.isFetching && (
        <div className="mx-auto max-w-xl">
          <Skeleton className="mb-1.5 h-4 w-16" />
          <Skeleton className="mb-3.5 h-10" />
          <Skeleton className="mb-1.5 h-4 w-16" />
          <Skeleton className="mb-3.5 h-24" />
          <Skeleton className="mb-1.5 h-4 w-16" />
          <Skeleton className="mb-3.5 h-10" />
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <div className="w-full">
              <Skeleton className="mb-1.5 h-4 w-16" />
              <Skeleton className="h-10" />
            </div>
            <div className="w-full">
              <Skeleton className="mb-1.5 h-4 w-16" />
              <Skeleton className="h-10" />
            </div>
          </div>
          <Skeleton className="mx-auto h-12 w-[200px]" />
        </div>
      )}
    </div>
  );
};

export default UpdateNotice;
