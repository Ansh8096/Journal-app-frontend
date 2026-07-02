import type { Mood } from "../common/mood";

export interface CreateJournalRequest {
    title: string;
    content: string;
    mood: Mood;
}

export interface UpdateJournalRequest {
    title: string;
    content: string;
    mood: Mood;
}

export interface JournalResponse {
    id: string;
    title: string;
    content: string;
    mood: Mood;
    createdAt: string;
    updatedAt: string;
}

export interface JournalSummary {
    id: string;
    title: string;
    contentPreview: string;
    mood: Mood;
    createdAt: string;
}

export interface JournalPageResponse {
    journals: JournalSummary[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface JournalSearchCriteria {
    page?: number;
    size?: number;
    query?: string;
    mood?: Mood;
    from?: string;
    to?: string;
}