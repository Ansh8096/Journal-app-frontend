import { cn } from "@/lib/utils";

import DiscardChangesButton
    from "./DiscardChangesButton";

import SaveChangesButton
    from "./SaveChangesButton";


interface EditBottomActionsProps {

    /**
     * Called when the user asks to
     * discard their current changes.
     */
    onDiscardRequest: () => void;


    /**
     * True while the update mutation
     * is running.
     */
    isSaving?: boolean;


    /**
     * True when the current edit form
     * contains no unsaved changes.
     */
    hasUnsavedChanges: boolean;


    className?: string;
}


export default function EditBottomActions({
    onDiscardRequest,

    isSaving = false,

    hasUnsavedChanges = false,

    className,
}: EditBottomActionsProps) {

    /**
     * Both actions become disabled
     * while the update request is running.
     *
     * They also become disabled when
     * there is nothing to discard/save.
     */
    const actionDisabled =
        !hasUnsavedChanges || 
        isSaving;


    return (
        <section
            aria-label="Journal edit actions"
            className={cn(
                "flex flex-col gap-4 rounded-lg border bg-card px-4 py-3",
                "sm:flex-row sm:items-center sm:justify-between",
                className,
            )}
        >

            {/* --------------------------------
                DISCARD
            --------------------------------- */}

            <DiscardChangesButton
                onClick={
                    onDiscardRequest
                }
                disabled={
                    actionDisabled
                }
            />


            {/* --------------------------------
                SAVE CHANGES
            --------------------------------- */}

            <SaveChangesButton
                loading={
                    isSaving
                }
                disabled={
                    actionDisabled
                }
                className="w-full sm:w-auto"
            />

        </section>
    );
}