import JournalCardSkeleton from "./JournalCardSkeleton";

const SKELETON_CARD_COUNT = 8;

export default function JournalGridSkeleton() {
    return (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
                <JournalCardSkeleton
                    key={`journal-skeleton-${index}`}
                />
            ))}
        </section>
    );
}