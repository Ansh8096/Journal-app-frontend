import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JournalContentSkeleton() {
    return (
        <Card className="rounded-2xl">
            <CardContent className="space-y-6 p-6">
                <Skeleton className="h-10 w-2/3" />

                <Skeleton className="h-6 w-32 rounded-full" />

                <div className="space-y-3">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className={`h-4 ${
                                index === 11
                                    ? "w-2/3"
                                    : "w-full"
                            }`}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}