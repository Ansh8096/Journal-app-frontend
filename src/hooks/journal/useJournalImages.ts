import { useMutation, useQueryClient } from "@tanstack/react-query";

import journalService from "@/services/journal.service";
import { journalKeys } from "@/lib/react-query/query-keys";

interface UploadJournalImagesVariables {
    journalId: string;
    images: File[];
}

interface ReplaceJournalImageVariables {
    journalId: string;
    imageId: string;
    image: File;
}

interface DeleteJournalImageVariables {
    journalId: string;
    imageId: string;
}

interface SetCoverImageVariables {
    journalId: string;
    imageId: string;
}

export function useJournalImages() {
    const queryClient = useQueryClient();

    const uploadImages = useMutation({
        mutationFn: ({ journalId, images }: UploadJournalImagesVariables) =>
            journalService.uploadJournalImages(journalId, images),

        onSuccess: (_, { journalId }) => {
            queryClient.invalidateQueries({
                queryKey: journalKeys.detail(journalId),
            });

            queryClient.invalidateQueries({
                queryKey: journalKeys.lists(),
            });
        },
    });

    const replaceImage = useMutation({
        mutationFn: ({
            journalId,
            imageId,
            image,
        }: ReplaceJournalImageVariables) =>
            journalService.replaceJournalImage(journalId, imageId, image),

        onSuccess: (_, { journalId }) => {
            queryClient.invalidateQueries({
                queryKey: journalKeys.detail(journalId),
            });

            queryClient.invalidateQueries({
                queryKey: journalKeys.lists(),
            });
        },
    });

    const deleteImage = useMutation({
        mutationFn: ({ journalId, imageId }: DeleteJournalImageVariables) =>
            journalService.deleteJournalImage(journalId, imageId),

        onSuccess: (_, { journalId }) => {
            queryClient.invalidateQueries({
                queryKey: journalKeys.detail(journalId),
            });

            queryClient.invalidateQueries({
                queryKey: journalKeys.lists(),
            });
        },
    });

    const setCoverImage = useMutation({
        mutationFn: ({ journalId, imageId }: SetCoverImageVariables) =>
            journalService.setCoverImage(journalId, imageId),

        onSuccess: (_, { journalId }) => {
            queryClient.invalidateQueries({
                queryKey: journalKeys.detail(journalId),
            });

            queryClient.invalidateQueries({
                queryKey: journalKeys.lists(),
            });
        },
    });

    return {
        uploadImages,
        replaceImage,
        deleteImage,
        setCoverImage,
    };
}