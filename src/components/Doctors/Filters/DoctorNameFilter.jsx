import FancyCombobox from "@/components/shared/FancyCombobox";
import { getAllDoctors } from "@/db/doctor";
import { useQuery } from "@tanstack/react-query";

const DoctorNameFilter = ({ district, hospital, doctor, setDoctor }) => {
  let queryString = `?fields=name&limit=${Number.MAX_SAFE_INTEGER}`;

  if (district) queryString += `&district=${district}`;
  if (hospital) queryString += `&hospital=${hospital}`;

  const doctorsQuery = useQuery({
    queryKey: ["doctors", queryString],
    queryFn: () => getAllDoctors(queryString),
  });

  const doctors = doctorsQuery.data?.data?.doctors?.map((d) => d.name) || [];

  return (
    <div>
      <FancyCombobox
        selected={doctor}
        setSelected={setDoctor}
        selectables={doctors}
        label="Doctor Name"
        disabled={doctorsQuery.isFetching}
      />
    </div>
  );
};

export default DoctorNameFilter;
