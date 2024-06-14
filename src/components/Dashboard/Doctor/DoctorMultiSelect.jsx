import { FancyMultiSelect } from "@/components/shared/FancyMultiSelect";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";

const DoctorMultiSelect = ({
  label,
  name,
  placeholder,
  formControl,
  disabled,
  onSelectChange,
  initialSelectables = [],
  initialSelected = [],
}) => {
  const [selected, setSelected] = useState(initialSelected);

  useEffect(() => {
    onSelectChange(
      name,
      selected.map((s) => s.value),
    );
  }, [selected]);

  return (
    <div>
      <FormField
        control={formControl}
        label={label}
        name={name}
        render={() => (
          <FormItem className="space-y-1">
            <FormLabel className="mb-10">{label}</FormLabel>
            <FormControl>
              <FancyMultiSelect
                selected={selected}
                setSelected={setSelected}
                placeholderText={placeholder}
                initialSelectables={initialSelectables}
              />
            </FormControl>
            <FormMessage className="text-[13px]" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DoctorMultiSelect;
