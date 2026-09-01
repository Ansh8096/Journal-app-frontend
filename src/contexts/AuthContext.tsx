import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import authService
    from "@/services/auth.service";

import userService
    from "@/services/user.service";

import type {
    LoginRequest,
} from "@/types/api/auth";

import type {
    UserProfile,
} from "@/types/api/user";

import type {
    AuthContextType,
} from "./auth.types";

import {
    queryClient,
} from "@/lib/react-query/query-client";

export const AuthContext =
    createContext<
        AuthContextType | undefined
    >(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {

    const [
        user,
        setUser,
    ] = useState<UserProfile | null>(
        null,
    );

    const [
        loading,
        setLoading,
    ] = useState<boolean>(true);

    const isAuthenticated =
        user !== null;

    /*
     * ----------------------------------------
     * Restore current user
     * ----------------------------------------
     */
    const refreshUser =
        useCallback(
            async (): Promise<void> => {

                const profile =
                    await userService
                        .getProfile();

                setUser(profile);
            },
            [],
        );

    /*
     * ----------------------------------------
     * Normal username/password login
     * ----------------------------------------
     */
    const login =
        useCallback(
            async (
                request: LoginRequest,
            ): Promise<void> => {

                /*
                 * Prevent previous account data
                 * from surviving into the new session.
                 */
                queryClient.clear();

                await authService.login(
                    request,
                );

                await refreshUser();
            },
            [refreshUser],
        );

    /*
     * ----------------------------------------
     * Google login
     * ----------------------------------------
     *
     * The OAuth callback reaches this method
     * after the backend has authenticated the
     * Google identity.
     */
    const loginWithGoogle =
        useCallback(
            async (): Promise<void> => {

                /*
                 * Clear any cached data that might
                 * belong to a previous account.
                 */
                queryClient.clear();

                /*
                 * Exchange the temporary OAuth
                 * cookie for the normal JournalFlow JWT.
                 */
                await authService
                    .loginWithGoogle();

                /*
                 * Load the authenticated
                 * JournalFlow user exactly like
                 * normal login.
                 */
                await refreshUser();
            },
            [refreshUser],
        );

    /*
     * ----------------------------------------
     * Logout
     * ----------------------------------------
     */
    const logout =
        useCallback(
            (): void => {

                authService.logout();

                setUser(null);

                queryClient.clear();
            },
            [],
        );

    /*
     * ----------------------------------------
     * Initialize session
     * ----------------------------------------
     */
    const initialize =
        useCallback(
            async (): Promise<void> => {

                if (
                    !authService
                        .isAuthenticated()
                ) {

                    setLoading(false);

                    return;
                }

                try {

                    await refreshUser();

                } catch (error) {

                    console.error(
                        "Failed to restore session:",
                        error,
                    );

                    authService.logout();

                    setUser(null);

                    queryClient.clear();

                } finally {

                    setLoading(false);
                }
            },
            [refreshUser],
        );

    useEffect(() => {
        void initialize();
    }, [initialize]);

    const value =
        useMemo<AuthContextType>(
            () => ({
                user,

                loading,

                isAuthenticated,

                login,

                loginWithGoogle,

                logout,

                refreshUser,
            }),
            [
                user,
                loading,
                login,
                loginWithGoogle,
                logout,
                refreshUser,
            ],
        );

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
}