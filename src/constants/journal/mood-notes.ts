import type { Mood } from "@/types/common/mood";

export const moodNotes: Record<Mood, string> = {
    HAPPY: "You felt happy while writing this journal.",

    EXCITED:
        "Your excitement shines through this journal entry.",

    CALM:
        "You were calm and composed while reflecting today.",

    GRATEFUL:
        "Your journal reflects gratitude and appreciation.",

    NEUTRAL:
        "A balanced and thoughtful journal entry.",

    SAD:
        "You expressed sadness honestly and thoughtfully.",

    ANGRY:
        "Your journal captures strong emotions and frustration.",

    ANXIOUS:
        "You shared feelings of uncertainty and concern.",

    STRESSED:
        "This journal reflects a stressful moment in your day.",
} as const;