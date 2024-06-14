import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/db/blog";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { LuEye } from "react-icons/lu";
import { Link } from "react-router-dom";
import DashDataTable from "../shared/DashDataTable";

const AdminOverviewBlogs = () => {
  const blogsQuery = useQuery({
    queryKey: ["blogs", { postedBy: "admin", limit: 6, sort: "-createdAt" }],
    queryFn: () => getAllBlogs("?postedBy=admin&limit=6&sort=-createdAt"),
  });

  const blogs = blogsQuery.data?.data?.blogs || [];

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "publishedDate",
      header: "Pubished Date",
      cell: (props) => {
        return format(props.getValue(), "dd MMM yyyy");
      },
    },
    {
      accessorKey: "author.name",
      header: "Author",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props) => {
        return (
          <span
            className={cn(
              "rounded-full px-2 py-1 text-[13px]",
              props.getValue() === "Published"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600",
            )}
          >
            {props.getValue()}
          </span>
        );
      },
    },
    {
      accessorFn: (row) => row._id,
      header: "View",
      cell: (props) => (
        <div className="flex max-w-[200px] items-center gap-x-2">
          <Button
            className="text-gray-600"
            variant="outline"
            size="icon"
            asChild
          >
            <Link target="_blank" to={`/blogs/${props.getValue()}`}>
              <LuEye className="text-lg" />
            </Link>
          </Button>
        </div>
      ),
      enableHiding: false,
    },
  ];

  return (
    <div className="px-3 py-5 md:px-5">
      <h3 className="mb-5 text-xl font-semibold text-gray-700">Latest Blogs</h3>
      <DashDataTable
        columns={columns}
        data={blogs}
        isLoading={blogsQuery.isFetching}
        filterPlaceholder={"Search blogs..."}
        noPagination={true}
      />
      <div className="flex justify-center">
        <Button
          className="mt-5 rounded-full bg-blue px-5 py-6 hover:bg-blue/90"
          asChild
        >
          <Link to="/dashboard/admin/blogs">View all blogs</Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminOverviewBlogs;
