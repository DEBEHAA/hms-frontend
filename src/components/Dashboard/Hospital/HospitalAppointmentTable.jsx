import { cn } from "@/lib/utils";
import { format } from "date-fns";
import DashDataTable from "../shared/DashDataTable";

const HospitalAppointmentTable = ({ appointments, isFetching }) => {
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
      accessorFn: (row) => format(new Date(row.appointmentDate), "dd MMM yyyy"),
      header: "Appointment Date",
      enableHiding: false,
    },
    {
      accessorFn: (row) => String(row.serialNo).padStart(2, "0"),
      header: "Serial No",
    },
    {
      accessorFn: (row) => row.patient?.name,
      header: "Patient",
    },
    {
      accessorFn: (row) => row.patient?.mobileNo,
      header: "Patient Phone no.",
    },
    {
      accessorFn: (row) => row.doctor?.chamberTime,
      header: "Chamber Time",
    },
    {
      accessorFn: (row) => {
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
    <div>
      <DashDataTable
        columns={columns}
        data={appointments}
        isLoading={isFetching}
        filterPlaceholder={"Search appointments..."}
      />
    </div>
  );
};

export default HospitalAppointmentTable;
