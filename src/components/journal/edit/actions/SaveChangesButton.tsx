import { Save } from "lucide-react";

import LoadingSubmitButton from "@/components/common/LoadingSubmitButton";
import { cn } from "@/lib/utils";

interface SaveChangesButtonProps {
    loading?: boolean;
    disabled?: boolean;
    className?: string;
}

export default function SaveChangesButton({
    loading = false,
    disabled = false,
    className,
}: SaveChangesButtonProps) {
    return (
        <LoadingSubmitButton
            type="submit"
            loading={loading}
            loadingText="Saving Changes..."
            disabled={disabled || loading}
            className={cn(
                "group rounded-lg! transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98]",
                className,
            )}
        >
            <Save
                className="mr-2 h-4 w-4"
                aria-hidden="true"
            />

            <span>
                Save Changes
            </span>
            
        </LoadingSubmitButton>
    );
}