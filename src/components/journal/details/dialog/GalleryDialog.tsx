import * as React from "react";
import { Check, ImageIcon } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

import type { JournalResponse } from "@/types/api/journal";

interface GalleryDialogProps {
    open: boolean;

    journal: JournalResponse;

    onOpenChange: (
        open: boolean,
    ) => void;

    onImageClick?: (
        imageIndex: number,
    ) => void;
}

function GalleryDialog({
    open,
    journal,
    onOpenChange,
    onImageClick,
}: GalleryDialogProps) {
    const hasImages = journal.images.length > 0;

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-5xl">
                <DialogHeader>
                    <DialogTitle>
                        Gallery ({journal.images.length})
                    </DialogTitle>

                    {/*
                        Radix expects a description for accessibility —
                        visually hidden since the grid below is
                        self-explanatory, but this gives screen readers
                        something to announce.
                    */}
                    <DialogDescription className="sr-only">
                        Browse all images attached to {journal.title}.
                        Select an image to view it in full size.
                    </DialogDescription>
                </DialogHeader>

                {hasImages ? (
                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-4
                            sm:grid-cols-3
                            md:grid-cols-4
                            lg:grid-cols-5
                        "
                    >
                        {journal.images.map(
                            (image, index) => {
                                const isCover =
                                    image.imageUrl ===
                                    journal.coverImageUrl;

                                return (
                                    <button
                                        key={image.publicId}
                                        type="button"
                                        aria-label={`View image ${index + 1} of ${journal.images.length}`}
                                        onClick={() =>
                                            onImageClick?.(
                                                index,
                                            )
                                        }
                                        className={cn(
                                            `
                                            group
                                            relative
                                            aspect-square
                                            overflow-hidden
                                            rounded-xl
                                            border-2
                                            bg-muted
                                            transition-all
                                            hover:shadow-md
                                            focus-visible:outline-none
                                            focus-visible:ring-2
                                            focus-visible:ring-violet-500
                                            focus-visible:ring-offset-2
                                            `,
                                            isCover
                                                ? "border-violet-500"
                                                : "border-transparent",
                                        )}
                                    >
                                        <img
                                            src={
                                                image.imageUrl
                                            }
                                            alt={`Journal image ${
                                                index + 1
                                            }`}
                                            loading="lazy"
                                            draggable={
                                                false
                                            }
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                                transition-transform
                                                duration-300
                                                group-hover:scale-105
                                            "
                                        />

                                        <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />

                                        {isCover && (
                                            <span
                                                className="
                                                    absolute
                                                    left-2
                                                    top-2
                                                    flex
                                                    h-7
                                                    w-7
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-white
                                                    text-violet-600
                                                    shadow
                                                "
                                            >
                                                <Check className="h-4 w-4" />
                                            </span>
                                        )}
                                    </button>
                                );
                            },
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-4 rounded-full bg-muted p-4">
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>

                        <p className="text-sm text-muted-foreground">
                            No images to show.
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(GalleryDialog);