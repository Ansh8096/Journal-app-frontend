import {
    Smile,
    Frown,
    Brain,
    Angry,
    Leaf,
    PartyPopper,
    Meh,
    HeartHandshake,
    Zap,
} from "lucide-react";

import type { MoodOption } from "@/types/common/mood";

export const journalDetailsConstants = {
    section: {
        title: "Journal Details",
    },

    date: {
        label: "Date",
    },

    time: {
        label: "Time",
    },

    mood: {
        label: "Mood",
        description: "How are you feeling?",
    },

    tags: {
        label: "Tags",
        placeholder: "Add tags...",
        maxTags: 10,
        maxTagLength: 30,
    },
} as const;

export const MOOD_OPTIONS: readonly MoodOption[] = [
    {
        value: "HAPPY",
        label: "Happy",
        icon: Smile,
        colorClass:
            "text-green-600 dark:text-green-400",
        bgClass:
            "bg-green-50 dark:bg-green-950/30",
        borderClass:
            "border-green-200 dark:border-green-800/60",
    },
    {
        value: "SAD",
        label: "Sad",
        icon: Frown,
        colorClass:
            "text-blue-600 dark:text-blue-400",
        bgClass:
            "bg-blue-50 dark:bg-blue-950/30",
        borderClass:
            "border-blue-200 dark:border-blue-800/60",
    },
    {
        value: "ANXIOUS",
        label: "Anxious",
        icon: Brain,
        colorClass:
            "text-orange-600 dark:text-orange-400",
        bgClass:
            "bg-orange-50 dark:bg-orange-950/30",
        borderClass:
            "border-orange-200 dark:border-orange-800/60",
    },
    {
        value: "ANGRY",
        label: "Angry",
        icon: Angry,
        colorClass:
            "text-red-600 dark:text-red-400",
        bgClass:
            "bg-red-50 dark:bg-red-950/30",
        borderClass:
            "border-red-200 dark:border-red-800/60",
    },
    {
        value: "CALM",
        label: "Calm",
        icon: Leaf,
        colorClass:
            "text-teal-600 dark:text-teal-400",
        bgClass:
            "bg-teal-50 dark:bg-teal-950/30",
        borderClass:
            "border-teal-200 dark:border-teal-800/60",
    },
    {
        value: "EXCITED",
        label: "Excited",
        icon: PartyPopper,
        colorClass:
            "text-pink-600 dark:text-pink-400",
        bgClass:
            "bg-pink-50 dark:bg-pink-950/30",
        borderClass:
            "border-pink-200 dark:border-pink-800/60",
    },
    {
        value: "NEUTRAL",
        label: "Neutral",
        icon: Meh,
        colorClass:
            "text-slate-600 dark:text-slate-400",
        bgClass:
            "bg-slate-50 dark:bg-slate-950/30",
        borderClass:
            "border-slate-200 dark:border-slate-800/60",
    },
    {
        value: "GRATEFUL",
        label: "Grateful",
        icon: HeartHandshake,
        colorClass:
            "text-purple-600 dark:text-purple-400",
        bgClass:
            "bg-purple-50 dark:bg-purple-950/30",
        borderClass:
            "border-purple-200 dark:border-purple-800/60",
    },
    {
        value: "STRESSED",
        label: "Stressed",
        icon: Zap,
        colorClass:
            "text-amber-700 dark:text-amber-400",
        bgClass:
            "bg-amber-50 dark:bg-amber-950/30",
        borderClass:
            "border-amber-200 dark:border-amber-800/60",
    },
] as const;