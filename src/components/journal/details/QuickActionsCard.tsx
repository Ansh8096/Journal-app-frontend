import { Edit3, Loader2, Star, Trash2, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { JournalResponse } from "@/types/api/journal";
import { journalDetailsConfig } from "./JournalDetailsConfig";

interface QuickActionsCardProps {
    journal: JournalResponse;

    editDisabled?: boolean;

    favoriteLoading?: boolean;

    deleteLoading?: boolean;

    onEdit?(): void;

    onToggleFavorite?(): void;

    onDelete?(): void;
}

export default function QuickActionsCard({
    journal,
    onEdit,
    editDisabled = false,
    favoriteLoading = false,
    deleteLoading = false,
    onToggleFavorite,
    onDelete,
}: QuickActionsCardProps) {
    return (
        <Card className="rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-md">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-violet-600" />
                    {journalDetailsConfig.sections.quickActions}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-3 gap-3">
                    {/* Edit Button */}
                    <button
                        type="button"
                        aria-label="Edit journal"
                        aria-disabled={editDisabled}
                        disabled={editDisabled}
                        onClick={onEdit}
                        className="
                            group
                            flex
                            aspect-square
                            w-full
                            flex-col
                            items-center
                            justify-center
                            gap-1.5
                            rounded-xl
                            border
                            border-indigo-100
                            bg-indigo-50
                            px-1.5
                            text-xs
                            font-medium
                            text-foreground
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:scale-[1.02]
                            hover:border-indigo-200
                            hover:bg-indigo-100
                            dark:border-indigo-900/50
                            dark:bg-indigo-950/30
                            dark:hover:border-indigo-800/60
                            dark:hover:bg-indigo-900/40
                            hover:shadow-sm
                            active:scale-95
                            disabled:pointer-events-none
                            disabled:opacity-60
                        "
                    >
                        <Edit3 className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-6" />

                        <span className="text-center leading-tight">{journalDetailsConfig.quickActions.edit}</span>
                    </button>

                    {/* Favorite Button */}
                    <button
                        type="button"
                        aria-label={
                            journal.favorite ? "Remove from favorites" : "Add to favorites"
                        }
                        aria-busy={favoriteLoading}
                        disabled={favoriteLoading}
                        onClick={onToggleFavorite}
                        className="
                            group
                            flex
                            aspect-square
                            w-full
                            flex-col
                            items-center
                            justify-center
                            gap-1.5
                            rounded-xl
                            border
                            border-amber-100
                            bg-amber-50
                            px-1.5
                            text-xs
                            font-medium
                            text-foreground
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:scale-[1.02]
                            hover:border-amber-200
                            hover:bg-amber-100
                            dark:border-amber-900/50
                            dark:bg-amber-950/30
                            dark:hover:border-amber-800/60
                            dark:hover:bg-amber-900/40
                            hover:shadow-sm
                            active:scale-95
                            disabled:pointer-events-none
                            disabled:opacity-60
                        "
                    >
                        {favoriteLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                        ) : (
                            <Star
                                className={`
    h-4
    w-4
    text-amber-500
    dark:text-amber-400
    transition-transform
    duration-200
    group-hover:scale-110
    ${
        journal.favorite
            ? "fill-amber-400 dark:fill-amber-300"
            : ""
    }
`}
                            />
                        )}

                        <span className="text-center leading-tight">
                            {journal.favorite ? journalDetailsConfig.quickActions.removeFavorite : journalDetailsConfig.quickActions.addFavorite}
                        </span>
                    </button>

                    {/* Delete Button */}
                    <button
                        type="button"
                        aria-label="Delete journal"
                        aria-busy={deleteLoading}
                        disabled={deleteLoading}
                        onClick={onDelete}
                        className="
                            group
                            flex
                            aspect-square
                            w-full
                            flex-col
                            items-center
                            justify-center
                            gap-1.5
                            rounded-xl
                            border
                            border-red-100
                            bg-red-50
                            text-red-600
                            px-1.5
                            text-xs
                            font-medium
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:scale-[1.02]
                            hover:border-red-200
                            hover:bg-red-100
                            dark:border-red-900/50
                            dark:bg-red-950/30
                            dark:text-red-400
                            dark:hover:border-red-800/60
                            dark:hover:bg-red-900/40
                            hover:shadow-sm
                            active:scale-95
                            disabled:pointer-events-none
                            disabled:opacity-60
                        "
                    >
                        {deleteLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Trash2 className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                        )}

                        <span className="text-center leading-tight">{journalDetailsConfig.quickActions.delete}</span>
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
