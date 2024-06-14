import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const FancyCombobox = ({
  selected,
  setSelected,
  selectables,
  label,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const selectedLabel = selectables.find((s) => s === selected);

  if (selected && !selectedLabel) {
    setSelected("");
  }

  return (
    <div
      className="aria-disabled:pointer-events-none aria-disabled:opacity-60"
      aria-disabled={disabled}
    >
      <p className="mb-1 block text-sm font-medium text-gray-600">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between py-5"
          >
            {selectedLabel ? selectedLabel : `Select ${label}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {selectables.map((s) => {
                  return (
                    <CommandItem
                      key={s}
                      value={s}
                      onSelect={() => {
                        setSelected(s === selected ? "" : s);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected === s ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {s}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FancyCombobox;
