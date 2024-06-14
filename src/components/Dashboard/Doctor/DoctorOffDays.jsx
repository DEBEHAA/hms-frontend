import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronDownIcon } from "lucide-react";

const days = [
  { value: "FRI", label: "Friday" },
  { value: "SAT", label: "Saturday" },
  { value: "SUN", label: "Sunday" },
  { value: "MON", label: "Monday" },
  { value: "TUE", label: "Tuesday" },
  { value: "WED", label: "Wednesday" },
  { value: "THU", label: "Thursday" },
];

const DoctorOffDays = ({
  formControl,
  disabled,
  onCheckedChange,
  checkedDays,
}) => {
  return (
    <FormField
      control={formControl}
      label={"Off Days"}
      name={"offDays"}
      render={() => (
        <FormItem className="space-y-1">
          <FormLabel className="mb-10">{"Off Days"}</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex w-full items-center justify-between py-[22px] hover:bg-slate-50"
                variant="outline"
              >
                {checkedDays.length === 0
                  ? "Select off days"
                  : checkedDays.length <= 3
                    ? `${checkedDays.join(", ")}`
                    : `${checkedDays.length} selected`}{" "}
                <ChevronDownIcon size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {days.map((day) => (
                <DropdownMenuCheckboxItem
                  checked={checkedDays.includes(day.value)}
                  onCheckedChange={(checked) =>
                    onCheckedChange(day.value, checked)
                  }
                  key={day.value}
                >
                  {day.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};

export default DoctorOffDays;
