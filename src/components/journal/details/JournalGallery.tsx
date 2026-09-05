import * as React from "react";
import {
    ArrowRight,
    Check,
    ImageIcon,
    ImagePlus,
    Images,
    Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { JournalResponse } from "@/types/api/journal";

interface JournalGalleryProps {
    journal: JournalResponse;

    galleryLoading?: boolean;

    onViewAll?: () => void;

    onAddImages?: () => void;

    onImageClick?: (
        imageIndex: number,
    ) => void;
}

const PREVIEW_COUNT = 4;

function JournalGallery({
    journal,
    galleryLoading = false,
    onViewAll,
    onAddImages,
    onImageClick,
}: JournalGalleryProps) {
    const hasImages = journal.images.length > 0;

    // Show only the first 4 images on the details page
    const previewImages = journal.images.slice(0, PREVIEW_COUNT);

    const remainingCount = journal.images.length - previewImages.length;

    return (
        <section className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Images className="h-4 w-4 text-violet-600 dark:text-violet-400" />

                    <h2 className="text-base font-semibold tracking-tight">
                        Attached Images ({journal.images.length})
                    </h2>
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    aria-label="View all journal images"
                    size="sm"
                    disabled={galleryLoading}
                    onClick={onViewAll}
                    className="gap-1 px-0 text-sm text-foreground hover:text-foreground/70"
                >
                    View All
                    <ArrowRight className="h-3.5 w-3.5" />
                </Button>
            </div>

            <Card className="rounded-2xl border-violet-100 shadow-sm dark:border-violet-900/40">
                <CardContent className="p-4">
                    {galleryLoading ? (
                        // Mirrors the real layout below (same thumbnail
                        // size, same row) so there's no layout shift once
                        // images load in.
                        <div
                            className="flex gap-3 overflow-x-auto pb-1"
                            role="status"
                            aria-label="Loading images"
                        >
                            {Array.from({ length: PREVIEW_COUNT }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-24 w-32 shrink-0 rounded-xl"
                                />
                            ))}
                        </div>
                    ) : hasImages ? (
                        <div className="flex gap-3 overflow-x-auto pb-1">
                            {previewImages.map((image, index) => {
                                const isCover =
                                    image.imageUrl === journal.coverImageUrl;

                                const isLastPreview =
                                    index === previewImages.length - 1;

                                const showMoreOverlay =
                                    isLastPreview && remainingCount > 0;

                                return (
                                    <button
                                        key={image.publicId}
                                        type="button"
                                        disabled={galleryLoading}
                                        aria-label={
                                            showMoreOverlay
                                                ? `View all ${journal.images.length} images`
                                                : `View ${journal.title} image ${index + 1}`
                                        }
                                        // Clicking the last preview tile opens
                                        // the full gallery (matching what the
                                        // "+N" overlay visually promises)
                                        // instead of just opening that one
                                        // image in the lightbox.
                                        onClick={() =>
                                            showMoreOverlay
                                                ? onViewAll?.()
                                                : onImageClick?.(index)
                                        }
                                        className={cn(
                                            "group relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border-2 bg-muted transition-all hover:shadow-md",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:focus-visible:ring-violet-400 focus-visible:ring-offset-2",
                                            isCover
                                                ? "border-violet-500 dark:border-violet-400"
                                                : "border-transparent",
                                        )}
                                    >
                                        <img
                                            src={image.imageUrl}
                                            alt={`${journal.title} - image ${index + 1}`}
                                            loading="lazy"
                                            draggable={false}
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                                transition-transform
                                                duration-300
                                                group-hover:scale-105
                                            "
                                        />

                                        {/* Subtle hover overlay for depth —
                                            skipped on the "+N" tile since it
                                            already has its own overlay. */}
                                        {!showMoreOverlay && (
                                            <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
                                        )}

                                        {isCover && !showMoreOverlay && (
                                            <span className="absolute left-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-violet-600 dark:bg-violet-950 dark:text-violet-300 shadow">
                                                <Check className="h-3.5 w-3.5" />
                                            </span>
                                        )}

                                        {showMoreOverlay && (
                                            <div
                                                className="absolute inset-0 flex items-center justify-center bg-black/55 text-base font-semibold text-white transition-colors duration-200 group-hover:bg-black/65"
                                                aria-hidden="true"
                                            >
                                                +{remainingCount}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}

                            {/* Add Image */}
                            <button
                                type="button"
                                aria-label="Add images"
                                disabled={galleryLoading}
                                onClick={onAddImages}
                                className="
                                    flex
                                    h-24
                                    w-32
                                    shrink-0
                                    flex-col
                                    items-center
                                    justify-center
                                    gap-1.5
                                    rounded-xl
                                    border-2
                                    border-dashed
                                    border-muted-foreground/30
                                    text-muted-foreground
                                    transition-colors
                                    hover:bg-muted
                                    focus-visible:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-violet-500
                                    focus-visible:ring-offset-2
                                "
                            >
                                <Plus className="h-5 w-5" />

                                <span className="text-xs font-medium">
                                    Add Images
                                </span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center">
                            <div className="mb-5 rounded-full bg-muted p-4">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>

                            <h3 className="text-lg font-semibold">
                                No images yet
                            </h3>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                                Add your first journal image to preserve
                                memorable moments from this entry.
                            </p>

                            <Button
                                type="button"
                                aria-label="Add images"
                                disabled={galleryLoading}
                                onClick={onAddImages}
                                className="mt-6 gap-2"
                            >
                                <ImagePlus className="h-4 w-4" />
                                Add Images
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}

export default React.memo(JournalGallery);