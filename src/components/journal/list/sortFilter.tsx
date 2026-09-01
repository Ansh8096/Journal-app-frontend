import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { JOURNAL_SORT_OPTIONS } from "@/constants/journal/journal-sort";
import type { JournalSortOption } from "@/types/journal/journal-filter";
import { cn } from "@/lib/utils";

interface SortFilterProps {
    value: JournalSortOption;
    onChange: (value: JournalSortOption) => void;
}

export default function SortFilter({
    value,
    onChange,
}: SortFilterProps) {
    const [open, setOpen] = React.useState(false);

    const selectedOption = JOURNAL_SORT_OPTIONS.find(
        (option) => option.value === value,
    );

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-11 w-full justify-between xl:w-52"
                >
                    <span className="flex items-center gap-2">
                        {selectedOption && (
                            <selectedOption.icon className="h-4 w-4" />
                        )}

                        {selectedOption?.label}
                    </span>

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="start"
                className="w-51 p-0"
            >
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {JOURNAL_SORT_OPTIONS.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => {
                                        onChange(option.value);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />

                                    <option.icon className="mr-2 h-4 w-4" />

                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}