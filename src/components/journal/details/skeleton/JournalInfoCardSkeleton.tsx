import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JournalInfoCardSkeleton() {
    return (
        <Card className="rounded-2xl">
            <CardHeader>
                <Skeleton className="h-6 w-36" />
            </CardHeader>

            <CardContent className="space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between"
                    >
                        <Skeleton className="h-4 w-24" />

                        <Skeleton className="h-4 w-28" />
                    </div>
                ))}

                <div className="space-y-3 pt-3">
                    <Skeleton className="h-5 w-20" />

                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-7 w-16 rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}