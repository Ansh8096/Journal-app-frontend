import {
    Download,
    Loader2,
    MoreHorizontal,
    Pencil,
    Share2,
    Star,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { journalDetailsConfig } from "./JournalDetailsConfig";

import type { JournalResponse } from "@/types/api/journal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface JournalActionBarProps {
    journal: JournalResponse;

    favoriteLoading?: boolean;

    exportLoading?: boolean;

    shareLoading?: boolean;

    onToggleFavorite?: (journal: JournalResponse) => void;

    onEdit?: (journal: JournalResponse) => void;

    onExport?: (journal: JournalResponse) => void;

    onShare?: (journal: JournalResponse) => void;

    onDelete?: (journal: JournalResponse) => void;
}

export default function JournalActionBar({
    journal,
    onToggleFavorite,
    favoriteLoading = false,
    exportLoading = false,
    shareLoading = false,
    onEdit,
    onExport,
    onShare,
    onDelete,
}: JournalActionBarProps) {
    return (
        <div className="flex flex-wrap items-center justify-end gap-2">
            <Button
                variant="outline"
                size="sm"
                disabled={favoriteLoading}
                onClick={() => onToggleFavorite?.(journal)}
            >
                {favoriteLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Star
                        className={`mr-2 h-4 w-4 ${journal.favorite
                                ? "fill-amber-400 text-amber-400 dark:fill-amber-300 dark:text-amber-300"
                                : ""
                            }`}
                    />
                )}
                {journalDetailsConfig.actions.favorite}
            </Button>

            <Button variant="outline" size="sm" onClick={() => onEdit?.(journal)}>
                <Pencil className="mr-2 h-4 w-4" />
                {journalDetailsConfig.actions.edit}
            </Button>

            <Button
                variant="outline"
                size="sm"
                disabled={exportLoading}
                aria-label="Export journal as PDF"
                aria-busy={exportLoading}
                onClick={() => onExport?.(journal)}
            >
                {exportLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Exporting...
                    </>
                ) : (
                    <>
                        <Download className="mr-2 h-4 w-4" />
                        {journalDetailsConfig.actions.export}
                    </>
                )}
            </Button>

            <Button
                variant="outline"
                size="sm"
                disabled={shareLoading}
                aria-label="Share journal"
                aria-busy={shareLoading}
                onClick={() => onShare?.(journal)}
            >
                {shareLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sharing...
                    </>
                ) : (
                    <>
                        <Share2 className="mr-2 h-4 w-4" />
                        {journalDetailsConfig.actions.share}
                    </>
                )}
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="More actions">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem
                        onSelect={() => onDelete?.(journal)}
                        className="
                            text-destructive
                            focus:text-destructive
                            focus:bg-destructive/10
                        "
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {journalDetailsConfig.actions.delete}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
