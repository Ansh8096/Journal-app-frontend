import {
    ArrowDownWideNarrow,
    ArrowUpNarrowWide,
    ArrowUpAZ,
    ArrowDownZA,
} from "lucide-react";

import type {
    JournalSortItem,
    JournalSortOption,
} from "@/types/journal/journal-filter";

export const DEFAULT_JOURNAL_SORT: JournalSortOption =
    "publishedAt,desc";

export const JOURNAL_SORT_OPTIONS:
    readonly JournalSortItem[] = [
        {
            label: "Newest",
            value: "publishedAt,desc",
            icon: ArrowDownWideNarrow,
        },
        {
            label: "Oldest",
            value: "publishedAt,asc",
            icon: ArrowUpNarrowWide,
        },
        {
            label: "Title (A–Z)",
            value: "title,asc",
            icon: ArrowUpAZ,
        },
        {
            label: "Title (Z–A)",
            value: "title,desc",
            icon: ArrowDownZA,
        },
    ] as const;