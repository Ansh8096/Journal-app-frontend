import JournalInfoCardSkeleton from "./JournalInfoCardSkeleton";
import MoodNotesCardSkeleton from "./MoodNotesCardSkeleton";
import QuickActionsCardSkeleton from "./QuickActionsCardSkeleton";

export default function JournalSidebarSkeleton() {
    return (
        <div className="space-y-6">
            <JournalInfoCardSkeleton />

            <MoodNotesCardSkeleton />

            <QuickActionsCardSkeleton />
        </div>
    );
}