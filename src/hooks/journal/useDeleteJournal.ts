import { useMutation, useQueryClient } from "@tanstack/react-query";

import journalService from "@/services/journal.service";
import { journalKeys } from "@/lib/react-query/query-keys";

interface DeleteJournalVariables {
    journalId: string;
}

export function useDeleteJournal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ journalId }: DeleteJournalVariables) =>
            journalService.deleteJournal(journalId),

        onSuccess: (_, { journalId }) => {
            queryClient.invalidateQueries({
                queryKey: journalKeys.lists(),
            });


            queryClient.invalidateQueries({
                queryKey: journalKeys.statistics(),
            });

            // Now React Query simply forgets this cached journal.
            queryClient.removeQueries({
                queryKey: journalKeys.detail(journalId),
                exact: true,
            });
        },
    });
}