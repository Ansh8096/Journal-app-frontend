import type { ReactNode } from "react";
import type { AuthBrandingContent } from "@/constants/auth-branding";
import AuthBranding from "@/components/auth/AuthBranding";

export interface AuthLayoutProps {
    branding: AuthBrandingContent;
    children: ReactNode;
}

const AuthLayout  = ({
    branding,
    children,
} : AuthLayoutProps) => {
    return (

        <div className="min-h-screen grid lg:grid-cols-2">

            {/* Left Branding */}
            <div className="hidden lg:flex items-center justify-center border-r bg-muted/30 p-12">
                <AuthBranding content={branding} />
            </div>

            {/* Right Content */}
            <div className="flex items-center justify-center p-6 sm:p-8">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>

        </div>
    );
}

export default AuthLayout;