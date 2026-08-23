import type { ImageValidationResult } from "@/types/journal/image";

import { journalConstants } from "@/constants/journal/journal-constants";

export function validateImages(
    files: File[],
    currentImageCount: number,
): ImageValidationResult {

    const errors: string[] = [];
    const validImages: File[] = [];

    const {
        maxImagesPerUpload,
        maxFileSize,
        allowedMimeTypes,
    } = journalConstants.images.constraints;

    /**
     * Number of images that can still
     * be added to the journal.
     */
    const remainingSlots =
        Math.max(
            0,
            maxImagesPerUpload - currentImageCount,
        );

    /**
     * If there are no remaining slots,
     * every selected file is invalid.
     */
    if (remainingSlots === 0) {

        errors.push(
            `You can upload a maximum of ${maxImagesPerUpload} images.`,
        );

        return {
            validImages,
            errors,
        };
    }

    for (const file of files) {

        /**
         * Stop accepting files once the
         * journal reaches the maximum count.
         *
         * We still continue collecting the
         * error so the user knows why the
         * remaining files were rejected.
         */
        if (
            validImages.length >=
            remainingSlots
        ) {

            errors.push(
                `You can upload a maximum of ${maxImagesPerUpload} images.`,
            );

            continue;
        }

        /**
         * MIME type validation.
         */
        if (
            !allowedMimeTypes.includes(
                file.type as
                    (typeof allowedMimeTypes)[number],
            )
        ) {

            errors.push(
                `${file.name} is not a supported image format.`,
            );

            continue;
        }

        /**
         * File-size validation.
         */
        if (
            file.size > maxFileSize
        ) {

            errors.push(
                `${file.name} exceeds the 5 MB limit.`,
            );

            continue;
        }

        /**
         * File is valid.
         */
        validImages.push(file);
    }

    return {
        validImages,
        errors,
    };
}