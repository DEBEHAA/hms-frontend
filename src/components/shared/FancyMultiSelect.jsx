"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

export function FancyMultiSelect({
  selected,
  setSelected,
  initialSelectables = [],
  placeholderText = "Select...",
}) {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectables, setSelectables] = useState(initialSelectables);

  const handleUnselect = useCallback((val) => {
    setSelected((prev) => prev.filter((s) => s.value !== val.value));
  }, []);

  const handleKeyDown = useCallback((e) => {
    const input = inputRef.current;

    if (!input) return;

    if ((e.key === "Delete" || e.key === "Backspace") && input.value === "") {
      setSelected((prev) => prev.slice(0, -1));
    }

    if (e.key === "Escape") {
      input.blur();
    }
  }, []);

  const handleInputChange = (inputText) => {
    setInputValue(inputText);

    setSelectables((prev) => {
      const filtered = prev.filter((val) => !val.isCustom);

      const isAlreadySelected = selected.some(
        (val) => val.value?.toLowerCase() === inputText.toLowerCase(),
      );

      const isAlreadyInSelectables = filtered.some(
        (val) => val.value?.toLowerCase() === inputText.toLowerCase(),
      );

      if (inputText === "" || isAlreadySelected || isAlreadyInSelectables)
        return filtered;

      return [
        ...filtered,
        {
          value: inputText,
          label: inputText,
          isCustom: true,
        },
      ];
    });
  };

  useEffect(() => {
    setSelectables(
      initialSelectables.filter(
        (val) => !selected.some((s) => s.value === val.value),
      ),
    );
  }, [selected]);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
      filter={(value, search) => {
        const regex = new RegExp(search, "i");

        if (regex.test(value)) return 1;
        return 0;
      }}
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm transition-colors focus-within:border-blue/60">
        <div className="flex flex-wrap gap-1">
          {selected.map((val) => {
            return (
              <Badge key={val.value} variant="secondary">
                {val.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(val);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(val)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={handleInputChange}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholderText}
            className="ml-2 flex-1 bg-transparent py-1 text-[15px] outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full">
                <ScrollArea
                  className={cn(selectables.length > 7 ? "h-60" : "h-auto")}
                >
                  {selectables.map((val) => {
                    return (
                      <CommandItem
                        key={val.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          setInputValue("");
                          setSelected((prev) => [...prev, val]);
                        }}
                        className={"cursor-pointer"}
                      >
                        {!val.isCustom
                          ? val.label
                          : `create new "${val.label}"`}
                      </CommandItem>
                    );
                  })}
                </ScrollArea>
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
