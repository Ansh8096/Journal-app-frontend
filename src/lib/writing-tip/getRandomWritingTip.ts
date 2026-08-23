import { WRITING_TIPS } from "@/constants/journal/journal-writing-tip";
import type { WritingTip } from "@/types/journal/writing-tip";

/**
 * Returns a random writing tip.
 */
export function getRandomWritingTip(): WritingTip {
    const randomIndex = Math.floor(
        Math.random() * WRITING_TIPS.length
    );

    return WRITING_TIPS[randomIndex];
}

/**
 * Returns a random writing tip that is different
 * from the previously displayed one.
 */
export function getNextWritingTip(
    currentTipId?: string
): WritingTip {
    if (WRITING_TIPS.length <= 1) {
        return WRITING_TIPS[0];
    }

    const availableTips = WRITING_TIPS.filter(
        (tip) => tip.id !== currentTipId
    );

    const randomIndex = Math.floor(
        Math.random() * availableTips.length
    );

    return availableTips[randomIndex];
}