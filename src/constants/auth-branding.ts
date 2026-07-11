import type { LucideIcon } from "lucide-react"; 

import {
    BookOpen,
    Heart,
    ShieldCheck,
    Sparkles,
    BarChart3,
    LockKeyhole,
} from "lucide-react";

export interface AuthFeature{
    icon: LucideIcon;
    text: string;
};

export interface AuthBrandingContent{
    title: string;
    subtitle: string;
    features: AuthFeature[];
    illustration?: React.ReactNode;
}

export const loginBranding : AuthBrandingContent = {
    title: "Welcome Back 👋",

    subtitle: "Your story continues today. Pick up where you left off.",
    
    features: [
        {
            icon: BookOpen,
            text: "Capture your daily thoughts",
        },
        {
            icon: Heart,
            text: "Track your moods over time",
        },
        {
            icon: ShieldCheck,
            text: "Keep your memories safe and organized",
        },
    ]
};

export const signupBranding: AuthBrandingContent = {
    title: "Every Great Story Begins With One Page ✨",

    subtitle: "Create your personal journal and start building a lifelong habit.",

        features: [
        {
            icon: Sparkles,
            text: "Build a daily journaling habit",
        },
        {
            icon: BarChart3,
            text: "Visualize your emotional journey",
        },
        {
            icon: LockKeyhole,
            text: "Private & secure by design",
        },
    ]
};
