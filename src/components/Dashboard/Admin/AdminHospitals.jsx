import { getAdminHospitals } from "@/db/hospital";
import { useQuery } from "@tanstack/react-query";
import DashDataTable from "../shared/DashDataTable";
import DashboardHeader from "../shared/DashboardHeader";

const AdminHospitals = () => {
  const hospitalsQuery = useQuery({
    queryKey: ["hospitals"],
    queryFn: () => getAdminHospitals(),
  });

  const hospitals = hospitalsQuery.data?.data.hospitals || [];

  const columns = [
    {
      accessorKey: "name",
      header: "Hospital Name",
      enableHiding: false,
    },
    {
      accessorFn: (row) => `${row.doctorsCount} doctors`,
      header: "Total",
      enableHiding: false,
    },
    {
      accessorFn: (row) => row.district || "N/A",
      header: "District",
      enableHiding: false,
    },
    {
      accessorFn: (row) => row.address || "N/A",
      header: "Full Address",
    },
    {
      accessorFn: (row) => row.contactNumber || "-",
      header: "Contact",
    },
    {
      accessorFn: (row) => row.email || "-",
      header: "Email",
    },
  ];

  return (
    <>
      <DashboardHeader title="Hospitals" desc="Observe all hospitals" />
      <div className="h-[calc(100dvh-80px)] w-full overflow-y-auto">
        <div className="p-3 sm:p-5 xl:p-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Hospitals List</h2>
          </div>
          <div className="">
            <DashDataTable
              columns={columns}
              data={hospitals}
              isLoading={hospitalsQuery.isFetching}
              filterPlaceholder={"Search hospital..."}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHospitals;
