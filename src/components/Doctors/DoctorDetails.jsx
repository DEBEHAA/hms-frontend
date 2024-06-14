import { Skeleton } from "../ui/skeleton";
import DoctorProfileShare from "./DoctorProfileShare";

const DataRow = ({ title, value }) => {
  return (
    <tr className="text-[13px] text-[#151515] sm:text-sm">
      <td className="w-2/5 max-w-[130px] border border-[#ebebeb] bg-[#f8f8f8] px-2 py-3 font-semibold sm:w-[200px] sm:max-w-none sm:px-5">
        {title}
      </td>
      <td className="border border-[#ebebeb] px-2 py-3 sm:px-5">{value}</td>
    </tr>
  );
};

const DoctorDetails = ({ doctor, isFetching }) => {
  const {
    name,
    photo,
    qualifications,
    about,
    specialities,
    designation,
    languages,
    institute,
    department,
    appointmentNo,
    chamberTime,
    offDays,
    floorNo,
    roomNumber,
    branchNames,
    bmdcNo,
    // consulatationFee,
    phone,
    // feesToShowReport,
    hospital,
  } = doctor;

  return (
    <div className=" bg-white p-2.5 sm:p-6">
      <div className="grid grid-cols-1 items-start gap-x-10 gap-y-8 xl:grid-cols-[290px_1fr] 2xl:grid-cols-[320px_1fr]">
        {!isFetching ? (
          <div className="mx-auto max-w-[400px] shadow-sm">
            <img
              src={
                photo ||
                "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=400:*"
              }
              alt={name}
              className="mx-auto aspect-[3/4] object-cover"
            />
            <div className="px-5 pb-5 pt-5 text-center">
              <h2 className="mb-2 text-xl font-medium text-blue">{name}</h2>
              <p className="mb-1 text-[15px] text-gray-500">
                <span className="font-medium text-gray-700">Designation:</span>{" "}
                {designation}
              </p>
              <p className="text-[15px] text-gray-500">
                <span className="font-medium text-gray-700">
                  Qualifications:
                </span>{" "}
                {qualifications}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="mt-5 flex flex-col items-center gap-3">
              <Skeleton className="h-3 w-3/5" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        )}
        <div className="">
          <div className="mb-5 flex items-center justify-between gap-5">
            <h2 className="text-lg font-medium sm:text-xl">
              Additional Information
            </h2>
            <DoctorProfileShare doctorId={doctor._id} />
          </div>
          <div className="mb-5 text-[15px] sm:text-base">
            <p className="text-gray-500">{about}</p>
          </div>
          {!isFetching ? (
            <table className="w-full border border-[#ebebeb]">
              <tbody>
                <DataRow title="Hospital" value={hospital?.name} />
                <DataRow title="Address" value={hospital?.address} />
                <DataRow title="Department" value={department} />
                <DataRow
                  title="Specialities"
                  value={specialities?.map((s) => s.name).join(", ")}
                />
                <DataRow title="Chamber Time" value={chamberTime} />
                <DataRow title="Off Days" value={offDays?.join(", ")} />
                <DataRow title="Floor No." value={floorNo} />
                <DataRow title="Room No." value={roomNumber} />
                {/* <DataRow title="Consultation Fee" value={consulatationFee} /> */}
                {/* <DataRow title="Fees to Show Report" value={feesToShowReport} /> */}
                <DataRow title="Appointment" value={appointmentNo} />
                <DataRow title="Contact" value={phone} />
                <DataRow title="Institute" value={institute} />
                <DataRow
                  title="Other Branches"
                  value={branchNames?.join("<br/>")}
                />
                <DataRow title="Languages" value={languages?.join(", ")} />
                <DataRow title="BMDC No." value={bmdcNo} />
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-[1fr_3fr] gap-2">
              {[...Array(24)].map((_, index) => (
                <Skeleton key={index} className="h-10 rounded-sm" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
