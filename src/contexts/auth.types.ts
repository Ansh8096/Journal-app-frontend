import type { LoginRequest } from "@/types/api/auth";
import type { UserProfile } from "@/types/api/user";

export interface AuthContextType {

    user: UserProfile | null;

    loading: boolean;

    isAuthenticated: boolean;

    login: (
        request: LoginRequest,
    ) => Promise<void>;

    loginWithGoogle: () => Promise<void>;

    logout: () => void;

    refreshUser: () => Promise<void>;
    
}