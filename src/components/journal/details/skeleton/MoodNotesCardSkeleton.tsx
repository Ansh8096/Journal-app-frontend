import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MoodNotesCardSkeleton() {
    return (
        <Card className="rounded-2xl">
            <CardHeader>
                <Skeleton className="h-6 w-32" />
            </CardHeader>

            <CardContent className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className={`h-4 ${
                            index === 2
                                ? "w-3/4"
                                : "w-full"
                        }`}
                    />
                ))}
            </CardContent>
        </Card>
    );
}