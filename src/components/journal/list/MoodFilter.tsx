import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { MOOD_OPTIONS as MOODS } from "@/constants/journal/journal-details";
import type { Mood } from "@/types/common/mood";

interface MoodFilterProps {
    value?: Mood;
    onChange: (mood?: Mood) => void;
}

export default function MoodFilter({
    value,
    onChange,
}: MoodFilterProps) {
    return (
        <Select
            value={value ?? "all"}
            onValueChange={(selectedValue) =>
                onChange(
                    selectedValue === "all"
                        ? undefined
                        : (selectedValue as Mood),
                )
            }
        >
            <SelectTrigger className="w-45">
                <SelectValue placeholder="All moods" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="all">
                    All moods
                </SelectItem>

                {MOODS.map((mood) => {
                    const Icon = mood.icon;

                    return (
                        <SelectItem
                            key={mood.value}
                            value={mood.value}
                        >
                            <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                <span>{mood.label}</span>
                            </div>
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}