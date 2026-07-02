export const MOODS = [
    "HAPPY",
    "SAD",
    "ANGRY",
    "ANXIOUS",
    "CALM",
    "EXCITED",
    "STRESSED",
    "GRATEFUL",
    "NEUTRAL",
] as const;

export type Mood = (typeof MOODS)[number];