import { useQuery } from "@tanstack/react-query";

import journalService from "@/services/journal.service";

import {
    draftKeys,
} from "@/lib/react-query/query-keys";

import type {
    JournalSummary,
} from "@/types/api/journal";

const CAROUSEL_PAGE_SIZE = 20;

const CAROUSEL_SORT =
    "updatedAt,desc";

export function useAllDraftsForCarousel() {
    return useQuery({
        queryKey: [
            ...draftKeys.all,
            "carousel",
            {
                size: CAROUSEL_PAGE_SIZE,
                sort: CAROUSEL_SORT,
            },
        ],

        queryFn: async (): Promise<
            JournalSummary[]
        > => {
            const allDrafts: JournalSummary[] =
                [];

            let page = 0;
            let isLastPage = false;

            while (!isLastPage) {
                const response =
                    await journalService.getDrafts({
                        page,
                        size: CAROUSEL_PAGE_SIZE,
                        sort: CAROUSEL_SORT,
                    });

                allDrafts.push(
                    ...response.journals,
                );

                isLastPage =
                    response.last ||
                    response.journals.length === 0;

                page += 1;
            }

            return allDrafts;
        },

        staleTime: 60_000,
    });
}