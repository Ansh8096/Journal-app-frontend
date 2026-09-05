import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuickActionsCardSkeleton() {
    return (
        <Card className="rounded-2xl">
            <CardHeader>
                <Skeleton className="h-6 w-36" />
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-3 gap-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="aspect-square rounded-xl"
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}