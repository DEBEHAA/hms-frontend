import { FancyMultiSelect } from "@/components/shared/FancyMultiSelect";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllSpecialities } from "@/db/doctor";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

const DoctorSpecialities = ({
  initialSelected = [],
  formControl,
  disabled,
  onSelectChange,
}) => {
  const [selected, setSelected] = useState(initialSelected);

  const specialitiesQuery = useQuery({
    queryKey: ["specialities"],
    queryFn: getAllSpecialities,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const specialities = useMemo(() => {
    return (
      specialitiesQuery.data?.data?.specialities.map((speciality) => ({
        value: speciality.name,
        label: speciality.name,
      })) || []
    );
  }, [specialitiesQuery.data]);

  useEffect(() => {
    onSelectChange(
      "specialities",
      selected.map((s) => s.value),
    );
  }, [selected]);

  return (
    <FormField
      control={formControl}
      label={"Specialities"}
      name={"specialities"}
      render={() => (
        <FormItem className="space-y-1">
          <FormLabel className="mb-10">{"Specialities"}</FormLabel>
          <FormControl>
            {!specialitiesQuery.isFetching ? (
              <FancyMultiSelect
                selected={selected}
                setSelected={setSelected}
                placeholderText={"Select specialities"}
                initialSelectables={specialities}
              />
            ) : (
              <Skeleton className="h-[46px]" />
            )}
          </FormControl>
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};

export default DoctorSpecialities;
