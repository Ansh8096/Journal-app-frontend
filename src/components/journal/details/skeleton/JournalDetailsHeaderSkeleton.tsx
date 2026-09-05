import { Skeleton } from "@/components/ui/skeleton";

export default function JournalDetailsHeaderSkeleton() {
    return (
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-10 w-40 rounded-lg" />

            <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-10 w-10 rounded-lg"
                    />
                ))}
            </div>
        </header>
    );
}