import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import generateDayId from "@/lib/generateDayId";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Filter,
  FilterX,
} from "lucide-react";
import { useState } from "react";

const HospitalAppointmentFilter = ({ doctors, setQueryString }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [doctor, setDoctor] = useState("");

  const handleFilter = () => {
    let queryStr = `?sort=-appointmentDate&populate=doctor:name|chamberTime,patient:name|mobileNo`;

    if (date) queryStr += `&dayId=${generateDayId(date)}`;
    if (doctor) queryStr += `&doctor=${doctor}`;

    setQueryString(queryStr);
  };

  const clearFilter = () => {
    setDate(null);
    setDoctor("");

    setQueryString(
      `?sort=-appointmentDate&populate=doctor:name|chamberTime,patient:name|mobileNo`,
    );
  };

  return (
    <div className="rounded-lg border bg-white p-3 sm:p-5">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]">
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start py-5 text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between py-5"
              >
                {doctor
                  ? doctors.find((doc) => doc._id === doctor)?.name
                  : "Select a doctor"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0">
              <Command>
                <CommandList>
                  <CommandInput placeholder="Search doctor..." />
                  <CommandEmpty>No doctor found.</CommandEmpty>
                  <CommandGroup>
                    {doctors.map((doc) => {
                      return (
                        <CommandItem
                          key={doc._id}
                          value={doc.name}
                          onSelect={() => {
                            setDoctor(doc._id === doctor ? "" : doc._id);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              doctor === doc._id ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {doc.name}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={handleFilter}
            className="bg-blue py-5 hover:bg-blue/90"
          >
            <Filter className="mr-2 size-4" /> Filter
          </Button>
          <Button onClick={clearFilter} variant="outline">
            <FilterX className="mr-2 size-4" /> Clear Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalAppointmentFilter;
