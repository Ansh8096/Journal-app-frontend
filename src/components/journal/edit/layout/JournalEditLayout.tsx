import type {
    ReactNode,
} from "react";


interface JournalEditLayoutProps {

    /**
     * Page heading.
     */
    title: string;


    /**
     * Page description.
     */
    description: string;


    /**
     * Main editor content.
     *
     * This is normally the left column.
     */
    children: ReactNode;


    /**
     * Right-side content.
     *
     * This will normally contain:
     *
     * - JournalDetailsCard
     * - WeatherCard
     * - WritingTipCard
     */
    sidebar: ReactNode;
}


export default function JournalEditLayout({
    title,
    description,
    children,
    sidebar,
}: JournalEditLayoutProps) {

    return (
        <div className="space-y-8">

            {/* ----------------------------------------------------------------
                PAGE HEADER
            ----------------------------------------------------------------- */}

            <section className="space-y-2">

                <h1 className="text-3xl font-bold tracking-tight">
                    {title}
                </h1>

                <p className="text-md text-muted-foreground">
                    {description}
                </p>

            </section>


            {/* ----------------------------------------------------------------
                PAGE CONTENT
            ----------------------------------------------------------------- */}

            <section className="grid gap-8 xl:grid-cols-12">

                {/* ----------------------------------------------------------------
                    LEFT COLUMN
                ----------------------------------------------------------------- */}

                <main className="xl:col-span-8">

                    {children}

                </main>


                {/* ----------------------------------------------------------------
                    RIGHT COLUMN
                ----------------------------------------------------------------- */}

                <aside className="space-y-6 xl:col-span-4">

                    {sidebar}

                </aside>

            </section>

        </div>
    );
}