import { cn } from "@/lib/utils";

import DeleteDraftButton from "./DeleteDraftButton";
import PublishJournalButton from "./PublishJournalButton";
import SaveDraftButton from "../../common/SaveDraftButton";

interface BottomActionsProps {
    onDeleteRequest: () => void;
    onSaveDraft: () => void;
    onPublishJournal: () => void;

    isDeleting?: boolean;
    isSavingDraft?: boolean;
    isPublishing?: boolean;

    disabled?: boolean;

    showPublishDropdownIndicator?: boolean;

    className?: string;
}

export default function BottomActions({
    onDeleteRequest,
    onSaveDraft,
    onPublishJournal,
    isDeleting = false,
    isSavingDraft = false,
    isPublishing = false,
    disabled = false,
    // Reverted to false — no dropdown chevron on Publish Journal.
    showPublishDropdownIndicator = false,
    className,
}: BottomActionsProps) {
    return (
        <section
            aria-label="Journal actions"
            className={cn(
                "flex flex-col gap-4 rounded-lg border bg-card px-4 py-3",
                "sm:flex-row sm:items-center sm:justify-between",
                className,
            )}
        >
            <DeleteDraftButton
                onDeleteRequest={onDeleteRequest}
                loading={isDeleting}
                disabled={disabled}
            />

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <SaveDraftButton
                    type="button"
                    onSaveDraft={onSaveDraft}
                    loading={isSavingDraft}
                    disabled={disabled}
                    className="w-full sm:w-auto"
                />

                <PublishJournalButton
                    type="submit"
                    onPublishJournal={onPublishJournal}
                    loading={isPublishing}
                    disabled={disabled}
                    showDropdownIndicator={
                        showPublishDropdownIndicator
                    }
                    className="w-full sm:w-auto"
                />
            </div>
        </section>
    );
}