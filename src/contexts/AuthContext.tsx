import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import authService from "@/services/auth.service";
import userService from "@/services/user.service";

import type { LoginRequest } from "@/types/api/auth";
import type { UserProfile } from "@/types/api/user";

import type { AuthContextType } from "./auth.types";

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider ({
    children,
} : AuthProviderProps){

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const isAuthenticated = user !== null;

    // Using useCallback keeps the function reference stable...
    const refreshUser = useCallback(async() : Promise<void> =>{

        const profile  = await userService.getProfile();
        setUser(profile);
        console.log("User profile fetched after login: ", profile);
        
    },[])

    const login = useCallback(
        async (request : LoginRequest) : Promise<void>=>{
            
            await authService.login(request);

            await refreshUser(); // we call this beacuse AuthContext stores the profileResponse not LoginResponse...
    },[])

    const logout = useCallback((): void =>{

        authService.logout();
        setUser(null);

    }, [])

    // We are not validating the token here, beacuse backend will do that...
    const initialize = useCallback(async() : Promise<void> =>{
    
        if(!authService.isAuthenticated()){
            setLoading(false);

            return;
        }

        try {
            await refreshUser(); // it fetches the user profile...

        } catch (error) {// suppose we get an error (like: jwt expired), we remove the invalid jwt immediately...
            console.error("Failed to restore session:", error);
            authService.logout();
            setUser(null);

        } finally{
            setLoading(false);
        }

        useEffect(() => {
            void initialize();
        }, [initialize]);

    },[refreshUser])

    // useMemo()-> We tell React: "Only recreate this object when one of its dependencies changes."
    // If any one changes, React creates a new object. Otherwise, React returns the previous object.
    const value = useMemo<AuthContextType>(
        ()=>({
            user,
            loading,
            isAuthenticated,
            login,
            logout,
            refreshUser,
        }), [
            user,
            loading,
            login,
            logout,
            refreshUser,
            
        ]
    )
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

