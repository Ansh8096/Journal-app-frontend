import AppLayout from "@/layouts/app/AppLayout";

import JournalContentSkeleton from "./JournalContentSkeleton";
import JournalDetailsHeaderSkeleton from "./JournalDetailsHeaderSkeleton";
import JournalGallerySkeleton from "./JournalGallerySkeleton";
import JournalHeroSkeleton from "./JournalHeroSkeleton";
import JournalSidebarSkeleton from "./JournalSidebarSkeleton";

export default function JournalDetailsSkeleton() {
    return (
        <AppLayout>
            <div className="space-y-8">
                <JournalDetailsHeaderSkeleton />

                <JournalHeroSkeleton />

                <div className="grid gap-8 xl:grid-cols-12">
                    <main className="space-y-8 xl:col-span-8">
                        <JournalContentSkeleton />

                        <JournalGallerySkeleton />
                    </main>

                    <aside className="xl:col-span-4">
                        <JournalSidebarSkeleton />
                    </aside>
                </div>
            </div>
        </AppLayout>
    );
}