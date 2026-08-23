import * as React from "react";

import { MoodGrid } from "./MoodGrid";

import {
    journalDetailsConstants,
    MOOD_OPTIONS,
} from "@/constants/journal/journal-details";

import type { Mood } from "@/types/common/mood";

import { cn } from "@/lib/utils";

export interface MoodSelectorProps {
    value: Mood | null;

    onChange: (
        mood: Mood,
    ) => void;

    disabled?: boolean;

    error?: string;

    className?: string;
}

export function MoodSelector({
    value,
    onChange,
    disabled = false,
    error,
    className,
}: MoodSelectorProps) {

    return (
        <section
            aria-labelledby="journal-mood-heading"
            aria-describedby={
                error
                    ? "journal-mood-error"
                    : undefined
            }
            className={cn(
                "space-y-4",
                className,
            )}
        >

            <div className="space-y-1">

                <h3
                    id="journal-mood-heading"
                    className="text-sm font-semibold text-foreground"
                >
                    {
                        journalDetailsConstants
                            .mood
                            .label
                    }
                </h3>

                <p className="text-sm text-muted-foreground">
                    {
                        journalDetailsConstants
                            .mood
                            .description
                    }
                </p>

            </div>


            <MoodGrid
                moods={MOOD_OPTIONS}
                selectedMood={value}
                disabled={disabled}
                onSelect={onChange}
            />


            {error && (
                <p
                    id="journal-mood-error"
                    className="text-sm text-destructive"
                    role="alert"
                >
                    {error}
                </p>
            )}

        </section>
    );
}

export default React.memo(
    MoodSelector,
);