import { Button } from "@/components/ui/button";
import { deleteBlog } from "@/db/blog";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { LuEye } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import DashDataTable from "../shared/DashDataTable";

const DashBlogsTable = ({ blogs, isFetching }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (result) => {
      if (result.status === "success") {
        toast.success("Blog deleted successfully");
        queryClient.invalidateQueries(["blogs"]);
      } else {
        toast.error(result.message);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Blog deletion failed");
    },
  });

  const handleDeleteDoctor = (blogId) => {
    toast("Are you sure you want to delete this blog?", {
      description:
        "This action cannot be undone and will permanently delete the blog.",
      cancel: (
        <Button onClick={() => toast.dismiss()} size="sm" variant="outline">
          Cancel
        </Button>
      ),
      action: (
        <Button
          onClick={() => {
            deleteMutation.mutate(blogId);
            toast.dismiss();
          }}
          size="sm"
          variant="destructive"
        >
          Delete
        </Button>
      ),
      position: "top-center",
      classNames: {
        toast: "flex-wrap [&_[data-content]]:w-full justify-end",
        title: "text-sm",
        description: "mb-2",
      },
    });
  };

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
    {
      accessorFn: (row) => row._id,
      header: "Edit",
      cell: (props) => (
        <div className="flex max-w-[200px] items-center gap-x-2">
          <Button className="text-blue" variant="outline" size="icon" asChild>
            <Link to={`edit/${props.getValue()}`}>
              <TbEdit className="text-lg" />
            </Link>
          </Button>
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorFn: (row) => row._id,
      header: "Delete",
      cell: (props) => (
        <div className="flex max-w-[200px] items-center gap-x-2">
          <Button
            onClick={() => handleDeleteDoctor(props.getValue())}
            className="text-[#FF5556]"
            variant="outline"
            size="icon"
            disabled={deleteMutation.isPending}
          >
            <MdDeleteOutline className="text-lg" />
          </Button>
        </div>
      ),
      enableHiding: false,
    },
  ];

  return (
    <div>
      <DashDataTable
        data={blogs}
        columns={columns}
        filterPlaceholder={"Search blogs..."}
        isLoading={isFetching}
      />
    </div>
  );
};

export default DashBlogsTable;
