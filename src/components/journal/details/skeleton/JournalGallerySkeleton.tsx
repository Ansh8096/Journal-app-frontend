import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JournalGallerySkeleton() {
    return (
        <section className="space-y-3">
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-48" />

                <Skeleton className="h-5 w-20" />
            </div>

            <Card className="rounded-2xl">
                <CardContent className="flex gap-3 overflow-hidden p-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-24 w-32 rounded-xl"
                        />
                    ))}

                    <Skeleton className="h-24 w-32 rounded-xl border-2 border-dashed" />
                </CardContent>
            </Card>
        </section>
    );
}