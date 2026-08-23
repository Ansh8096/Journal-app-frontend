import type { Mood } from "@/types/common/mood";

export interface DraftCardData {
    id: string;
    title: string;
    preview: string;
    updatedAt: string;
    mood: Mood | null;
    tags: string[];
    coverImageUrl: string | null;
}