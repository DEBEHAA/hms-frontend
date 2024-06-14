import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";

const FilterSpecialityField = ({
  specialities,
  checkedspecialities,
  onCheckedChange,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex w-full items-center justify-between py-[22px] hover:bg-slate-50"
          variant="outline"
        >
          {checkedspecialities.length === 0
            ? "Select Specialities"
            : `${checkedspecialities.length} selected`}
          <ChevronDownIcon size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <ScrollArea className="h-48">
          {specialities.map((speciality) => (
            <DropdownMenuCheckboxItem
              checked={checkedspecialities.includes(speciality._id)}
              onCheckedChange={(checked) =>
                onCheckedChange(speciality._id, checked)
              }
              key={speciality._id}
            >
              {speciality.name}
            </DropdownMenuCheckboxItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterSpecialityField;
