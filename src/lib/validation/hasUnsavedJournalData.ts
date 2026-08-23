import {
    isRichTextEmpty,
} from "@/lib/validation/isRichTextEmpty";

import type {
    CreateJournalFormValues,
} from "@/schemas/journal/create-journal.schema";


interface HasUnsavedJournalDataOptions {
    values: Partial<CreateJournalFormValues>;
    hasImages: boolean;
}


export function hasUnsavedJournalData({
    values,
    hasImages,
}: HasUnsavedJournalDataOptions): boolean {

    /**
     * --------------------------------
     * TITLE
     * --------------------------------
     */

    const title =
        values.title ?? "";

    const hasTitle =
        title.trim().length > 0;


    /**
     * --------------------------------
     * CONTENT
     * --------------------------------
     */

    const content =
        values.content ?? "";

    const hasContent =
        !isRichTextEmpty(
            content,
        );


    /**
     * --------------------------------
     * MOOD
     * --------------------------------
     */

    const mood =
        values.mood ?? null;

    const hasMood =
        mood !== null;


    /**
     * --------------------------------
     * TAGS
     * --------------------------------
     */

    const tags =
        values.tags ?? [];

    const hasTags =
        tags.some(
            (tag) =>
                tag.trim().length > 0,
        );


    /**
     * --------------------------------
     * IMAGES
     * --------------------------------
     */

    const hasSelectedImages =
        hasImages;


    /**
     * --------------------------------
     * FINAL RESULT
     * --------------------------------
     */

    return (
        hasTitle ||
        hasContent ||
        hasMood ||
        hasTags ||
        hasSelectedImages
    );
}