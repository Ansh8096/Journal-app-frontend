import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";

import {
    journalKeys,
} from "@/lib/react-query/query-keys";

import type {
    JournalResponse,
    UpdateJournalRequest,
} from "@/types/api/journal";

interface UpdateJournalVariables {
    journalId: string;
    request: UpdateJournalRequest;
    images?: File[];
}

export function useUpdateJournal() {
    const queryClient =
        useQueryClient();

    return useMutation<
        JournalResponse,
        Error,
        UpdateJournalVariables
    >({
        mutationFn: ({
            journalId,
            request,
            images,
        }) =>
            journalService.updateJournal(
                journalId,
                request,
                images,
            ),

        onSuccess: (
            updatedJournal,
        ) => {
            /*
             * ----------------------------------------
             * 1. UPDATE DETAIL CACHE
             * ----------------------------------------
             */
            queryClient.setQueryData(
                journalKeys.detail(
                    updatedJournal.id,
                ),
                updatedJournal,
            );

            /*
             * ----------------------------------------
             * 2. REFRESH JOURNAL LISTS
             * ----------------------------------------
             *
             * The journal may have changed:
             * - title
             * - mood
             * - favorite
             * - tags
             * - content
             * - publishedAt
             * - updatedAt
             *
             * So any cached list can now be stale.
             */
            queryClient.invalidateQueries({
                queryKey:
                    journalKeys.lists(),
                refetchType:
                    "active",
            });

            /*
             * ----------------------------------------
             * 3. REFRESH JOURNAL STATISTICS
             * ----------------------------------------
             *
             * Statistics can change when:
             * - favorite changes
             * - mood changes
             * - a journal becomes relevant to
             *   date-based statistics
             *
             * Therefore the statistics query must
             * also be marked stale.
             */
            queryClient.invalidateQueries({
                queryKey:
                    journalKeys.statistics(),
                refetchType:
                    "active",
            });
        },
    });
}