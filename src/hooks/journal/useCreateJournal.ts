import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";

import { journalKeys } from "@/lib/react-query/query-keys";

import type {
    CreateJournalRequest,
    JournalResponse,
} from "@/types/api/journal";

interface CreateJournalMutationVariables {
    request: CreateJournalRequest;
    images?: File[];
}

export function useCreateJournal() {
    const queryClient =
        useQueryClient();

    return useMutation<
        JournalResponse,
        Error,
        CreateJournalMutationVariables
    >({
        mutationFn: ({
            request,
            images,
        }) =>
            journalService.createJournal(
                request,
                images,
            ),

        onSuccess: (
            createdJournal,
        ) => {
            /**
             * Store the newly created journal
             * in the detail cache.
             */
            queryClient.setQueryData(
                journalKeys.detail(
                    createdJournal.id,
                ),
                createdJournal,
            );

            /**
             * The list cache contains different
             * search/filter combinations.
             *
             * Instead of manually modifying every
             * possible list result, mark journal
             * lists as stale.
             *
             * They will refetch when they are used.
             */
            queryClient.invalidateQueries({
                queryKey:
                    journalKeys.lists(),
            });
        },
    });
}