import {
    Pencil,
    Trash2,
} from "lucide-react";

import type {
    JournalImageResponse,
} from "@/types/api/journal";

import {
    Button,
} from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface ExistingImagePreviewCardProps {

    image:
    JournalImageResponse;

    onRemove:
    (publicId: string) => void;

    onReplace:
    (publicId: string) => void;

    disabled?: boolean;
}


export default function ExistingImagePreviewCard({
    image,
    onRemove,
    onReplace,
    disabled = false,
}: ExistingImagePreviewCardProps) {

    return (
        <div className="space-y-3">

            <div
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                "
            >

                <img
                    src={image.imageUrl}
                    alt="Journal image"
                    draggable={false}
                    loading="lazy"
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
                        p-3
                        transition-all
                        group-hover:bg-black/20
                    "
                >

                    {/* Replace */}

                    <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        disabled={disabled}
                        aria-label="Replace image"
                        className={cn(
                            "scale-95 transition-all duration-200",
                            !disabled && [
                                "opacity-0",
                                "group-hover:scale-100",
                                "group-hover:opacity-100",
                            ],
                            disabled && [
                                "pointer-events-none",
                                "opacity-0",
                            ],
                        )}
                        onClick={() =>
                            onReplace(
                                image.publicId,
                            )
                        }
                    >
                        <Pencil
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                    </Button>


                    {/* Remove */}

                    <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        disabled={disabled}
                        aria-label="Remove image"
                        className={cn(
                            "scale-95 transition-all duration-200",
                            !disabled && [
                                "opacity-0",
                                "group-hover:scale-100",
                                "group-hover:opacity-100",
                            ],
                            disabled && [
                                "pointer-events-none",
                                "opacity-0",
                            ],
                        )}
                        onClick={() =>
                            onRemove(
                                image.publicId,
                            )
                        }
                    >
                        <Trash2
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                    </Button>

                </div>

            </div>


            <div className="space-y-1">

                <p
                    className="
                        truncate
                        text-sm
                        font-medium
                    "
                >
                    Saved image
                </p>



            </div>

        </div>
    );
}