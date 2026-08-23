import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DateField } from "./date-time/DateField";
import { TimeField } from "./date-time/TimeField";
import { MoodSelector } from "./mood/MoodSelector";
import { TagsInput } from "./tags/TagsInput";

import { journalDetailsConstants } from "@/constants/journal/journal-details";
import type { Mood } from "@/types/common/mood";
import { cn } from "@/lib/utils";

export interface JournalDetailsCardProps {
    date: Date;
    mood: Mood | null;
    tags: string[];

    onMoodChange: (mood: Mood) => void;
    onTagsChange: (tags: string[]) => void;

    moodError?: string;
    tagsError?: string;

    onDateClick?: () => void;
    onTimeClick?: () => void;

    disabled?: boolean;
    className?: string;
}

export function JournalDetailsCard({
    date,
    mood,
    tags,
    onMoodChange,
    onTagsChange,
    moodError,
    tagsError,
    onDateClick,
    onTimeClick,
    disabled = false,
    className,
}: JournalDetailsCardProps) {
    return (
        <Card
            className={cn(
                "shadow-sm transition-shadow duration-200 hover:shadow-md",
                className,
            )}
        >
            <CardHeader>
                <CardTitle>
                    {journalDetailsConstants.section.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <DateField
                        value={date}
                        disabled={disabled}
                        onClick={onDateClick}
                    />

                    <TimeField
                        value={date}
                        disabled={disabled}
                        onClick={onTimeClick}
                    />
                </div>

                <MoodSelector
                    value={mood}
                    disabled={disabled}
                    onChange={onMoodChange}
                    error={moodError}
                />

                <TagsInput
                    value={tags}
                    onChange={onTagsChange}
                    disabled={disabled}
                    error={tagsError}
                />
            </CardContent>
        </Card>
    );
}

export default React.memo(JournalDetailsCard);