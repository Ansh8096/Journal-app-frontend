import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import type {
    JournalImageResponse,
} from "@/types/api/journal";

interface ChangeCoverDialogProps {
    open: boolean;

    images: JournalImageResponse[];

    currentCoverUrl: string | null;

    loading?: boolean;

    onOpenChange: (open: boolean) => void;

    onSelect: (publicId: string) => void;
}

export default function ChangeCoverDialog({
    open,
    images,
    currentCoverUrl,
    loading = false,
    onOpenChange,
    onSelect,
}: ChangeCoverDialogProps) {
    
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>
                        Choose Cover Image
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {images.map((image) => {
                        
                        const selected =
                            image.imageUrl === currentCoverUrl;

                        return (
                            <button
                                key={image.publicId}
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                    onSelect(image.publicId)
                                }
                                className={`
                                    overflow-hidden
                                    rounded-xl
                                    border-2
                                    transition

                                    ${
                                        selected
                                            ? "border-primary"
                                            : "border-border"
                                    }
                                `}
                            >
                                <img
                                    src={image.imageUrl}
                                    alt=""
                                    className="
                                        aspect-square
                                        w-full
                                        object-cover
                                    "
                                />
                            </button>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}