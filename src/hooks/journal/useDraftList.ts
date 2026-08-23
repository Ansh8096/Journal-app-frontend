import {
    keepPreviousData,
    useQuery,
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";

import {
    draftKeys,
} from "@/lib/react-query/query-keys";

import type {
    DraftJournalQuery,
} from "@/types/api/journal";

export function useDraftList(
    criteria?: DraftJournalQuery,
) {
    return useQuery({
        queryKey:
            draftKeys.list(criteria),

        queryFn:
            () =>
                journalService.getDrafts(
                    criteria,
                ),

        placeholderData:
            keepPreviousData,
    });
}