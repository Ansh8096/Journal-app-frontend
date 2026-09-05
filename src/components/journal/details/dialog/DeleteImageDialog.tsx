import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Loader2, TriangleAlert } from "lucide-react";

interface DeleteImageDialogProps {
    open: boolean;

    loading?: boolean;

    imageNumber: number;

    isCoverImage?: boolean;

    onOpenChange: (open: boolean) => void;

    onConfirm: () => void;
}

export default function DeleteImageDialog({
    open,
    loading = false,
    imageNumber,
    isCoverImage = false,
    onOpenChange,
    onConfirm,
}: DeleteImageDialogProps) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                {/*
                    The real cause of the off-center look: AlertDialogHeader
                    (in alert-dialog.tsx) switches from `place-items-center`
                    to `place-items-start` at the sm: breakpoint whenever
                    AlertDialogContent's size is "default" (the default,
                    since no size prop is passed here). place-items-start
                    is a GRID placement property — it controls where the
                    icon/title/description boxes sit as a group within the
                    dialog, not the text alignment inside them. The
                    text-center classes below on AlertDialogTitle/
                    AlertDialogDescription only affect text inside those
                    boxes; they can't override where the boxes themselves
                    are positioned, since that's controlled one level up
                    here on the header's grid container. Forcing
                    place-items-center + text-center here (with !important,
                    since the base classes are variant-prefixed and won't
                    reliably lose to a plain override otherwise) keeps
                    everything centered as a group regardless of viewport
                    width.
                */}
                <AlertDialogHeader className="!place-items-center !text-center">
                    <div className="mb-4 flex justify-center items-center">
                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-full
                                bg-destructive/10
                            "
                        >
                            <TriangleAlert
                                className="
                                    h-7
                                    w-7
                                    text-destructive
                                "
                            />
                        </div>
                    </div>

                    <AlertDialogTitle className="text-center">
                        Delete Image?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="space-y-3 text-center">
                        <p>
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-foreground">
                                Image {imageNumber}
                            </span>
                            ?
                        </p>

                        {isCoverImage && (
                            <p
                                className="
                                    rounded-md
                                    bg-amber-50
                                    px-3
                                    py-2
                                    text-sm
                                    text-amber-700
                                    dark:bg-amber-950/30
                                    dark:text-amber-300
                                "
                            >
                                This image is currently being used as the
                                journal cover.
                            </p>
                        )}

                        <p className="text-muted-foreground">
                            This action cannot be undone.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={loading}
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={loading}
                        onClick={(event) => {
                            event.preventDefault();
                            onConfirm();
                        }}
                        className="
                            bg-destructive
                            hover:bg-destructive/90
                        "
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete Image"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}