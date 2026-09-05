import JournalInfoCard from "./JournalInfoCard";

import type { JournalResponse } from "@/types/api/journal";
import MoodNotesCard from "./MoodNotesCard";
import QuickActionsCard from "./QuickActionsCard";

interface JournalSidebarProps {
    journal: JournalResponse;

    editDisabled?: boolean;

    favoriteLoading?: boolean;

    deleteLoading?: boolean;

    onEdit?(): void;

    onToggleFavorite?(): void;

    onDelete?(): void;
}

export default function JournalSidebar({
    journal,
    editDisabled = false,
    favoriteLoading = false,
    deleteLoading = false,
    onEdit = () => { },
    onToggleFavorite = () => { },
    onDelete = () => {},
}: JournalSidebarProps) {
    return (
        <div className="space-y-6">
            <JournalInfoCard journal={journal} />

            <MoodNotesCard journal={journal} />

            <QuickActionsCard
                journal={journal}
                editDisabled={editDisabled}
                favoriteLoading={favoriteLoading}
                deleteLoading={deleteLoading}
                onEdit={onEdit}
                onToggleFavorite={onToggleFavorite}
                onDelete={onDelete}
            />
        </div>
    );
}
