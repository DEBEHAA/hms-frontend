import { bookAppointment, checkExistingAppointment } from "@/db/appointments";
import generateDayId from "@/lib/generateDayId";
import { useStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

const days = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
};

const DoctorAppointment = ({ doctorOffDays, doctorId, hospitalId }) => {
  const user = useStore((state) => state.user);
  const [date, setDate] = useState(null);
  const [existingAppointment, setExistingAppointment] = useState(null);

  const offDays = doctorOffDays?.map((od) => days[od]) || [];
  const notPatient =
    !user || user?.role === "doctor" || user?.role === "hospital";

  const queryClient = useQueryClient();

  const appointmentsQuery = useQuery({
    queryKey: ["appointments", { doctorId, patientId: user?.profile?._id }],
    queryFn: () => checkExistingAppointment(doctorId, user?.profile?._id),
  });

  const appointments = appointmentsQuery.data?.data?.appointments || [];

  const appointmentMutation = useMutation({
    mutationFn: bookAppointment,
    onSuccess: (result) => {
      if (result.status === "success") {
        toast.success("Appointment booked successfully");
        setDate(null);

        queryClient.invalidateQueries(["appointments"]);
      } else {
        toast.error(result.message || "Failed to book appointment");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to book appointment");
    },
  });

  const handleAppointmentBooking = () => {
    if (!date)
      return toast.error("Please select a date to book an appointment");

    const appointmentData = {
      doctor: doctorId,
      hospital: hospitalId,
      appointmentDate: date.toISOString(),
    };

    appointmentMutation.mutate(appointmentData);
  };

  useEffect(() => {
    if (!date) {
      return setExistingAppointment(null);
    }

    const dayId = generateDayId(date);

    const _existingAppointment = appointments.find(
      (appointment) => appointment.dayId === dayId,
    );

    if (_existingAppointment) {
      setExistingAppointment(_existingAppointment);
    } else {
      setExistingAppointment(null);
    }
  }, [date]);

  return (
    <div className="bg-white">
      <div
        id="appointment"
        className="relative mx-auto flex max-w-[360px] flex-col items-center justify-center gap-3.5 bg-white p-6 aria-disabled:pointer-events-none"
        aria-disabled={notPatient}
      >
        {notPatient && (
          <div className="absolute bottom-0 left-0 right-0 top-0 z-[2] flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
            <p className="bg-black/5 p-5 text-center">
              {user
                ? "Login with a patient profile to book an appointment"
                : "Please login to book an appointment"}
            </p>
          </div>
        )}
        <div className="spac-y-2">
          <h2 className="w-full font-semibold">Book Your Appointment</h2>
          <p className="text-sm text-gray-500">
            Choose a suitable date to book your appointment with the doctor
          </p>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full rounded-md border [&>:first-child]:justify-center"
          disabled={(date) => {
            const currentDay = new Date();
            return (
              date < currentDay ||
              offDays.includes(date.getDay()) ||
              date > currentDay.setDate(currentDay.getDate() + 20)
            );
          }}
        />
        {existingAppointment && (
          <p className="text-sm text-gray-500">
            You already have an appointment on this date with this doctor and
            serial number:{" "}
            <span className="text-[15px] text-blue">
              {String(existingAppointment.serialNo).padStart(2, "0")}
            </span>
          </p>
        )}
        <Button
          onClick={handleAppointmentBooking}
          className="w-full bg-blue hover:bg-blue/90"
          size="lg"
          disabled={
            !date || existingAppointment || appointmentMutation.isPending
          }
        >
          {appointmentMutation.isPending
            ? "Booking Appointment..."
            : "Confirm Appointment"}
        </Button>
      </div>
    </div>
  );
};

export default DoctorAppointment;
