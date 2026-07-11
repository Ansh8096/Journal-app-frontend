import type { ValidationErrors } from "@/types/api/error";

type AppErrorOptions = {
    status: number;
    message: string;
    field?: string,
    validationErrors?: ValidationErrors;
};

// we are extending 'Error' because then we automatically get 'error.message', instead of creating our own property... 
export class AppError extends Error {
    readonly status: number;
    readonly field?: string; 
    readonly validationErrors?: ValidationErrors;

    constructor({
        status,
        message,
        field,
        validationErrors,
    }: AppErrorOptions) {
        super(message);

        this.name = "AppError";
        this.status = status;
        this.field = field;
        this.validationErrors = validationErrors;

        Object.setPrototypeOf(this, AppError.prototype); // ensures that: error instanceof AppError works reliably.
    }
}