import {
    useRef,
    useState,
    type ChangeEvent,
    type DragEvent,
} from "react";

import { toast } from "sonner";

import type {
    SelectedImage,
} from "@/types/journal/image";

import type {
    JournalImageResponse,
} from "@/types/api/journal";

import ImageCounter from "./ImageCounter";

import ImageDropzone from "./ImageDropzone";

import ImagePreviewGrid from "./ImagePreviewGrid";

import {
    validateImages,
} from "@/lib/validation/ImageValidation";

import {
    JOURNAL_CONFIG,
} from "../../common/journal-common.config";

import {
    journalConstants,
} from "@/constants/journal/journal-constants";


/* -------------------------------------------------------------------------- */
/*                                TYPES                                       */
/* -------------------------------------------------------------------------- */

type ImageUploadMode =
    | "create"
    | "edit";


type ReplacementTarget =
    | {
        type: "new";
        id: string;
    }
    | {
        type: "existing";
        publicId: string;
    }
    | null;


interface ImageUploadSectionProps {

    /**
     * Determines which image rules apply.
     *
     * CREATE:
     * - Maximum 5 new images.
     *
     * EDIT:
     * - Maximum 5 new images in this update.
     * - Maximum 20 images in the journal overall.
     */
    mode?: ImageUploadMode;


    /**
     * Newly selected local images.
     *
     * These are the only images that will
     * eventually become File[] in the
     * multipart request.
     */
    images: SelectedImage[];


    /**
     * Updates locally selected images.
     */
    onImagesChange: (
        images: SelectedImage[],
    ) => void;


    /**
     * Existing server-side images.
     *
     * Used by Edit Journal only.
     *
     * These do NOT count toward the
     * 5-new-image upload limit.
     */
    existingImages?: JournalImageResponse[];


    /**
     * Remove an existing server-side image
     * from the local edit state.
     *
     * The API request is NOT made here.
     */
    onRemoveExistingImage?: (
        publicId: string,
    ) => void;


    /**
     * Replace an existing server-side image
     * with a newly selected local image.
     *
     * The API request is NOT made here.
     */
    onReplaceExistingImage?: (
        publicId: string,
        replacement: SelectedImage,
    ) => void;


    /**
     * Disable all image interactions.
     */
    disabled?: boolean;
}

