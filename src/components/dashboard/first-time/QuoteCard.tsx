import { Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { firstTimeDashboardConfig } from "./config"

export default function QuoteCard() {
    return (
        <Card
            className="
                overflow-hidden
                rounded-2xl
                border
                border-violet-200/70
                bg-linear-to-br
                from-violet-100
                via-violet-50/60
                to-fuchsia-50/40
                transition-shadow
                duration-300
                hover:shadow-lg
                hover:shadow-violet-200/50
                dark:border-violet-900/50
                dark:from-violet-950/40
                dark:via-violet-950/10
                dark:to-fuchsia-950/10
            "
        >
            <CardContent
                className="
                    grid
                    items-center
                    gap-4
                    px-8
                    py-5
                    lg:grid-cols-[1.6fr_0.8fr]
                "
            >
                {/* Left Section */}

                <div>

                    {/* Quote Icon */}

                    <div
                        className="
                            mb-3
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-violet-500/15
                        "
                    >
                        <Quote
                            className="
                                h-4.5
                                w-4.5
                                stroke-[2.5]
                                text-violet-600
                                dark:text-violet-400
                            "
                        />
                    </div>

                    {/* Quote */}

                    <blockquote
                        className="
                            max-w-auto
                            text-lg
                            font-medium
                            italic
                            leading-snug
                            tracking-tight
                            text-violet-950
                            xl:text-xl
                            dark:text-violet-50
                        "
                    >
                        “{firstTimeDashboardConfig.quote.quote}”
                    </blockquote>

                    {/* Author */}

                    <p
                        className="
                            mt-3
                            text-sm
                            font-medium
                            text-violet-600/70
                            dark:text-violet-400/80
                        "
                    >
                        — {firstTimeDashboardConfig.quote.author}
                    </p>

                </div>

                {/* Illustration */}

                <div
                    className="
                        relative
                        hidden
                        items-center
                        justify-end
                        lg:flex
                    "
                >
                    <div
                        className="
                            absolute
                            right-4
                            h-16
                            w-16
                            rounded-full
                            bg-violet-300/40
                            blur-2xl
                            dark:bg-violet-700/30
                        "
                    />
                    <img
                        src={firstTimeDashboardConfig.quote.illustration}
                        alt="Quote Illustration"
                        className="
                            relative
                            h-23
                            w-auto
                            object-contain
                            drop-shadow-sm
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:scale-105
                        "
                    />
                </div>

            </CardContent>
        </Card>
    );
}