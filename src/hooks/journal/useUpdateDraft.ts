import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import journalService
    from "@/services/journal.service";

import {
    draftKeys,
} from "@/lib/react-query/query-keys";

import type {
    JournalResponse,
    UpdateDraftRequest,
} from "@/types/api/journal";


export interface UpdateDraftMutationVariables {

    draftId:
        string;

    request:
        UpdateDraftRequest;

    images?:
        File[];
}


export function useUpdateDraft() {

    const queryClient =
        useQueryClient();


    return useMutation<
        JournalResponse,
        Error,
        UpdateDraftMutationVariables
    >({

        /* ------------------------------------------------------------------ */
        /*                              MUTATION                              */
        /* ------------------------------------------------------------------ */

        mutationFn: ({
            draftId,
            request,
            images,
        }) =>
            journalService.updateDraft(
                draftId,
                request,
                images,
            ),


        /* ------------------------------------------------------------------ */
        /*                         CACHE SYNCHRONIZATION                      */
        /* ------------------------------------------------------------------ */

        onSuccess: (
            updatedDraft,
        ) => {

            /**
             * --------------------------------------------------------------
             * DRAFT DETAIL CACHE
             * --------------------------------------------------------------
             *
             * The PATCH response already contains the complete
             * updated JournalResponse.
             *
             * Don't immediately GET the same draft again.
             */
            queryClient.setQueryData(
                draftKeys.detail(
                    updatedDraft.id,
                ),
                updatedDraft,
            );


            /**
             * --------------------------------------------------------------
             * DRAFT LIST CACHE
             * --------------------------------------------------------------
             *
             * There may eventually be different draft list
             * combinations:
             *
             * - pagination
             * - search
             * - tags
             * - date filters
             *
             * Invalidate the family instead of manually
             * modifying every possible list.
             *
             * Only active lists refetch immediately.
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