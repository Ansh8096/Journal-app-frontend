import { Pencil, Trash2 } from "lucide-react";

import type { SelectedImage } from "@/types/journal/image";

import { Button } from "@/components/ui/button";

interface ImagePreviewCardProps {
    image: SelectedImage;

    onRemove: (id: string) => void;

    onReplace: (id: string) => void;

    disabled?: boolean;
}

export default function ImagePreviewCard({
    image,
    onRemove,
    onReplace,
    disabled = false,
}: ImagePreviewCardProps) {
    const fileSize = (
        image.file.size /
        (1024 * 1024)
    ).toFixed(2);

    return (
        <article
            aria-label={`Selected image: ${image.file.name}`}
            className="
                min-w-0
                space-y-3
            "
        >
            <div
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    bg-muted
                    shadow-sm
                    transition-all
                    duration-200
                    hover:shadow-md
                "
            >
                <img
                    src={image.previewUrl}
                    alt={`Preview of ${image.file.name}`}
                    draggable={false}
                    className="
                        aspect-square
                        w-full
                        object-cover
                    "
                />

                <div
                    className="
                        absolute
                        inset-0
                        flex
                        items-start
                        justify-end
                        gap-2
                        bg-black/0
                        p-2
                        transition-all
                        duration-200

                        sm:p-3

                        group-hover:bg-black/20
                        group-focus-within:bg-black/20
                    "
                >
                    <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        disabled={disabled}
                        aria-label={`Replace ${image.file.name}`}
                        title="Replace image"
                        className="
                            min-h-10
                            min-w-10
                            opacity-0
                            scale-95
                            shadow-sm
                            transition-all
                            duration-200

                            group-hover:scale-100
                            group-hover:opacity-100

                            group-focus-within:scale-100
                            group-focus-within:opacity-100

                            focus-visible:scale-100
                            focus-visible:opacity-100
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-ring
                            disabled:pointer-events-none
                            focus-visible:ring-offset-2

                            disabled:opacity-50
                        "
                        onClick={() =>
                            onReplace(image.id)
                        }
                    >
                        <Pencil
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                    </Button>

                    <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        disabled={disabled}
                        aria-label={`Remove ${image.file.name}`}
                        title="Remove image"
                        className="
                            min-h-10
                            min-w-10
                            opacity-0
                            scale-95
                            shadow-sm
                            transition-all
                            duration-200

                            group-hover:scale-100
                            group-hover:opacity-100

                            group-focus-within:scale-100
                            group-focus-within:opacity-100

                            focus-visible:scale-100
                            focus-visible:opacity-100
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-ring
                            focus-visible:ring-offset-2

                            disabled:pointer-events-none
                            disabled:opacity-50
                        "
                        onClick={() =>
                            onRemove(image.id)
                        }
                    >
                        <Trash2
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            </div>

            <div className="min-w-0 space-y-1">
                <p
                    className="
                        truncate
                        text-sm
                        font-medium
                    "
                    title={image.file.name}
                >
                    {image.file.name}
                </p>

                <p
                    className="
                        text-xs
                        text-muted-foreground
                    "
                >
                    {fileSize} MB
                </p>
            </div>
        </article>
    );
}