import type { LucideIcon } from "lucide-react";
import type { Mood } from "@/types/common/mood";

import {
AlertTriangle,
BookOpen,
Flame,
Smile,
Star
} from "lucide-react";
import { MOOD_OPTIONS } from "@/constants/journal/journal-details";

/* -------------------------------------------------------------------------- */
/*                              Shared Interfaces                             */
/* -------------------------------------------------------------------------- */

export interface JournalMoodConfig {
    label: string;
    icon: LucideIcon;
    iconClassName: string;
}

/* -------------------------------------------------------------------------- */
/*                               Global Config                                */
/* -------------------------------------------------------------------------- */

export const journalConfig = {
    actions: {
        create: "Create Journal",
        save: "Save Changes",
        cancel: "Cancel",
        edit: "Edit Journal",
        delete: "Delete Journal",

        uploadImages: "Upload Images",
        replaceImage: "Replace Image",
        removeImage: "Remove Image",
        setCover: "Set as Cover",

        favorite: "Add to Favorites",
        unfavorite: "Remove from Favorites",

        backToJournals: "Back to Journals",
    },
} as const;

/* -------------------------------------------------------------------------- */
/*                             Journal List Page                              */
/* -------------------------------------------------------------------------- */

export const journalPageConfig = {
    title: "My Journals",

    description:
        "Browse, search, and organize all your journal entries.",

    actions: {
        createJournal: "Create Journal",
        favorites: "Favorites",
    },

    placeholders: {
        search: "Search journals by title, content, or tags...",
    },

    pagination: {
        pageWindow: 3,
        showCounter: true,
        itemLabel: "journals",
    },


} as const;

/* -------------------------------------------------------------------------- */
/*                              Journal List UI                               */
/* -------------------------------------------------------------------------- */

export const journalListUI = {
    statistics: {
        total: {
            title: "Total Journals",
            subtitle: "All time entries",
            icon: BookOpen,
            iconClassName:
                "text-violet-600 dark:text-violet-400",
        },

        favorites: {
            title: "Favorites",
            subtitle: "Marked as favorite",
            icon: Star,
            iconClassName:
                "text-amber-500 dark:text-amber-400",
        },

        mood: {
            title: "Most Common Mood",
            subtitle: "",
            icon: Smile,
            iconClassName:
                "text-green-600 dark:text-green-400",
        },
        
        streak: {
            title: "Current Streak",
            subtitle: "Days",
            icon: Flame,
            iconClassName:
                "text-orange-500 dark:text-orange-400",
        },
    },
} as const;


/* -------------------------------------------------------------------------- */
/*                               Journal Card                                 */
/* -------------------------------------------------------------------------- */

export const journalCardConfig = {
    content: {
        titleMaxLines: 2,
        previewMaxLines: 2,
    },

    // path: public/images/...
    fallback: {
        coverImage: "/no_image_placeholder_for_journal_card.svg",
    },

    actions: {
        view: "View",
    },
} as const;

/* -------------------------------------------------------------------------- */
/*                               Mood Config                                  */
/* -------------------------------------------------------------------------- */

export const journalMoodConfig = Object.fromEntries(
    MOOD_OPTIONS.map((mood) => [
        mood.value,
        {
            label: mood.label,
            icon: mood.icon,
            iconClassName: mood.colorClass,
        },
    ]),
) as Record<Mood, JournalMoodConfig>;

/* -------------------------------------------------------------------------- */
/*                           Journal Empty State                              */
/* -------------------------------------------------------------------------- */

export const journalEmptyStateConfig = {
    noJournals: {
        title: "You don't have any journals yet",

        description: {
            line1: "Every great journey begins with a single step.",
            line2: "Write your first journal entry and begin your story.",
        },

        actionLabel: "Create Journal",

        actionLink: "/journals/new",

        icon: BookOpen,
    },

    noResults: {
        title: "No matching journals",
        description:
            "Try changing your search or clearing some filters to see more journals.",
        actionLabel: "Clear Filters",
    },

} as const;


export const journalErrorStateConfig = {
    title: "Unable to load your journals",

    description: {
        line1: "Something went wrong while loading your journals.",
        line2: "Please check your connection and try again.",
    },

    actionLabel: "Retry",

    icon: AlertTriangle,

} as const;

