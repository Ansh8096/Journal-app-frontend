import type { UserSummary } from "./user";

export interface LoginRequest{
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    tokenType: string;
    user: UserSummary;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    city: string;
    sentimentAnalysisEnabled: boolean;
}