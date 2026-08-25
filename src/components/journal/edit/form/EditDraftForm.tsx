import {
    useFormContext,
} from "react-hook-form";

import type {
    EditDraftFormValues,
} from "@/schemas/journal/edit-draft.schema";

import type {
    JournalImageResponse,
} from "@/types/api/journal";

import type {
    SelectedImage,
} from "@/types/journal/image";

import JournalTitleInput
    from "@/components/journal/create/title/JournalTitleInput";

import JournalEditor
    from "@/components/journal/create/editor/JournalEditor";

import ImageUploadSection
    from "@/components/journal/create/images/ImageUploadSection";
import EditDraftBottomActions from "../actions/EditDraftBottomActions";


interface EditDraftFormProps {

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
            values: EditDraftFormValues,
        ) => void;

    isUpdating?: boolean;

    onDiscardRequest:
        () => void;

    hasUnsavedChanges:
        boolean;

    onPublishDraft:
        () => void;

    isPublishingDraft?: boolean;
}

export default function EditDraftForm({
    existingImages,

    newImages,

    onNewImagesChange,

    onRemoveExistingImage,

    onReplaceExistingImage,

    onSubmit,

    isUpdating = false,

    onDiscardRequest,

    hasUnsavedChanges,

    onPublishDraft,

    isPublishingDraft = false,
}: EditDraftFormProps) {

    const form =
        useFormContext<
            EditDraftFormValues
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
                isUpdating ||
                isPublishingDraft
            }
        >

            <JournalTitleInput
                control={
                    form.control
                }
            />


            <JournalEditor
                name="content"
                control={
                    form.control
                }
            />


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
                    isUpdating ||
                    isPublishingDraft
                }
            />


            <EditDraftBottomActions
                onDiscardRequest={
                    onDiscardRequest
                }

                onPublishDraft={
                    onPublishDraft
                }

                isSavingDraft={
                    isUpdating
                }

                isPublishingDraft={
                    isPublishingDraft
                }

                hasUnsavedChanges={
                    hasUnsavedChanges
                }
            />

        </form>
    );
}