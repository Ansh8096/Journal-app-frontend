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

import { Loader2, Trash2 } from "lucide-react";
import { journalDetailsConfig } from "../JournalDetailsConfig";

interface DeleteJournalDialogProps {
    open: boolean;

    journalTitle: string;

    onOpenChange: (open: boolean) => void;

    onConfirm: () => void;

    loading?: boolean;
}

export default function DeleteJournalDialog({
    open,
    journalTitle,
    onOpenChange,
    onConfirm,
    loading = false,
}: DeleteJournalDialogProps) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <Trash2 className="h-5 w-5 text-destructive" />

                        {journalDetailsConfig.dialog.delete.title}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {journalDetailsConfig.dialog.delete.description.beforeTitle}{" "}
                        <span className="font-semibold text-foreground">
                            "{journalTitle}"
                        </span>
                        {journalDetailsConfig.dialog.delete.description.afterTitle}

                        <br />
                        <br />

                        {journalDetailsConfig.dialog.delete.description.warning}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                        {journalDetailsConfig.dialog.delete.cancel}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={loading}
                        onClick={onConfirm}
                        className="
                            bg-destructive
                            hover:bg-destructive/90
                            text-destructive-foreground
                        "
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {journalDetailsConfig.dialog.delete.pending}
                            </>
                        ) : (
                            `${journalDetailsConfig.dialog.delete.confirm}`
                        )}
                    </AlertDialogAction>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}