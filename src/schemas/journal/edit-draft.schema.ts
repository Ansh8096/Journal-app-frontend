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


/**
 * --------------------------------
 * MOOD VALUES
 * --------------------------------
 *
 * Reuse the existing mood options.
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
 * EDIT DRAFT SCHEMA
 * --------------------------------
 *
 * Drafts are intentionally allowed
 * to be incomplete.
 *
 * Therefore:
 *
 * title   → optional in the API sense
 * content → optional
 * mood    → nullable
 * tags    → array
 *
 * The "completely empty draft" rule
 * is handled separately through
 * isDraftEmpty(), because images
 * live outside RHF.
 */

export const editDraftSchema =
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
            z.string(),


        mood:
            z
                .enum(
                    moodValues,
                    {
                        error:
                            "Please select a valid mood.",
                    },
                )
                .nullable(),


        tags:
            z.array(
                z.string(),
            ),

    });


export type EditDraftFormValues =
    z.infer<
        typeof editDraftSchema
    >;