import type {
    JournalSearchCriteria,
} from "@/types/api/journal";

export const journalKeys = {
    all: ["journals"] as const,

    lists: () =>
        [
            ...journalKeys.all,
            "list",
        ] as const,

    list: (
        criteria?: JournalSearchCriteria,
    ) =>
        [
            ...journalKeys.lists(),
            criteria ?? {},
        ] as const,

    details: () =>
        [
            ...journalKeys.all,
            "detail",
        ] as const,

    detail: (
        id: string,
    ) =>
        [
            ...journalKeys.details(),
            id,
        ] as const,

    statistics: () =>
        [
            ...journalKeys.all,
            "statistics",
        ] as const,
};

export const draftKeys = {
    all: ["drafts"] as const,

    lists: () =>
        [
            ...draftKeys.all,
            "list",
        ] as const,

    list: (
        criteria?: JournalSearchCriteria,
    ) =>
        [
            ...draftKeys.lists(),
            criteria ?? {},
        ] as const,

    overview: () =>
        [
            ...draftKeys.all,
            "overview",
        ] as const,

    details: () =>
        [
            ...draftKeys.all,
            "detail",
        ] as const,

    detail: (
        id: string,
    ) =>
        [
            ...draftKeys.details(),
            id,
        ] as const,
};

export const weatherKeys = {
    all: ["weather"] as const,

    current: () =>
        [
            ...weatherKeys.all,
            "current",
        ] as const,
};