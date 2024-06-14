import FancyCombobox from "@/components/shared/FancyCombobox";
import districtData from "../../../data/bg-districts.json";

const DoctorDistrictFilter = ({ district, setDistrict }) => {
  const selectableDistricts = districtData.districts?.map((d) => d.name);

  return (
    <div>
      <FancyCombobox
        selected={district}
        setSelected={setDistrict}
        selectables={selectableDistricts}
        label="District"
      />
    </div>
  );
};

export default DoctorDistrictFilter;
