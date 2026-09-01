import type { WritingTip } from "@/types/journal/writing-tip";


export const DEFAULT_WRITING_TIP: Readonly<WritingTip> = {
    id: "safe-space",
    title: "Writing Tip",
    message:
        "Your journal is a safe space.\nWrite freely. Be honest. Reflect deeply.",
};

// TODO: This will bw used when we want to display random tip card
export const WRITING_TIPS: readonly WritingTip[] = [
    DEFAULT_WRITING_TIP,

    {
        id: "small-step",
        title: "Writing Tip",
        message:
            "Small thoughts today can become great memories tomorrow.",
    },

    {
        id: "gratitude",
        title: "Writing Tip",
        message:
            "Write one thing you're grateful for before anything else.",
    },

    {
        id: "growth",
        title: "Writing Tip",
        message:
            "Every page is another step toward understanding yourself.",
    },
] as const;