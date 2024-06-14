import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-lg bg-white p-5 lg:grid-cols-[auto_1fr] lg:gap-6 lg:p-2 xl:items-start xl:gap-4 2xl:items-stretch">
      <div className="">
        <img
          src={
            doctor.photo ||
            "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=400:*"
          }
          alt={doctor.name}
          className="h-full w-40 rounded-md object-cover object-center xl:w-32 2xl:w-[165px]"
        />
      </div>
      <div className="py-2 xl:py-0 2xl:py-2">
        <h3 className="mb-2 text-lg font-semibold text-blue">{doctor.name}</h3>
        <div className="mb-4 space-y-1.5 text-[15px]">
          <p>
            <span className="text-gray-500">Qualifications: </span>
            {doctor.qualifications}
          </p>
          <p>
            <span className="text-gray-500">Department: </span>
            {doctor.department}
          </p>
          <p>
            <span className="text-gray-500">Designation: </span>
            {doctor.designation}
          </p>
          <p>
            <span className="text-gray-500">Off Days: </span>
            {doctor.offDays.join(", ")}
          </p>
        </div>
        <div className="flex gap-2 sm:flex-col md:flex-row xl:flex-col 2xl:flex-row">
          <Button
            className="border-blue/50 text-blue hover:text-blue"
            variant="outline"
            size="sm"
            asChild
          >
            <Link to={`/doctors/${doctor._id}`}>View Details</Link>
          </Button>
          <Button className="bg-blue hover:bg-blue/90" size="sm" asChild>
            <Link to={`/doctors/${doctor._id}#appointment`}>
              Get Appointment
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
