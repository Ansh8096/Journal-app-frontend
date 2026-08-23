import * as React from "react";

import MoodCard from "./MoodCard";

import type {
    Mood,
    MoodOption,
} from "@/types/common/mood";

import { cn } from "@/lib/utils";

export interface MoodGridProps {
  moods: readonly MoodOption[];
  selectedMood: Mood | null;
  disabled?: boolean;
  onSelect: (mood: Mood) => void;
  className?: string;
}

export function MoodGrid({
  moods,
  selectedMood,
  disabled = false,
  onSelect,
  className,
}: MoodGridProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Select your mood"
      className={cn(
        "grid grid-cols-2 gap-3",
        "sm:grid-cols-3",
        "lg:grid-cols-3",
        className
      )}
    >
      {moods.map((mood) => (
        <MoodCard
          key={mood.value}
          label={mood.label}
          icon={mood.icon}
          colorClass={mood.colorClass}
          bgClass={mood.bgClass}
          borderClass={mood.borderClass}
          selected={selectedMood === mood.value}
          disabled={disabled}
          onClick={() => onSelect(mood.value)}
        />
      ))}
    </div>
  );
}

export default React.memo(MoodGrid);