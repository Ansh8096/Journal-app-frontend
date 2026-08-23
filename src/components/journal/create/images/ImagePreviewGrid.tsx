import type { SelectedImage } from "@/types/journal/image";

import ImagePreviewCard from "./ImagePreviewCard";
import AddMoreImageCard from "../gallery/AddMoreImageCard";

import type { JournalImageResponse } from "@/types/api/journal";
import ExistingImagePreviewCard from "./ExistingImagePreviewCard";

interface ImagePreviewGridProps {

    /**
     * Newly selected local images.
     */
    images:
        SelectedImage[];


    /**
     * Existing server-side images.
     */
    existingImages?:
        JournalImageResponse[];


    /**
     * New image handlers.
     */
    onRemove:
        (id: string) => void;

    onReplace:
        (id: string) => void;


    /**
     * Existing image handlers.
     */
    onRemoveExisting?:
        (publicId: string) => void;

    onReplaceExisting?:
        (publicId: string) => void;


    /**
     * Whether the Add More card should
     * be displayed.
     */
    canAddMore:
        boolean;

    onAddMore:
        () => void;

    disabled?: boolean;
}

export default function ImagePreviewGrid({
    images,

    existingImages = [],

    onRemove,
    onReplace,

    onRemoveExisting,
    onReplaceExisting,

    canAddMore,

    onAddMore,

    disabled = false,
}: ImagePreviewGridProps) {
    return (
        <div
            role="list"
            aria-label="Selected journal images"
            className="
                grid
                grid-cols-2
                gap-3

                sm:gap-4
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
            "
        >

            {/* --------------------------------
                EXISTING SERVER IMAGES
            --------------------------------- */}

            {existingImages.map(
                (image) => (

                    <ExistingImagePreviewCard
                        key={
                            image.publicId
                        }

                        image={
                            image
                        }

                        disabled={
                            disabled
                        }

                        onRemove={
                            onRemoveExisting ??
                            (() => {})
                        }

                        onReplace={
                            onReplaceExisting ??
                            (() => {})
                        }
                    />

                ),
            )}

            {images.map(
                (image) => (
                    <div
                        key={image.id}
                        role="listitem"
                        className="min-w-0"
                    >
                        <ImagePreviewCard
                            image={image}
                            disabled={disabled}
                            onRemove={onRemove}
                            onReplace={onReplace}
                        />
                    </div>
                ),
            )}

            {canAddMore && (
                <div
                    role="listitem"
                    className="min-w-0"
                >
                    <AddMoreImageCard
                        disabled={disabled}
                        onClick={onAddMore}
                    />
                </div>
            )}
        </div>
    );
}