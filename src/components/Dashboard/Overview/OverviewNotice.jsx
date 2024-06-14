import { getAllNotice } from "@/db/notice";
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const OverviewNotice = ({ role = null }) => {
  const noticeQuery = useQuery({
    queryKey: ["notice", role],
    queryFn: () => getAllNotice("?limit=4&sort=-createdAt"),
    enabled: !!role,
  });

  const notices = noticeQuery.data?.data?.notices || [];

  return (
    <div className="px-3 pt-5 md:px-5">
      <div className="grid grid-cols-[auto_1fr] overflow-hidden rounded-sm bg-gray-100">
        <h3 className="bg-blue px-2.5 py-2.5 text-[15px] font-medium text-white">
          <span className="mr-1.5 hidden sm:inline-block">Latest</span>Notice:
        </h3>
        <div className="p-2.5">
          <Marquee pauseOnHover={true}>
            {notices.map((notice, index) => (
              <Link
                to={`/dashboard/${role}/notice/${notice._id}`}
                key={notice._id}
                className="text-sm text-gray-600 hover:text-blue"
              >
                <span className="px-5">{notice.title}</span>
                <span className="text-gray-400">{" | "}</span>
              </Link>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default OverviewNotice;
