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
    CreateDraftRequest,
    JournalResponse,
} from "@/types/api/journal";

export interface CreateDraftMutationVariables {
    request: CreateDraftRequest;
    images?: File[];
}

export function useCreateDraft() {
    const queryClient =
        useQueryClient();

    return useMutation<
        JournalResponse,
        Error,
        CreateDraftMutationVariables
    >({
        mutationFn: ({
            request,
            images,
        }) =>
            journalService.createDraft(
                request,
                images,
            ),

        onSuccess: (
            createdDraft,
        ) => {
            /*
             * Update the newly-created
             * draft detail immediately.
             */
            queryClient.setQueryData(
                draftKeys.detail(
                    createdDraft.id,
                ),
                createdDraft,
            );

            /*
             * Refresh EVERY draft-related
             * query:
             *
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