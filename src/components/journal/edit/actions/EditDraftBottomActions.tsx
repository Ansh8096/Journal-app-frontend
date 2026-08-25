import {
    cn,
} from "@/lib/utils";

import DiscardChangesButton
    from "./DiscardChangesButton";

import SaveDraftButton from "../../common/SaveDraftButton";

import PublishDraftButton
    from "./PublishDraftButton";


interface EditDraftBottomActionsProps {

    /**
     * --------------------------------
     * DISCARD
     * --------------------------------
     *
     * Connected to F.15.
     */
    onDiscardRequest:
        () => void;


    /**
     * --------------------------------
     * PUBLISH
     * --------------------------------
     *
     * Will be connected to F.17.
     */
    onPublishDraft:
        () => void;


    /**
     * --------------------------------
     * SAVE STATE
     * --------------------------------
     */
    isSavingDraft?: boolean;


    /**
     * --------------------------------
     * PUBLISH STATE
     * --------------------------------
     */
    isPublishingDraft?: boolean;


    /**
     * --------------------------------
     * CHANGE STATE
     * --------------------------------
     *
     * Controls Save Draft and
     * Discard Changes.
     */
    hasUnsavedChanges:
        boolean;


    className?: string;
}


export default function EditDraftBottomActions({
    onDiscardRequest,

    onPublishDraft,

    isSavingDraft = false,

    isPublishingDraft = false,

    hasUnsavedChanges,

    className,
}: EditDraftBottomActionsProps) {


    /**
     * --------------------------------
     * SAVE/DISCARD DISABLED STATE
     * --------------------------------
     *
     * These actions only make sense
     * when there are unsaved changes.
     */
    const saveDiscardDisabled =
        !hasUnsavedChanges ||
        isSavingDraft ||
        isPublishingDraft;


    /**
     * --------------------------------
     * PUBLISH DISABLED STATE
     * --------------------------------
     *
     * IMPORTANT:
     *
     * Publish does NOT depend on
     * hasUnsavedChanges.
     *
     * A user can publish an already
     * saved draft without modifying it.
     */
    const publishDisabled =
        isSavingDraft ||
        isPublishingDraft;


    return (
        <section
            aria-label="Draft edit actions"

            className={cn(
                `
                    flex
                    flex-col
                    gap-3
                    rounded-lg
                    border
                    bg-card
                    px-4
                    py-3
                `,

                `
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                `,

                className,
            )}
        >

            {/* --------------------------------------------------------------
                LEFT
            -------------------------------------------------------------- */}

            <DiscardChangesButton
                onClick={
                    onDiscardRequest
                }

                disabled={
                    saveDiscardDisabled
                }

                className="
                    w-full
                    sm:w-auto
                "
            />


            {/* --------------------------------------------------------------
                RIGHT
            -------------------------------------------------------------- */}

            <div
                className="
                    flex
                    w-full
                    flex-col
                    gap-3
                    sm:w-auto
                    sm:flex-row
                "
            >

                <SaveDraftButton
                    type="submit"

                    loading={
                        isSavingDraft
                    }

                    disabled={
                        saveDiscardDisabled
                    }

                    className="
                        w-full
                        sm:w-auto
                    "
                />

                <PublishDraftButton
                    onClick={
                        onPublishDraft
                    }

                    loading={
                        isPublishingDraft
                    }

                    disabled={
                        publishDisabled
                    }

                    className="
                        w-full
                        sm:w-auto
                    "
                />

            </div>

        </section>
    );
}