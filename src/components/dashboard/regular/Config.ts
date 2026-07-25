import {
    BookOpen,
    Flame,
    Settings,
    SquarePen,
    Star,
    Sun,
    User,
    type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";

export interface QuickAction {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
}

export interface QuickActionsSection {
    title: string;
    items: QuickAction[];
}

export interface Motivation {
    title: string;
    quote: string;
    description: string;
}

export interface Statistic {
    title: string;
    value: number | string;
    subtitle: string;
    icon: LucideIcon;
    iconClassName: string;
}

export interface StatisticsSection {
    title: string;
    items: Statistic[];
}

const iconStyles = {
    default: {
        iconClassName: "text-muted-foreground",
    },

    warning: {
        iconClassName: "text-yellow-500",
    },

    streak: {
        iconClassName: "text-orange-500",
    },
} as const;

export const regularDashboardConfig = {
    quickActions: {
        title: "Quick Actions",

        items: [
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
        ] satisfies QuickAction[],
    } satisfies QuickActionsSection,

    motivation: {
        title: "Today's Reflection",

        quote:
            "The best time to understand yourself is to write your thoughts.",

        description:
            "Take a few moments today to capture your ideas, emotions, and experiences. Every journal entry is a step toward greater self-awareness.",
    } satisfies Motivation,

    statistics: {
        title: "Statistics",

        items: [
            {
                title: "Total Journals",
                value: 42,
                subtitle: "Entries",
                icon: BookOpen,
                ...iconStyles.default,
            },
            {
                title: "Favorite Journals",
                value: 18,
                subtitle: "Entries",
                icon: Star,
                ...iconStyles.warning,
            },
            {
                title: "Today's Weather",
                value: "34°C",
                subtitle: "Chandigarh",
                icon: Sun,
                ...iconStyles.warning,
            },
            {
                title: "Current Streak",
                value: 12,
                subtitle: "Days",
                icon: Flame,
                ...iconStyles.streak,
            },
        ] satisfies Statistic[],
    } satisfies StatisticsSection,
} as const;

export type RegularDashboardConfig = typeof regularDashboardConfig;