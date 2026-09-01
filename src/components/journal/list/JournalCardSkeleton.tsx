import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JournalCardSkeleton() {
    return (
        <Card className="overflow-hidden rounded-2xl border-0 p-0 shadow-sm">
            <div className="relative h-[280px] w-full overflow-hidden">
                {/* Cover Image */}
                <Skeleton className="absolute inset-0 h-full w-full" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                {/* Top Row */}
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
                    <Skeleton className="h-7 w-20 rounded-full bg-white/25 dark:bg-white/15" />

                    <Skeleton className="h-7 w-7 rounded-full bg-white/25 dark:bg-white/15" />
                </div>

                {/* Bottom Content */}
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <Skeleton className="h-5 w-4/5 bg-white/25 dark:bg-white/15" />

                    <Skeleton className="mt-3 h-3 w-full bg-white/20 dark:bg-white/10" />

                    <Skeleton className="mt-2 h-3 w-2/3 bg-white/20 dark:bg-white/10" />

                    <div className="mt-5 flex items-center justify-between">
                        <Skeleton className="h-3 w-24 bg-white/20 dark:bg-white/10" />

                        <div className="flex items-center gap-2">
                            <Skeleton className="h-7 w-14 rounded-full bg-white/20 dark:bg-white/10" />

                            <Skeleton className="h-7 w-7 rounded-full bg-white/20 dark:bg-white/10" />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}