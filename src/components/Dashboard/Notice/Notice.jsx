import { Button } from "@/components/ui/button";
import { deleteNotice, getAllNotice } from "@/db/notice";
import { useStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { LuEye } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DashDataTable from "../shared/DashDataTable";
import DashboardHeader from "../shared/DashboardHeader";

const Notice = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const noticeQuery = useQuery({
    queryKey: ["notice", user.role],
    queryFn: () => getAllNotice(),
    enabled: !!user._id,
  });

  const notices = noticeQuery.data?.data?.notices || [];

  const deleteMutation = useMutation({
    mutationFn: deleteNotice,
    onSuccess: () => {
      toast.success("Notice deleted successfully");
      noticeQuery.refetch();
    },
    onError: (error) => {
      toast.error("Failed to delete notice");
      console.error(error);
    },
  });

  const handleDeleteNotice = (noticeId) => {
    toast("Are you sure you want to delete this notice?", {
      description:
        "This action cannot be undone and will permanently delete the notice.",
      cancel: (
        <Button onClick={() => toast.dismiss()} size="sm" variant="outline">
          Cancel
        </Button>
      ),
      action: (
        <Button
          onClick={() => {
            deleteMutation.mutate(noticeId);
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

  const audienceColumn = [
    {
      accessorFn: (row) =>
        row.audience[0].toUpperCase() + row.audience.slice(1),
      header: "Audience",
    },
  ];

  const adminColumns = [
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
            className="text-[#FF5556]"
            onClick={() => handleDeleteNotice(props.getValue())}
            variant="outline"
            size="icon"
          >
            <MdDeleteOutline className="text-lg" />
          </Button>
        </div>
      ),
      enableHiding: false,
    },
  ];

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      enableHiding: false,
    },
    {
      accessorFn: (row) => format(new Date(row.startDate), "dd MMM yyyy"),
      header: "Start Date",
    },
    {
      accessorFn: (row) =>
        `${row.content.slice(0, 160)}${row.content?.length > 160 ? "..." : ""}`,
      header: "Content",
      cell: (props) => (
        <span className="block min-w-[260px] max-w-sm whitespace-normal">
          {props.getValue()}
        </span>
      ),
    },
    ...(user.role === "admin" ? audienceColumn : []),
    {
      accessorKey: "status",
      header: "Status",
      cell: (props) => {
        const status = props.getValue();

        return (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
          >
            {status}
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
            <Link to={`${props.getValue()}`}>
              <LuEye className="text-lg" />
            </Link>
          </Button>
        </div>
      ),
      enableHiding: false,
    },
    ...(user.role === "admin" ? adminColumns : []),
  ];

  return (
    <>
      <DashboardHeader title="Notice" desc="Manage all notice" />
      <div className="mx-auto h-[calc(100dvh-80px)] w-full overflow-y-auto">
        <Outlet />
        <div className="p-3 sm:p-5 xl:p-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Notice List</h2>
            <Button
              onClick={() => navigate("add")}
              className="bg-blue hover:bg-blue/90"
            >
              Add Notice
            </Button>
          </div>
          <div>
            <DashDataTable
              columns={columns}
              data={notices}
              isLoading={false}
              filterPlaceholder={"Search notice..."}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;
