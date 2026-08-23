import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import journalService from "@/services/journal.service";

import {
    draftKeys,
} from "@/lib/react-query/query-keys";

interface DeleteDraftVariables {
    journalId: string;
}

export function useDeleteDraft() {
    const queryClient =
        useQueryClient();

    return useMutation<
        unknown,
        Error,
        DeleteDraftVariables
    >({
        mutationFn: ({
            journalId,
        }) =>
            journalService.deleteDraft(
                journalId,
            ),

        onSuccess: (
            _,
            { journalId },
        ) => {
            /*
             * The deleted draft must no longer
             * exist in its detail cache.
             */
            queryClient.removeQueries({
                queryKey:
                    draftKeys.detail(
                        journalId,
                    ),
            });

            /*
             * Invalidate ALL draft queries.
             *
             * This includes:
             * - All Drafts list queries
             * - filtered/sorted list queries
             * - Continue Writing carousel query
             * - any other draft queries
             */
            queryClient.invalidateQueries({
                queryKey: draftKeys.all,
            });

            toast.success(
                "Draft deleted",
                {
                    description:
                        "The draft was deleted successfully.",
                },
            );
        },

        onError: (
            error,
        ) => {
            toast.error(
                "Unable to delete draft",
                {
                    description:
                        error.message ||
                        "Something went wrong while deleting the draft.",
                },
            );
        },
    });
}