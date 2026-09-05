import type { LucideIcon } from "lucide-react";
import type { Mood } from "@/types/common/mood";
import type { JournalResponse } from "@/types/api/journal";

import {
    AlertTriangle,
    Angry,
    Frown,
    Heart,
    Leaf,
    Meh,
    Smile,
    Sparkles,
    TriangleAlert,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                Page Config                                 */
/* -------------------------------------------------------------------------- */

export const journalDetailsConfig = {
    navigation: {
        back: "Back to My Journals",
    },

    hero: {
        changeCover: "Change Cover",

        fallbackImageUrl: "/no-cover-image.png",
    },

    actions: {
        favorite: "Mark as Favorite",
        edit: "Edit",
        export: "Export",
        share: "Share",
        delete: "Delete Journal",
    },

    toast: {
        favoriteAdded: {
            title: "Added to favorites",
            description: "This journal has been added to your favorites.",
        },

        favoriteRemoved: {
            title: "Removed from favorites",
            description: "This journal has been removed from your favorites.",
        },

        favoriteError: {
            title: "Unable to update favorite",
            description: "Please try again in a moment.",
        },

        exportSuccess: {
            title: "Download started",
            description: "Your journal PDF is being downloaded.",
        },

        exportError: {
            title: "Unable to download journal",
            description: "Please try again in a moment.",
        },

        shareCopied: {
            title: "Link copied",
            description: "The journal link has been copied to your clipboard.",
        },

        shareUnsupported: {
            title: "Sharing not supported",
            description: "Your browser doesn't support sharing this journal.",
        },

        shareError: {
            title: "Unable to share journal",
            description: "Please try again in a moment.",
        },

        deleteSuccess: {
            title: "Journal deleted",
            description: "The journal has been deleted successfully.",
        },

        deleteError: {
            title: "Unable to delete journal",
            description: "Please try again in a moment.",
        },

        coverUpdated: {
            title: "Cover image updated",
            description: "Your journal cover has been updated successfully.",
        },

        coverUpdateError: {
            title: "Unable to update cover",
            description: "Please try again in a moment.",
        },

        uploadSuccess: {
            title: "Images uploaded",
            description: "Your images have been uploaded successfully.",
        },
    
        uploadError: {
            title: "Unable to upload images",
            description: "Please try again in a moment.",
        },

        imageDeleteSuccess: {
            title: "Image deleted",
            description:
                "The image has been removed successfully.",
        },

        imageDeleteError: {
            title: "Unable to delete image",
            description:
                "Something went wrong while deleting the image.",
        },
    },

    dialog: {
        delete: {
            title: "Delete Journal",
            description: {
                beforeTitle: "Are you sure you want to delete",
                afterTitle: "?",
                warning: "This action cannot be undone.",
            },
            confirm: "Delete Journal",
            pending: "Deleting...",
            cancel: "Cancel",
        },
    },

    emptyState: {
        journalContent: {
            title: "Nothing written yet",

            description:
            "This journal doesn't contain any written content yet.",
        },
    },

    sections: {
        journal: "My Journal",
        gallery: "Attached Images",
        info: "Journal Info",
        moodNotes: "Mood Notes",
        quickActions: "Quick Actions",
    },

    quickActions: {
        edit: "Edit",
        delete: "Delete Journal",
        addFavorite: "Add Favorite",
        removeFavorite: "Remove Favorite"
    },
} as const;

/* -------------------------------------------------------------------------- */
/*                                Mood Config                                 */
/* -------------------------------------------------------------------------- */

export interface MoodConfig {
    label: string;
    icon: LucideIcon;
    badgeColor: string;
    iconColor: string;
}

export const moodConfig: Record<Mood, MoodConfig> = {
    HAPPY: {
        label: "Happy",
        icon: Smile,
        badgeColor: "bg-emerald-500/90",
        iconColor:
            "text-emerald-500 dark:text-emerald-400",
    },

    SAD: {
        label: "Sad",
        icon: Frown,
        badgeColor: "bg-blue-500/90",
        iconColor:
            "text-blue-500 dark:text-blue-400",
    },

    ANGRY: {
        label: "Angry",
        icon: Angry,
        badgeColor: "bg-red-500/90",
        iconColor:
            "text-red-500 dark:text-red-400",
    },

    ANXIOUS: {
        label: "Anxious",
        icon: TriangleAlert,
        badgeColor: "bg-orange-500/90",
        iconColor:
            "text-orange-500 dark:text-orange-400",
    },

    CALM: {
        label: "Calm",
        icon: Leaf,
        badgeColor: "bg-teal-500/90",
        iconColor:
            "text-teal-500 dark:text-teal-400",
    },

    EXCITED: {
        label: "Excited",
        icon: Sparkles,
        badgeColor: "bg-amber-500/90",
        iconColor:
            "text-amber-500 dark:text-amber-400",
    },

    STRESSED: {
        label: "Stressed",
        icon: TriangleAlert,
        badgeColor: "bg-rose-500/90",
        iconColor:
            "text-rose-500 dark:text-rose-400",
    },

    GRATEFUL: {
        label: "Grateful",
        icon: Heart,
        badgeColor: "bg-pink-500/90",
        iconColor:
            "text-pink-500 dark:text-pink-400",
    },

    NEUTRAL: {
        label: "Neutral",
        icon: Meh,
        badgeColor: "bg-slate-500/90",
        iconColor:
            "text-slate-500 dark:text-slate-400",
    },
};

/* -------------------------------------------------------------------------- */
/*                              Mood Badge Styles                             */
/* -------------------------------------------------------------------------- */

export const moodBadgeStyles: Record<
    JournalResponse["mood"],
    {
        bg: string;
        text: string;
    }
> = {
    HAPPY: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-400",
    },

    EXCITED: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-700 dark:text-orange-400",
    },

    CALM: {
        bg: "bg-sky-100 dark:bg-sky-900/30",
        text: "text-sky-700 dark:text-sky-400",
    },

    GRATEFUL: {
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
        text: "text-emerald-700 dark:text-emerald-400",
    },

    STRESSED: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-700 dark:text-red-400",
    },

    SAD: {
        bg: "bg-indigo-100 dark:bg-indigo-900/30",
        text: "text-indigo-700 dark:text-indigo-400",
    },

    ANGRY: {
        bg: "bg-rose-100 dark:bg-rose-900/30",
        text: "text-rose-700 dark:text-rose-400",
    },

    ANXIOUS: {
        bg: "bg-violet-100 dark:bg-violet-900/30",
        text: "text-violet-700 dark:text-violet-400",
    },

    NEUTRAL: {
        bg: "bg-slate-100 dark:bg-slate-800/60",
        text: "text-slate-700 dark:text-slate-300",
    },
};

export const journalErrorStateConfig = {
    title: "Journal not found",

    description: "The journal you're looking for doesn't exist or may have been deleted.",

    actionLabel: "Back to Journals",

    icon: AlertTriangle,

} as const;