export type ValidationErrors = Record <string, string>;

export interface ErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
    validationErrors?: ValidationErrors;
    field? : string;
}