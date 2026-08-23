import {
    isRichTextEmpty,
} from "@/lib/validation/isRichTextEmpty";

import type {
    Mood,
} from "@/types/common/mood";


interface DraftValues {

    title: string;

    content: string;

    mood: Mood | null;

    tags: string[];
}


interface IsDraftEmptyOptions {

    values: DraftValues;

    hasImages: boolean;
}


export function isDraftEmpty({
    values,
    hasImages,
}: IsDraftEmptyOptions): boolean {

    /**
     * --------------------------------
     * TITLE
     * --------------------------------
     */

    const hasTitle =
        values.title.trim().length > 0;


    /**
     * --------------------------------
     * CONTENT
     * --------------------------------
     */

    const hasContent =
        !isRichTextEmpty(
            values.content,
        );


    /**
     * --------------------------------
     * MOOD
     * --------------------------------
     */

    const hasMood =
        values.mood !== null;


    /**
     * --------------------------------
     * TAGS
     * --------------------------------
     */

    const hasTags =
        values.tags.some(
            (tag) =>
                tag.trim().length > 0,
        );


    /**
     * --------------------------------
     * FINAL RESULT
     * --------------------------------
     *
     * A draft is empty only when
     * absolutely nothing meaningful
     * has been entered or selected.
     */

    return !(
        hasTitle ||
        hasContent ||
        hasMood ||
        hasTags ||
        hasImages
    );
}