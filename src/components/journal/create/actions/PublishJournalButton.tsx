import { ChevronDown, SendHorizontal } from "lucide-react";

import LoadingSubmitButton from "@/components/common/LoadingSubmitButton";
import { cn } from "@/lib/utils";

interface PublishJournalButtonProps {
    type?: "button" | "submit";

    onPublishJournal?: () => void;

    loading?: boolean;

    disabled?: boolean;

    showDropdownIndicator?: boolean;

    className?: string;
}

export default function PublishJournalButton({
    type,
    onPublishJournal,
    loading = false,
    disabled = false,
    showDropdownIndicator = false,
    className,
}: PublishJournalButtonProps) {
    return (
        <LoadingSubmitButton
            type={type}
            loading={loading}
            loadingText="Publishing..."
            disabled={disabled}
            onClick={
                type === "button"
                    ? onPublishJournal
                    : undefined
            }
            className={cn(
                "group rounded-lg! transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98]",
                className,
            )}
        >
            <SendHorizontal
                className="mr-2 h-4 w-4"
                aria-hidden="true"
            />

            <span>Publish Journal</span>

            {showDropdownIndicator && (
                <ChevronDown
                    className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                    aria-hidden="true"
                />
            )}
        </LoadingSubmitButton>
    );
}