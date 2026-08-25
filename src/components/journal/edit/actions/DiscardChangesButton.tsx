import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DiscardChangesButtonProps {
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

export default function DiscardChangesButton({
    onClick,
    disabled = false,
    className,
}: DiscardChangesButtonProps) {
    return (
        <Button
            type="button"
            variant="outline"
            onClick={onClick}
            disabled={disabled}
            aria-label="Discard changes"
            className={cn(
                "rounded-lg! gap-2 text-muted-foreground transition-all duration-200 hover:scale-[1.02] hover:border-destructive/40 hover:text-destructive hover:shadow-sm active:scale-[0.98]",
                className,
            )}
        >
            <Trash2
                className="h-4 w-4"
                aria-hidden="true"
            />

            <span>
                Discard Changes
            </span>
        </Button>
    );
}