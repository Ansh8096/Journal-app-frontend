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

    request:
        CreateDraftRequest;

    images?:
        File[];
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

            queryClient.setQueryData(
                draftKeys.detail(
                    createdDraft.id,
                ),
                createdDraft,
            );

            queryClient.invalidateQueries({
                queryKey: draftKeys.lists(),
                refetchType: "active",
            });
        },
    });
}
