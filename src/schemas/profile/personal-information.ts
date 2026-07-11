import { z } from "zod";

const USERNAME = {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
} as const;

export const usernameSchema = z.object({
    username: z
        .string()
        .trim()
        .min(
            USERNAME.MIN_LENGTH,
            `Username must be at least ${USERNAME.MIN_LENGTH} characters.`,
        )
        .max(
            USERNAME.MAX_LENGTH,
            `Username cannot exceed ${USERNAME.MAX_LENGTH} characters.`,
        ),
});

export type UsernameFormData = z.infer<typeof usernameSchema>;


const PASSWORD = {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
} as const;

export const emailSchema = z.object({
    newEmail: z
        .email({
            message: "Please enter a valid email address.",
        }),

    password: z
        .string()
        .min(
            PASSWORD.MIN_LENGTH,
            `Password must be at least ${PASSWORD.MIN_LENGTH} characters.`,
        )
        .max(
            PASSWORD.MAX_LENGTH,
            `Password cannot exceed ${PASSWORD.MAX_LENGTH} characters.`,
        ),
});

export type ChangeEmailFormData = z.infer<typeof emailSchema>;

const CITY = {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
} as const;

export const preferencesSchema = z.object({
    city: z
        .string()
        .trim()
        .min(
            CITY.MIN_LENGTH,
            `City must be at least ${CITY.MIN_LENGTH} characters.`,
        )
        .max(
            CITY.MAX_LENGTH,
            `City cannot exceed ${CITY.MAX_LENGTH} characters.`,
        ),

    sentimentAnalysisEnabled: z.boolean(),
});

export type PreferencesFormData = z.infer<typeof preferencesSchema>;