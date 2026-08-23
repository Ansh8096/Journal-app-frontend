import {
    useQuery,
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";

import {
    draftKeys,
} from "@/lib/react-query/query-keys";

import type {
    DraftOverview,
} from "@/types/api/journal";

export function useDraftOverview() {
    return useQuery<
        DraftOverview,
        Error
    >({
        queryKey:
            draftKeys.overview(),

        queryFn:
            () =>
                journalService.getDraftOverview(),
    });
}