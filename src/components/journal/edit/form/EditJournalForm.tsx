import {
    useFormContext,
} from "react-hook-form";

import type {
    EditJournalFormValues,
} from "@/schemas/journal/edit-journal.schema";
import JournalTitleInput from "../../create/title/JournalTitleInput";
import JournalEditor from "../../create/editor/JournalEditor";
import type { JournalImageResponse } from "@/types/api/journal";
import ImageUploadSection from "../../create/images/ImageUploadSection";
import type { SelectedImage } from "@/types/journal/image";
import EditBottomActions from "../actions/EditBottomActions";

interface EditJournalFormProps {

    existingImages:
        JournalImageResponse[];

    newImages:
        SelectedImage[];

    onNewImagesChange:
        (
            images: SelectedImage[],
        ) => void;

    onRemoveExistingImage:
        (
            publicId: string,
        ) => void;

    onReplaceExistingImage:
        (
            publicId: string,
            replacement: SelectedImage,
        ) => void;

    onSubmit:
        (
            values: EditJournalFormValues,
        ) => void;

    isUpdating?: boolean;

    onDiscardRequest: () => void;

    hasUnsavedChanges: boolean;
}

export default function EditJournalForm({
    existingImages,

    newImages,

    onNewImagesChange,

    onRemoveExistingImage,

    onReplaceExistingImage,

    onSubmit,

    isUpdating = false,

    onDiscardRequest,

    hasUnsavedChanges,
}: EditJournalFormProps) {

    const form =
        useFormContext<
            EditJournalFormValues
        >();

    return (
        <form
            onSubmit={
                form.handleSubmit(
                    onSubmit,
                )
            }

            className="space-y-8"

            aria-busy={
                isUpdating
            }
        >

            {/* --------------------------------
                TITLE
            --------------------------------- */}

            <JournalTitleInput
                control={
                    form.control
                }
            />


            {/* --------------------------------
                EDITOR
            --------------------------------- */}

            <JournalEditor
                name="content"
                control={
                    form.control
                }
            />


            {/* --------------------------------
                IMAGES
            --------------------------------- */}

            <ImageUploadSection
                mode="edit"

                images={
                    newImages
                }

                onImagesChange={
                    onNewImagesChange
                }

                existingImages={
                    existingImages
                }

                onRemoveExistingImage={
                    onRemoveExistingImage
                }

                onReplaceExistingImage={
                    onReplaceExistingImage
                }

                disabled={
                    isUpdating
                }
            />

            <EditBottomActions
                onDiscardRequest={
                    onDiscardRequest
                }

                isSaving={
                    isUpdating
                }

                hasUnsavedChanges={
                    hasUnsavedChanges
                }
            />

        </form>
    );
}