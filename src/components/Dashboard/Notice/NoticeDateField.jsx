import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const NoticeDateField = ({
  startDate,
  startDateError,
  handleDateChange,
  disabled,
}) => {
  return (
    <div>
      <h3 className="mb-1 text-sm font-medium text-[#020817]">Start Date</h3>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start py-5 text-left font-normal",
              !startDate && "text-muted-foreground",
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={handleDateChange}
            disabled={(date) => {
              const currentDay = new Date();
              currentDay.setHours(0, 0, 0, 0);

              return date < currentDay;
            }}
          />
        </PopoverContent>
      </Popover>
      {startDateError && (
        <p className="mt-1 text-[13px] text-[#ef4444]">
          {startDateError.message}
        </p>
      )}
    </div>
  );
};

export default NoticeDateField;
