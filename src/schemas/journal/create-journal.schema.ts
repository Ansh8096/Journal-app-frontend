import { z } from "zod";

import {
    MOOD_OPTIONS,
} from "@/constants/journal/journal-details";

import type {
    Mood,
} from "@/types/common/mood";
import { journalConstants } from "@/constants/journal/journal-constants";
import { isRichTextEmpty } from "@/lib/validation/isRichTextEmpty";


/**
 * --------------------------------
 * MOOD VALUES
 * --------------------------------
 *
 * Derive the allowed values from
 * the existing MOOD_OPTIONS instead
 * of duplicating the mood list here.
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
 * CREATE JOURNAL SCHEMA
 * --------------------------------
 */

export const createJournalSchema =
    z.object({

        /**
         * Journal title.
         */
        title: z
            .string()
            .trim()
            .min(
                1,
                "Title is required.",
            )
            .max(
            journalConstants.validation.title.maxLength,
            `Title cannot exceed ${journalConstants.validation.title.maxLength} characters.`,
        ),

        /**
         * Journal content.
         */
        content: z
            .string()
            .refine(
                (value) =>
                    !isRichTextEmpty(value),
                {
                    message:
                        "Journal content is required.",
                },
            ),

        /**
         * Journal mood.
         *
         * null means no mood has been
         * selected yet.
         *
         * The actual API requires a
         * mood, so validation will fail
         * until the user selects one.
         */
        mood: z
            .enum(moodValues, {
                error:
                    "Please select a mood.",
            })
            .nullable(),

        tags: z.array(
            z.string(),
        ),
            
    });


export type CreateJournalFormValues =
    z.infer<
        typeof createJournalSchema
    >;