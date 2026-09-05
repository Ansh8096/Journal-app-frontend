import { Skeleton } from "@/components/ui/skeleton";

export default function JournalHeroSkeleton() {
    return (
        <section className="relative overflow-hidden rounded-2xl border">
            <Skeleton
                className="
                    h-40
                    w-full
                    rounded-2xl
                    sm:h-44
                    md:h-48
                    lg:h-52
                    xl:h-56
                    2xl:h-64
                "
            />

            <Skeleton className="absolute right-5 top-5 h-10 w-36 rounded-lg" />
        </section>
    );
}