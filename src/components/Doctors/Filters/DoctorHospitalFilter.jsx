import FancyCombobox from "@/components/shared/FancyCombobox";
import { getAllHospitals } from "@/db/hospital";
import { useQuery } from "@tanstack/react-query";

const DoctorHospitalFilter = ({ hospital, setHospital, district }) => {
  let queryString = `?fields=name&limit=${Number.MAX_SAFE_INTEGER}`;

  if (district) queryString += `&district=${district}`;

  const hospitalsQuery = useQuery({
    queryKey: ["hospitals", queryString],
    queryFn: () => getAllHospitals(queryString),
  });

  const hospitals =
    hospitalsQuery.data?.data?.hospitals?.map((h) => h.name) || [];

  return (
    <div>
      <FancyCombobox
        selected={hospital}
        setSelected={setHospital}
        selectables={hospitals}
        label="Hospital"
        disabled={hospitalsQuery.isFetching}
      />
    </div>
  );
};

export default DoctorHospitalFilter;
