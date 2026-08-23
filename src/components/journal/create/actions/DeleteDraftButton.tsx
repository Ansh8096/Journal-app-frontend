import { Trash2 } from "lucide-react";

import LoadingSubmitButton from "@/components/common/LoadingSubmitButton";
import { cn } from "@/lib/utils";

interface DeleteDraftButtonProps {
    /**
     * Triggered when the user requests to delete the draft.
     *
     * Note:
     * This callback should only initiate the delete flow
     * (e.g. open a confirmation dialog). It should not
     * perform the actual deletion.
     */
    onDeleteRequest: () => void;

    /**
     * Controls the loading state while the delete flow
     * is being processed.
     */
    loading?: boolean;

    /**
     * Disables the button.
     */
    disabled?: boolean;

    /**
     * Allows additional styling from the parent.
     */
    className?: string;
}

export default function DeleteDraftButton({
    onDeleteRequest,
    loading = false,
    disabled = false,
    className,
}: DeleteDraftButtonProps) {
    return (
        <LoadingSubmitButton
            type="button"
            variant="outline"
            size="icon"
            loading={loading}
            loadingText=""
            disabled={disabled || loading}
            onClick={onDeleteRequest}
            aria-label="Delete draft"
            className={cn(
                "!rounded-lg text-muted-foreground transition-all duration-200 hover:scale-[1.02] hover:border-destructive/40 hover:text-destructive hover:shadow-sm active:scale-[0.98]",
                className,
            )}
        >
            <Trash2
                className="h-4 w-4"
                aria-hidden="true"
            />
        </LoadingSubmitButton>
    );
}