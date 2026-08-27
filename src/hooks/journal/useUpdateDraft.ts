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
    draftId: string;

    request:
        UpdateDraftRequest;

    images?: File[];
}

export function useUpdateDraft() {
    const queryClient =
        useQueryClient();

    return useMutation<
        JournalResponse,
        Error,
        UpdateDraftMutationVariables
    >({
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

        onSuccess: (
            updatedDraft,
        ) => {
            /*
             * Update the currently edited
             * draft immediately.
             */
            queryClient.setQueryData(
                draftKeys.detail(
                    updatedDraft.id,
                ),
                updatedDraft,
            );

            /*
             * A draft update can affect:
             * - Drafts Overview
             * - All Drafts
             * - Recent Activity
             * - Continue Writing
             * - Draft detail queries
             *
             * Therefore invalidate the
             * complete draft query family.
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