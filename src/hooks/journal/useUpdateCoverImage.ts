import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";

import { journalKeys } from "@/lib/react-query/query-keys";

import type {
    JournalResponse,
    JournalSummary,
    UpdateCoverImageRequest,
} from "@/types/api/journal";

interface UpdateCoverContext {
    previousJournal?: JournalResponse;

    previousLists?: Array<[readonly unknown[], unknown]>;
}

export function useUpdateCoverImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            journalId,
            publicId,
        }: UpdateCoverImageRequest) =>
            journalService.setCoverImage(
                journalId,
                publicId,
            ),

        async onMutate({
            journalId,
            publicId,
        }): Promise<UpdateCoverContext> {

            await queryClient.cancelQueries({
                queryKey: journalKeys.detail(journalId),
            });

            await queryClient.cancelQueries({
                queryKey: journalKeys.lists(),
            });

            const previousJournal =
                queryClient.getQueryData<JournalResponse>(
                    journalKeys.detail(journalId),
                );

            const previousLists =
                queryClient.getQueriesData({
                    queryKey: journalKeys.lists(),
                });

            if (previousJournal) {
                const selectedImage =
                    previousJournal.images.find(
                        (image) =>
                            image.publicId === publicId,
                    );

                if (selectedImage) {
                    queryClient.setQueryData(
                        journalKeys.detail(journalId),
                        {
                            ...previousJournal,
                            coverImageUrl:
                                selectedImage.imageUrl,
                        },
                    );

                    previousLists.forEach(
                        ([queryKey, data]) => {
                            if (!data) {
                                return;
                            }

                            const page =
                                data as {
                                    journals: JournalSummary[];
                                };

                            queryClient.setQueryData(
                                queryKey,
                                {
                                    ...page,
                                    journals:
                                        page.journals.map(
                                            (journal) =>
                                                journal.id ===
                                                    journalId
                                                    ? {
                                                        ...journal,
                                                        coverImageUrl:
                                                            selectedImage.imageUrl,
                                                    }
                                                    : journal,
                                        ),
                                },
                            );
                        },
                    );
                }
            }

            return {
                previousJournal,
                previousLists,
            };
        },

        onError(
            _error,
            variables,
            context,
        ) {
            if (context?.previousJournal) {
                queryClient.setQueryData(
                    journalKeys.detail(
                        variables.journalId,
                    ),
                    context.previousJournal,
                );
            }

            context?.previousLists?.forEach(
                ([queryKey, data]) => {
                    queryClient.setQueryData(
                        queryKey,
                        data,
                    );
                },
            );
        },

        onSuccess(updatedJournal) {
            queryClient.setQueryData(
                journalKeys.detail(
                    updatedJournal.id,
                ),
                updatedJournal,
            );

            queryClient.setQueriesData(
                {
                    queryKey:
                        journalKeys.lists(),
                },
                (
                    old:
                        | {
                            journals: JournalSummary[];
                        }
                        | undefined,
                ) => {
                    if (!old) {
                        return old;
                    }

                    return {
                        ...old,
                        journals:
                            old.journals.map(
                                (journal) =>
                                    journal.id ===
                                        updatedJournal.id
                                        ? {
                                            ...journal,
                                            coverImageUrl:
                                                updatedJournal.coverImageUrl,
                                        }
                                        : journal,
                            ),
                    };
                },
            );
        },
    });
}




// Flow: 
// User selects image

// ↓

// Hero changes immediately ⭐

// ↓

// Request

// ↓

// Backend

// ↓

// Nothing changes

// If the request fails:

// User selects image

// ↓

// Hero changes

// ↓

// Request fails

// ↓

// Old cover restored