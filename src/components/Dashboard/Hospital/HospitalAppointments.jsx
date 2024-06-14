import { Button } from "@/components/ui/button";
import { getAllAppointments } from "@/db/appointments";
import { getHospitalDoctors } from "@/db/doctor";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import DashboardHeader from "../shared/DashboardHeader";
import HospitalAppointmentFilter from "./HospitalAppointmentFilter";
import HospitalAppointmentTable from "./HospitalAppointmentTable";

const HospitalAppointments = () => {
  const [queryString, setQueryString] = useState(
    `?sort=-appointmentDate&populate=doctor:name|chamberTime,patient:name|mobileNo`,
  );

  const appointmentsQuery = useQuery({
    queryKey: ["appointments", queryString],
    queryFn: () => getAllAppointments(queryString),
  });

  const doctorsQuery = useQuery({
    queryKey: ["hospitalDoctors", `?fields=_id,name`],
    queryFn: () => getHospitalDoctors(`?fields=_id,name`),
  });

  const appointments = appointmentsQuery.data?.data?.appointments || [];
  const doctors = doctorsQuery.data?.data?.doctors || [];

  return (
    <>
      <DashboardHeader title="Appointments" desc="View upcoming appointments" />
      <div className="h-[calc(100dvh-80px)] w-full">
        <div className="p-3 sm:p-5 xl:p-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Appointment List</h2>
            <Button
              // onClick={handleAddDoctor}
              className="bg-blue hover:bg-blue/90"
            >
              <FaDownload className="mr-2" /> Download PDF
            </Button>
          </div>
          <div className="space-y-3">
            <HospitalAppointmentFilter
              doctors={doctors}
              setQueryString={setQueryString}
            />
            <HospitalAppointmentTable
              appointments={appointments}
              isFetching={appointmentsQuery.isFetching}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalAppointments;
