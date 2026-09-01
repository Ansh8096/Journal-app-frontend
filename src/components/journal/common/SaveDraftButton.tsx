import { Save } from "lucide-react";

import LoadingSubmitButton from "@/components/common/LoadingSubmitButton";
import { cn } from "@/lib/utils";

interface SaveDraftButtonProps {
    /**
     * Button type.
     *
     * Use "submit" when the button should submit
     * the surrounding form.
     *
     * Use "button" when handling the action manually
     * through onSaveDraft.
     */
    type?: "button" | "submit";

    /**
     * Triggered when type="button".
     */
    onSaveDraft?: () => void;

    /**
     * Controls the loading state.
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

export default function SaveDraftButton({
    type = "submit",
    onSaveDraft,
    loading = false,
    disabled = false,
    className,
}: SaveDraftButtonProps) {
    return (
        <LoadingSubmitButton
            type={type}
            variant="outline"
            loading={loading}
            loadingText="Saving Draft..."
            disabled={disabled || loading}
            onClick={
                type === "button"
                    ? onSaveDraft
                    : undefined
            }
            className={cn(
                "!rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98]",
                className,
            )}
        >
            <Save
                className="mr-2 h-4 w-4"
                aria-hidden="true"
            />

            <span>Save Draft</span>
        </LoadingSubmitButton>
    );
}