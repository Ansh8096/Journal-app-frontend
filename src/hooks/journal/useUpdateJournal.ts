import { useMutation, useQueryClient } from "@tanstack/react-query";

import journalService from "@/services/journal.service";
import { journalKeys } from "@/lib/react-query/query-keys";

import type { JournalResponse, UpdateJournalRequest } from "@/types/api/journal";

interface UpdateJournalVariables {
    journalId: string;
    request: UpdateJournalRequest;
    images?: File[];
}

export function useUpdateJournal() {
    // Think of queryClient as the manager of React Query's cache.
    // It knows: What data is cached, Which queries are active, or Which queries should be refetched or removed
    const queryClient = useQueryClient();

    // Unlike useQuery, which fetches data, useMutation is used for operations that change data.
    return useMutation<
        JournalResponse,
        Error,
        UpdateJournalVariables
    >({
        // This is the function React Query runs when you call: mutation()
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

        // This runs only after the API request succeeds
        onSuccess: (
            updatedJournal,
        ) => {


            /**
             * --------------------------------------------------------------
             * DETAIL CACHE
             * --------------------------------------------------------------
             *
             * The API has already returned the
             * complete updated JournalResponse.
             *
             * Therefore we don't need another
             * GET /journals/:id request.
             */

            queryClient.setQueryData(
                journalKeys.detail(
                    updatedJournal.id,
                ),

                updatedJournal,
            );

            /**
             * --------------------------------------------------------------
             * LIST CACHE
             * --------------------------------------------------------------
             *
             * There may be many cached list
             * combinations:
             *
             * - different pages
             * - search queries
             * - moods
             * - favorites
             * - tags
             * - date ranges
             *
             * Manually updating all of them would
             * be unnecessarily complicated.
             *
             * Mark the complete list family stale.
             *
             * Active list queries will refetch.
             */

            queryClient.invalidateQueries({
                queryKey:
                    journalKeys.lists(),

                refetchType:
                    "active",
            });

        },
    });
}
