import { Button } from "@/components/ui/button";
import { deleteAdmin, getAdmins } from "@/db/admin";
import { useStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";
import { MdDeleteOutline } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DashDataTable from "../shared/DashDataTable";
import DashboardHeader from "../shared/DashboardHeader";

const Admins = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  const adminsQuery = useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
  });

  const admins = adminsQuery.data?.data?.admins || [];

  const handleAddAdmin = () => navigate("add");

  const deleteMutation = useMutation({
    mutationFn: (adminId) => deleteAdmin(adminId),
    onSuccess: () => {
      toast("Admin deleted successfully", { type: "success" });
      adminsQuery.refetch();
    },
    onError: (error) => {
      toast("Failed to delete admin", { type: "error" });
      console.error(error);
    },
  });

  const handleDeleteAdmin = (adminId) => {
    toast("Are you sure you want to delete this admin?", {
      description:
        "This action cannot be undone and will permanently delete the admin account.",
      cancel: (
        <Button onClick={() => toast.dismiss()} size="sm" variant="outline">
          Cancel
        </Button>
      ),
      action: (
        <Button
          onClick={() => {
            deleteMutation.mutate(adminId);
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
      accessorKey: "name",
      header: "Name",
      enableHiding: false,
    },
    {
      accessorFn: (row) => row.mobileNo,
      header: "Mobile No",
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0 py-0 hover:bg-transparent hover:text-white"
          >
            Admin Since
            {column.getIsSorted() && (
              <>
                {column.getIsSorted() === "asc" ? (
                  <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowDown className="ml-2 h-4 w-4" />
                )}
              </>
            )}
          </Button>
        );
      },
      cell: (props) => format(new Date(props.getValue()), "dd MMM yyyy"),
    },
    {
      accessorFn: (row) => row._id,
      header: "Delete",
      cell: (props) => (
        <div className="flex max-w-[200px] items-center gap-x-2">
          <Button
            className="text-[#FF5556]"
            onClick={() => handleDeleteAdmin(props.getValue())}
            variant="outline"
            size="icon"
            disabled={deleteMutation.isLoading || user._id === props.getValue()}
          >
            <MdDeleteOutline className="text-lg" />
          </Button>
        </div>
      ),
      enableHiding: false,
    },
  ];

  return (
    <>
      <DashboardHeader title="Admins" desc="Manage admin roles" />
      <div className="mx-auto h-[calc(100dvh-80px)] w-full max-w-5xl overflow-y-auto">
        <Outlet />
        <div className="p-3 sm:p-5 xl:p-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Admin List</h2>
            <Button
              onClick={handleAddAdmin}
              className="bg-blue hover:bg-blue/90"
            >
              Add Admin
            </Button>
          </div>
          <div>
            <DashDataTable
              columns={columns}
              data={admins}
              isLoading={adminsQuery.isFetching}
              filterPlaceholder={"Search admin..."}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admins;
