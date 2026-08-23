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
    draftId:
        string;
}


export function usePublishDraft() {

    const queryClient =
        useQueryClient();


    return useMutation<
        JournalResponse,
        Error,
        PublishDraftMutationVariables
    >({

        /* ------------------------------------------------------------------ */
        /*                              MUTATION                              */
        /* ------------------------------------------------------------------ */

        mutationFn: ({
            draftId,
        }) =>
            journalService.publishDraft(
                draftId,
            ),


        /* ------------------------------------------------------------------ */
        /*                         CACHE SYNCHRONIZATION                      */
        /* ------------------------------------------------------------------ */

        onSuccess: (
            publishedJournal,
            {
                draftId,
            },
        ) => {

            /**
             * --------------------------------------------------------------
             * 1. STORE PUBLISHED DETAIL
             * --------------------------------------------------------------
             *
             * The publish endpoint returns the newly published
             * JournalResponse.
             *
             * Put it directly into the published journal detail
             * cache so Journal Details can render it immediately.
             */
            queryClient.setQueryData(
                journalKeys.detail(
                    publishedJournal.id,
                ),
                publishedJournal,
            );


            /**
             * --------------------------------------------------------------
             * 2. INVALIDATE PUBLISHED JOURNAL LISTS
             * --------------------------------------------------------------
             *
             * The published journal has now entered the published
             * journal collection.
             */
            queryClient.invalidateQueries({
                queryKey:
                    journalKeys.lists(),

                refetchType:
                    "active",
            });


            /**
             * --------------------------------------------------------------
             * 3. INVALIDATE STATISTICS
             * --------------------------------------------------------------
             *
             * If dashboard statistics contain published-journal
             * counts, publishing a draft changes those statistics.
             */
            queryClient.invalidateQueries({
                queryKey:
                    journalKeys.statistics(),

                refetchType:
                    "active",
            });


            /**
             * --------------------------------------------------------------
             * 4. REMOVE OLD DRAFT DETAIL CACHE
             * --------------------------------------------------------------
             *
             * This resource is no longer a draft.
             *
             * Don't leave:
             *
             * ["drafts", "detail", draftId]
             *
             * sitting around as if the draft still exists.
             */
            queryClient.removeQueries({
                queryKey:
                    draftKeys.detail(
                        draftId,
                    ),
            });


            /**
             * --------------------------------------------------------------
             * 5. INVALIDATE DRAFT LISTS
             * --------------------------------------------------------------
             *
             * The published draft must disappear from any draft list.
             */
            queryClient.invalidateQueries({
                queryKey:
                    draftKeys.lists(),

                refetchType:
                    "active",
            });
        },
    });
}