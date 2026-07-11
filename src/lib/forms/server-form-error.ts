import type {
    FieldPath,
    FieldValues,
    UseFormReturn,
} from "react-hook-form";

import {
    isConflict,
    isValidationError,
} from "@/lib/error";

/**
 * Maps server-side errors to React Hook Form.
 *
 * Returns true if the error was handled.
 */
export function applyServerFormError<
    TFieldValues extends FieldValues,
>(
    error: unknown,
    form: UseFormReturn<TFieldValues>,
): boolean {

    if (isValidationError(error)) {

        if (!error.validationErrors) {
            return false;
        }

        let handled = false;

        Object.entries(error.validationErrors).forEach(
            ([field, message]) => {
                form.clearErrors(
                    field as FieldPath<TFieldValues>
                );

                form.setError(
                    field as FieldPath<TFieldValues>,
                    {
                        type: "server",
                        message,
                    }
                );

                handled = true;
            }
        );

        return handled;
    }

    if (isConflict(error)) {

        if (!error.field) {
            return false;
        }

        form.clearErrors(
            error.field as FieldPath<TFieldValues>
        );

        form.setError(
            error.field as FieldPath<TFieldValues>,
            {
                type: "server",
                message: error.message,
            }
        );

        return true;
    }

    return false;
}