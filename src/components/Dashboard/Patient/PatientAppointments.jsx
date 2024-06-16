import { getAllAppointments } from "@/db/appointments";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import DashDataTable from "../shared/DashDataTable";
import DashboardHeader from "../shared/DashboardHeader";

const PatientAppointments = () => {
  const user = useStore((state) => state.user);
  const queryString = `?patient=${user.profile?._id}&sort=-appointmentDate&populate=doctor:name|chamberTime`;

  const appointmentsQuery = useQuery({
    queryKey: ["appointments", queryString],
    queryFn: () => getAllAppointments(queryString),
  });

  const appointments = appointmentsQuery.data?.data?.appointments || [];

  const columns = [
    {
      accessorKey: "dayId",
      header: "Day ID",
      enableHiding: false,
    },
    {
      accessorKey: "doctor.name",
      header: "Doctor",
      enableHiding: false,
    },
    {
      accessorFn: (row) => new Date(row.appointmentDate).toDateString(),
      header: "Appointment Date",
      enableHiding: false,
    },
    {
      accessorFn: (row) => String(row.serialNo).padStart(2, "0"),
      header: "Serial No",
    },
    {
      accessorFn: (row) => row.doctor?.chamberTime,
      header: "Chamber Time",
    },
    {
      accessorFn: (row) => {
        console.log(row.appointmentDate, new Date());
        return new Date(row.appointmentDate) > new Date()
          ? "Upcoming"
          : "Completed";
      },
      header: "Status",
      cell: (props) => {
        const status = props.getValue();

        return (
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold",
              status === "Upcoming"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600",
            )}
          >
            {status}
          </span>
        );
      },
      enableHiding: false,
    },
  ];

  return (
    <>
      <DashboardHeader title="Appointments" desc="View upcoming appointments" />
      <div className="h-[calc(100dvh-80px)] w-full">
        <div className="p-3 sm:p-5 xl:p-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Appointment List</h2>
          </div>
          
          <div>
            <DashDataTable
              columns={columns}
              data={appointments}
              isLoading={appointmentsQuery.isFetching}
              filterPlaceholder={"Search appointments..."}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientAppointments;
