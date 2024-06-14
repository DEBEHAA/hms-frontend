import { Button } from "@/components/ui/button";
import { getAllAppointments } from "@/db/appointments";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import DashDataTable from "../shared/DashDataTable";

const queryString = `?sort=-appointmentDate&populate=doctor:name|chamberTime,patient:name|mobileNo&limit=6&appointmentDate[gte]=${new Date().toISOString()}`;

const PatientOverviewAppointments = () => {
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
  ];

  return (
    <div className="px-3 py-5 md:px-5">
      <h3 className="mb-5 text-xl font-semibold text-gray-700">
        Upcoming appointments
      </h3>
      <DashDataTable
        columns={columns}
        data={appointments}
        isLoading={appointmentsQuery.isFetching}
        filterPlaceholder={"Search appointments..."}
        noPagination={true}
      />
      <div className="flex justify-center">
        <Button
          className="mt-5 rounded-full bg-blue px-5 py-6 hover:bg-blue/90"
          asChild
        >
          <Link to="/dashboard/patient/appointments">
            View all appointments
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PatientOverviewAppointments;
