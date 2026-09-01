import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JournalStatsSkeleton() {
    return (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index}>
                    <CardContent className="flex items-center justify-between p-6">
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-28" />

                            <Skeleton className="h-8 w-16" />

                            <Skeleton className="h-4 w-24" />
                        </div>

                        <Skeleton className="h-8 w-8 rounded-full" />
                    </CardContent>
                </Card>
            ))}
        </section>
    );
}