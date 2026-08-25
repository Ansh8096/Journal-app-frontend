import { z } from "zod";

import {
    MOOD_OPTIONS,
} from "@/constants/journal/journal-details";

import type {
    Mood,
} from "@/types/common/mood";

import {
    journalConstants,
} from "@/constants/journal/journal-constants";

import {
    isRichTextEmpty,
} from "@/lib/validation/isRichTextEmpty";


/**
 * --------------------------------
 * MOOD VALUES
 * --------------------------------
 */

const moodValues =
    MOOD_OPTIONS.map(
        (option) => option.value,
    ) as [
        Mood,
        ...Mood[],
    ];


/**
 * --------------------------------
 * EDIT JOURNAL SCHEMA
 * --------------------------------
 */

export const editJournalSchema =
    z.object({

        title:
            z
                .string()
                .trim()
                .max(
                    journalConstants.validation
                        .title.maxLength,

                    `Title cannot exceed ${journalConstants.validation.title.maxLength} characters.`,
                ),

        content:
            z
                .string(),

        mood:
            z
                .enum(
                    moodValues,
                    {
                        error:
                            "Please select a mood.",
                    },
                )
                .nullable(),

        tags:
            z.array(
                z.string(),
            ),

    });


export type EditJournalFormValues =
    z.infer<
        typeof editJournalSchema
    >;