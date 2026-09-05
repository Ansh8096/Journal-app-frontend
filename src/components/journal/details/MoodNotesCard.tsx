import { Leaf } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { moodConfig } from "./JournalDetailsConfig";

import type { JournalResponse } from "@/types/api/journal";
import { moodNotes } from "@/constants/journal/mood-notes";

interface MoodNotesCardProps {
    journal: JournalResponse;
}

export default function MoodNotesCard({
    journal,
}: MoodNotesCardProps) {
    const mood = moodConfig[journal.mood];
    const MoodIcon = mood.icon;

    return (
        <Card
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-emerald-300
                bg-gradient-to-br
                from-emerald-100
                via-emerald-50/70
                to-background
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-emerald-400
                hover:shadow-md
                dark:border-emerald-900/50
                dark:from-emerald-950/30
                dark:via-emerald-950/10
                dark:to-background
            "
        >
            <Leaf
                className="
                    absolute
                    bottom-2
                    right-2
                    h-16
                    w-16
                    text-emerald-300/60
                    transition-transform
                    duration-300
                    group-hover:scale-110
                    dark:text-emerald-700/30
                "
            />

            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <MoodIcon
                        className="
                            h-5
                            w-5
                            text-emerald-600
                            dark:text-emerald-400
                        "
                    />
                    Mood Notes
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                    {moodNotes[journal.mood]}
                </p>
            </CardContent>
        </Card>
    );
}