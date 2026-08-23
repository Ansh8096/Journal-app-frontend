import type { Mood } from "@/types/common/mood";

export interface DraftFilterState {
    mood?: Mood;
    tag?: string;
    from?: string;
    to?: string;
}