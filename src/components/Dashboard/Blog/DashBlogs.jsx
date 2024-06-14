import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/db/blog";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../shared/DashboardHeader";
import DashBlogsTable from "./DashBlogsTable";

const DashBlogs = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const blogsQuery = useQuery({
    queryKey: ["blogs", { postedBy: user?.role }],
    queryFn: () =>
      getAllBlogs(
        `?postedBy=${user?.role}${user.role === "admin" ? "" : `&author=${user._id}`}`,
      ),
    enabled: !!user?._id,
  });

  const blogs = blogsQuery.data?.data?.blogs || [];

  const handleAddBlog = () => navigate("new");

  return (
    <>
      <DashboardHeader title="Blogs" desc="Manage all of your blog posts" />
      <div className="h-[calc(100dvh-80px)] w-full overflow-y-auto">
        <div className="p-3 sm:p-5 xl:p-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Blog List</h2>
            <Button
              onClick={handleAddBlog}
              className="bg-blue hover:bg-blue/90"
            >
              Add Blog
            </Button>
          </div>
          <DashBlogsTable blogs={blogs} isFetching={blogsQuery.isFetching} />
        </div>
      </div>
    </>
  );
};

export default DashBlogs;
