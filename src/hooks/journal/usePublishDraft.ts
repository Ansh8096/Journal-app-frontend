import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import journalService
    from "@/services/journal.service";

import {
    draftKeys,
    journalKeys,
} from "@/lib/react-query/query-keys";

import type {
    JournalResponse,
} from "@/types/api/journal";

export interface PublishDraftMutationVariables {
    draftId: string;
}

export function usePublishDraft() {
    const queryClient =
        useQueryClient();

    return useMutation<
        JournalResponse,
        Error,
        PublishDraftMutationVariables
    >({
        mutationFn: ({
            draftId,
        }) =>
            journalService.publishDraft(
                draftId,
            ),

        onSuccess: (
            publishedJournal,
            {
                draftId,
            },
        ) => {
            /*
             * ----------------------------------------
             * 1. UPDATE PUBLISHED JOURNAL DETAIL
             * ----------------------------------------
             */
            queryClient.setQueryData(
                journalKeys.detail(
                    publishedJournal.id,
                ),
                publishedJournal,
            );

            /*
             * ----------------------------------------
             * 2. REFRESH PUBLISHED JOURNAL LISTS
             * ----------------------------------------
             */
            queryClient.invalidateQueries({
                queryKey:
                    journalKeys.lists(),
                refetchType:
                    "all",
            });

            /*
             * ----------------------------------------
             * 3. REFRESH JOURNAL STATISTICS
             * ----------------------------------------
             */
            queryClient.invalidateQueries({
                queryKey:
                    journalKeys.statistics(),
                refetchType:
                    "all",
            });

            /*
             * ----------------------------------------
             * 4. REMOVE OLD DRAFT DETAIL
             * ----------------------------------------
             */
            queryClient.removeQueries({
                queryKey:
                    draftKeys.detail(
                        draftId,
                    ),
            });

            /*
             * ----------------------------------------
             * 5. REFRESH ALL DRAFT QUERIES
             * ----------------------------------------
             *
             * Publishing removes this journal from
             * the draft domain entirely.
             *
             * This refreshes:
             * - All Drafts
             * - Drafts Overview
             * - Recent Activity
             * - Continue Writing
             * - other draft queries
             */
            queryClient.invalidateQueries({
                queryKey:
                    draftKeys.all,
                refetchType:
                    "all",
            });
        },
    });
}