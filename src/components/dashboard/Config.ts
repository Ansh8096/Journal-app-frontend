import {
    BookOpen,
    Settings,
    SquarePen,
    User,
    type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";

export interface QuickActionConfig {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
}

export const quickActions: QuickActionConfig[] = [
    {
        title: "Create Journal",
        description: "Write a new journal entry.",
        icon: SquarePen,
        href: ROUTES.NEW_JOURNAL,
    },
    {
        title: "My Journals",
        description: "Browse all your journal entries.",
        icon: BookOpen,
        href: ROUTES.JOURNALS,
    },
    {
        title: "Profile",
        description: "Manage your personal information.",
        icon: User,
        href: ROUTES.PROFILE,
    },
    {
        title: "Settings",
        description: "Configure your account preferences.",
        icon: Settings,
        href: ROUTES.SETTINGS,
    },
];

export interface MotivationCardConfig {
    title: string;
    quote: string;
    description: string;
}

export const motivationCard: MotivationCardConfig = {
    title: "Today's Reflection",

    quote: `The best time to understand yourself
    is to write your thoughts.`,

    description:
        "Take a few moments today to capture your ideas, emotions, and experiences. Every journal entry is a step toward greater self-awareness.",
};