export default function ImageUploadSection({
    mode = "create",

    images,

    onImagesChange,

    existingImages = [],

    onRemoveExistingImage,

    onReplaceExistingImage,

    disabled = false,
}: ImageUploadSectionProps) {


    /* ---------------------------------------------------------------------- */
    /*                            LOCAL UI STATE                              */
    /* ---------------------------------------------------------------------- */

    const [
        isDragging,
        setIsDragging,
    ] = useState(false);

    
    /**
     * Image currently being replaced.
     *
     * Can be either:
     *
     * - a new local image
     * - an existing server image
     */
    const [
        replacementTarget,
        setReplacementTarget,
    ] = useState<ReplacementTarget>(
        null,
    );


    /**
     * Native file input.
     */
    const fileInputRef =
        useRef<HTMLInputElement>(
            null,
        );


    /* ---------------------------------------------------------------------- */
    /*                              LIMITS                                    */
    /* ---------------------------------------------------------------------- */

    const {
        maxImagesPerUpload,
        maxImagesPerJournal,
    } =
        journalConstants.images
            .constraints;


    /**
     * Number of newly selected images.
     *
     * Existing server images are deliberately
     * NOT included here.
     */
    const newImageCount =
        images.length;


    /**
     * Number of images currently present
     * in the journal.
     *
     * Edit:
     *     existing + new
     *
     * Create:
     *     new
     */
    const totalImageCount =
        existingImages.length +
        newImageCount;


    /**
     * Maximum total images represented
     * by the current mode.
     */
    const maxTotalImages =
        mode === "edit"
            ? maxImagesPerJournal
            : maxImagesPerUpload;


    /**
     * How many NEW images can still be
     * included in the current request.
     *
     * Existing images do not affect this.
     *
     * Example:
     *
     * newImageCount = 3
     * maxImagesPerUpload = 5
     *
     * remaining = 2
     */
    const remainingNewUploadSlots =
        Math.max(
            0,
            maxImagesPerUpload -
                newImageCount,
        );


    /**
     * How many total journal image slots
     * are still available.
     *
     * Only Edit needs this restriction.
     */
    const remainingJournalSlots =
        mode === "edit"
            ? Math.max(
                0,
                maxImagesPerJournal -
                    totalImageCount,
            )
            : remainingNewUploadSlots;


    /**
     * Final number of new files that can
     * be added right now.
     *
     * Edit must satisfy BOTH:
     *
     * 1. max 5 new files
     * 2. max 20 total journal images
     */
    const remainingAddSlots =
        Math.min(
            remainingNewUploadSlots,
            remainingJournalSlots,
        );


    /**
     * Can an existing server image be
     * replaced?
     *
     * Replacing an existing image consumes
     * one NEW upload slot but does not
     * increase the total image count.
     */
    const canReplaceExisting =
        mode === "edit" &&
        remainingNewUploadSlots > 0;


    /**
     * A new local image can always be
     * replaced by another single local
     * image because replacement does not
     * increase the number of new images.
     */
    const canReplaceNew =
        newImageCount > 0;


    /**
     * Whether the "Add More" UI should
     * remain visible.
     */
    const canAddMore =
        remainingAddSlots > 0;


    /* ---------------------------------------------------------------------- */
    /*                          FILE PICKER                                   */
    /* ---------------------------------------------------------------------- */

    const openFilePicker = () => {

        if (disabled) {
            return;
        }


        if (
            !fileInputRef.current
        ) {
            return;
        }


        /**
         * Reset the input so the same file
         * can be selected again later.
         */
        fileInputRef.current.value = "";


        fileInputRef.current.click();
    };


    /* ---------------------------------------------------------------------- */
    /*                         VALIDATION ERRORS                               */
    /* ---------------------------------------------------------------------- */

    const showValidationErrors = (
        errors: string[],
    ) => {

        errors.forEach(
            (error) => {

                toast.error(
                    "Unable to add image",
                    {
                        description:
                            error,
                    },
                );

            },
        );
    };


    /* ---------------------------------------------------------------------- */
    /*                       FILE → SELECTED IMAGE                            */
    /* ---------------------------------------------------------------------- */

    const createSelectedImage = (
        file: File,
    ): SelectedImage => {

        return {
            id:
                crypto.randomUUID(),

            file,

            previewUrl:
                URL.createObjectURL(
                    file,
                ),
        };
    };


    /* ---------------------------------------------------------------------- */
    /*                         PROCESS FILES                                  */
    /* ---------------------------------------------------------------------- */

    const processSelectedFiles = (
        files: File[],
    ) => {

        if (disabled) {
            return;
        }


        if (!files.length) {
            setReplacementTarget(
                null,
            );

            return;
        }


        /* ------------------------------------------------------------------ */
        /*                         REPLACEMENT                                 */
        /* ------------------------------------------------------------------ */

        if (
            replacementTarget !== null
        ) {

            const replacementFile =
                files[0];


            /**
             * --------------------------------------------------------------
             * REPLACE EXISTING SERVER IMAGE
             * --------------------------------------------------------------
             */

            if (
                replacementTarget.type ===
                "existing"
            ) {

                if (
                    !canReplaceExisting
                ) {

                    toast.error(
                        "Unable to replace image",
                        {
                            description:
                                `You can upload at most ${maxImagesPerUpload} new images in one update.`,
                        },
                    );


                    setReplacementTarget(
                        null,
                    );


                    return;
                }


                /**
                 * IMPORTANT:
                 *
                 * Existing server images do NOT
                 * count toward the new-image limit.
                 *
                 * Therefore validation uses only
                 * newImageCount.
                 */
                const validation =
                    validateImages(
                        [replacementFile],
                        newImageCount,
                    );


                if (
                    validation.errors.length > 0
                ) {

                    showValidationErrors(
                        validation.errors,
                    );
                }


                if (
                    validation.validImages.length ===
                    0
                ) {

                    setReplacementTarget(
                        null,
                    );

                    return;
                }


                const replacement =
                    createSelectedImage(
                        validation.validImages[0],
                    );


                onReplaceExistingImage?.(
                    replacementTarget.publicId,
                    replacement,
                );


                setReplacementTarget(
                    null,
                );


                return;
            }


            /**
             * --------------------------------------------------------------
             * REPLACE NEW LOCAL IMAGE
             * --------------------------------------------------------------
             */

            if (
                replacementTarget.type ===
                "new"
            ) {

                const validation =
                    validateImages(
                        [replacementFile],
                        Math.max(
                            0,
                            newImageCount - 1,
                        ),
                    );


                if (
                    validation.errors.length > 0
                ) {

                    showValidationErrors(
                        validation.errors,
                    );
                }


                if (
                    validation.validImages.length ===
                    0
                ) {

                    setReplacementTarget(
                        null,
                    );

                    return;
                }


                const replacement =
                    createSelectedImage(
                        validation.validImages[0],
                    );


                onImagesChange(
                    images.map(
                        (image) => {

                            if (
                                image.id !==
                                replacementTarget.id
                            ) {
                                return image;
                            }


                            /**
                             * Release the old
                             * local preview.
                             */
                            URL.revokeObjectURL(
                                image.previewUrl,
                            );


                            return replacement;
                        },
                    ),
                );


                setReplacementTarget(
                    null,
                );


                return;
            }
        }


        /* ------------------------------------------------------------------ */
        /*                             NORMAL ADD                              */
        /* ------------------------------------------------------------------ */

        if (
            remainingAddSlots <= 0
        ) {

            toast.error(
                "Image limit reached",
                {
                    description:
                        mode === "edit"
                            ? `You can add at most ${maxImagesPerUpload} new images per update and ${maxImagesPerJournal} images in total.`
                            : `You can add at most ${maxImagesPerUpload} images.`,
                },
            );


            return;
        }


        /**
         * We only process as many files as
         * there are currently available slots.
         */
        const filesToProcess =
            files.slice(
                0,
                remainingAddSlots,
            );


        /**
         * Tell the user if their selection
         * exceeded the currently available
         * slots.
         */
        if (
            files.length >
            remainingAddSlots
        ) {

            toast.error(
                "Some images could not be added",
                {
                    description:
                        `Only ${remainingAddSlots} more image${
                            remainingAddSlots === 1
                                ? ""
                                : "s"
                        } can be added.`,
                },
            );
        }


        /**
         * IMPORTANT:
         *
         * `newImageCount` is intentionally
         * passed here.
         *
         * Existing server images do NOT
         * count toward the 5-new-image limit.
         */
        const validation =
            validateImages(
                filesToProcess,
                newImageCount,
            );


        if (
            validation.errors.length > 0
        ) {

            showValidationErrors(
                validation.errors,
            );
        }


        if (
            validation.validImages.length ===
            0
        ) {
            return;
        }


        const selectedImages =
            validation.validImages.map(
                createSelectedImage,
            );


        onImagesChange([
            ...images,
            ...selectedImages,
        ]);
    };


    /* ---------------------------------------------------------------------- */
    /*                        FILE INPUT CHANGE                               */
    /* ---------------------------------------------------------------------- */

    const handleFilesSelected = (
        event:
            ChangeEvent<
                HTMLInputElement
            >,
    ) => {

        const files =
            Array.from(
                event.target.files ?? [],
            );


        /**
         * Reset the input so selecting the
         * same file again triggers change.
         */
        event.target.value = "";


        processSelectedFiles(
            files,
        );
    };


    /* ---------------------------------------------------------------------- */
    /*                            DRAG ENTER                                  */
    /* ---------------------------------------------------------------------- */

    const handleDragEnter = (
        event:
            DragEvent<HTMLDivElement>,
    ) => {

        if (disabled) {
            return;
        }


        event.preventDefault();

        event.stopPropagation();


        setIsDragging(
            true,
        );
    };


    /* ---------------------------------------------------------------------- */
    /*                             DRAG OVER                                  */
    /* ---------------------------------------------------------------------- */

    const handleDragOver = (
        event:
            DragEvent<HTMLDivElement>,
    ) => {

        if (disabled) {
            return;
        }


        event.preventDefault();

        event.stopPropagation();
    };


    /* ---------------------------------------------------------------------- */
    /*                            DRAG LEAVE                                  */
    /* ---------------------------------------------------------------------- */

    const handleDragLeave = (
        event:
            DragEvent<HTMLDivElement>,
    ) => {

        if (disabled) {
            return;
        }


        event.preventDefault();

        event.stopPropagation();


        if (
            event.currentTarget.contains(
                event.relatedTarget as
                    Node | null,
            )
        ) {
            return;
        }


        setIsDragging(
            false,
        );
    };


    /* ---------------------------------------------------------------------- */
    /*                              DROP                                      */
    /* ---------------------------------------------------------------------- */

    const handleDrop = (
        event:
            DragEvent<HTMLDivElement>,
    ) => {

        if (disabled) {
            return;
        }


        event.preventDefault();

        event.stopPropagation();


        setIsDragging(
            false,
        );


        processSelectedFiles(
            Array.from(
                event.dataTransfer.files,
            ),
        );
    };


    /* ---------------------------------------------------------------------- */
    /*                         REMOVE NEW IMAGE                               */
    /* ---------------------------------------------------------------------- */

    const handleRemoveImage = (
        id: string,
    ) => {

        if (disabled) {
            return;
        }


        const imageToRemove =
            images.find(
                (image) =>
                    image.id === id,
            );


        if (!imageToRemove) {
            return;
        }


        /**
         * Release local object URL.
         */
        URL.revokeObjectURL(
            imageToRemove.previewUrl,
        );


        onImagesChange(
            images.filter(
                (image) =>
                    image.id !== id,
            ),
        );
    };


    /* ---------------------------------------------------------------------- */
    /*                         REPLACE NEW IMAGE                              */
    /* ---------------------------------------------------------------------- */

    const handleReplaceImage = (
        imageId: string,
    ) => {

        if (disabled) {
            return;
        }


        if (!canReplaceNew) {
            return;
        }


        const imageExists =
            images.some(
                (image) =>
                    image.id === imageId,
            );


        if (!imageExists) {
            return;
        }


        setReplacementTarget({
            type: "new",
            id: imageId,
        });


        openFilePicker();
    };


    /* ---------------------------------------------------------------------- */
    /*                      REMOVE EXISTING IMAGE                             */
    /* ---------------------------------------------------------------------- */

    const handleRemoveExistingImage = (
        publicId: string,
    ) => {

        if (disabled) {
            return;
        }


        onRemoveExistingImage?.(
            publicId,
        );
    };


    /* ---------------------------------------------------------------------- */
    /*                     REPLACE EXISTING IMAGE                             */
    /* ---------------------------------------------------------------------- */

    const handleReplaceExistingImage = (
        publicId: string,
    ) => {

        if (disabled) {
            return;
        }


        if (
            mode !== "edit"
        ) {
            return;
        }


        if (
            !canReplaceExisting
        ) {

            toast.error(
                "Unable to replace image",
                {
                    description:
                        `You can upload at most ${maxImagesPerUpload} new images in one update.`,
                },
            );


            return;
        }


        const imageExists =
            existingImages.some(
                (image) =>
                    image.publicId ===
                    publicId,
            );


        if (!imageExists) {
            return;
        }


        setReplacementTarget({
            type: "existing",
            publicId,
        });


        openFilePicker();
    };


    /* ---------------------------------------------------------------------- */
    /*                              RENDER                                    */
    /* ---------------------------------------------------------------------- */

    return (
        <section
            aria-labelledby="journal-images-heading"
            className="
                rounded-2xl
                border
                bg-card
                p-4
                shadow-sm
                sm:p-5
            "
        >

            {/* ----------------------------------------------------------------
                HEADER
            ----------------------------------------------------------------- */}

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-4
                "
            >

                <div className="min-w-0">

                    <h2
                        id="journal-images-heading"
                        className="
                            text-sm
                            font-semibold
                            text-foreground
                        "
                    >
                        {
                            JOURNAL_CONFIG.form
                                .images.title
                        }
                    </h2>


                    <p
                        className="
                            mt-1
                            max-w-xl
                            text-xs
                            leading-5
                            text-muted-foreground
                        "
                    >
                        {
                            JOURNAL_CONFIG.form
                                .images.description
                        }
                    </p>

                </div>


                <ImageCounter
                    count={
                        totalImageCount
                    }

                    maxCount={
                        maxTotalImages
                    }
                />

            </div>


            {/* ----------------------------------------------------------------
                IMAGE CONTENT
            ----------------------------------------------------------------- */}

            <div className="mt-4">

                {totalImageCount === 0 ? (

                    <ImageDropzone
                        disabled={
                            disabled
                        }

                        isDragging={
                            isDragging
                        }

                        onChooseFiles={
                            openFilePicker
                        }

                        onDragEnter={
                            handleDragEnter
                        }

                        onDragOver={
                            handleDragOver
                        }

                        onDragLeave={
                            handleDragLeave
                        }

                        onDrop={
                            handleDrop
                        }
                    />

                ) : (

                    <ImagePreviewGrid
                        images={
                            images
                        }

                        existingImages={
                            existingImages
                        }

                        disabled={
                            disabled
                        }

                        onRemove={
                            handleRemoveImage
                        }

                        onReplace={
                            handleReplaceImage
                        }

                        onRemoveExisting={
                            handleRemoveExistingImage
                        }

                        onReplaceExisting={
                            handleReplaceExistingImage
                        }

                        canAddMore={
                            canAddMore
                        }

                        onAddMore={
                            openFilePicker
                        }
                    />

                )}

            </div>


            {/* ----------------------------------------------------------------
                NATIVE FILE INPUT
            ----------------------------------------------------------------- */}

            <input
                ref={
                    fileInputRef
                }

                type="file"

                hidden

                tabIndex={-1}

                multiple

                disabled={
                    disabled
                }

                accept={
                    journalConstants.images
                        .input
                        .acceptedFileTypes
                }

                onChange={
                    handleFilesSelected
                }
            />

        </section>
    );
}