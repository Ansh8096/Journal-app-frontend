import type { JournalSummary } from "@/types/api/journal";
import { Card } from "@/components/ui/card";
import { journalCardConfig, journalMoodConfig } from "./JournalListConfig";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import JournalCardFooter from "./JournalCardFooter";

interface JournalCardProps {
    journal: JournalSummary;
    onView?: (journal: JournalSummary) => void;
    onToggleFavorite?: (journal: JournalSummary) => void;
}
export default function JournalCard({
    journal,
    onView,
    onToggleFavorite,
}: JournalCardProps) {
    const mood = journalMoodConfig[journal.mood];
    const MoodIcon = mood.icon;

    return (
        <Card
            className="
                group
                overflow-hidden
                rounded-2xl
                border-0
                p-0
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1.5
                hover:shadow-xl
            "
        >
            <div className="relative h-[280px] w-full overflow-hidden">

                {/* Cover Image */}

                <img
                    src={
                        journal.coverImageUrl ??
                        journalCardConfig.fallback.coverImage
                    }
                    alt={journal.title}
                    loading="lazy"
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />

                {/* Gradient */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                {/* Top Overlay */}

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">

                    <Badge
                        className="
                            gap-1
                            rounded-full
                            border-0
                            bg-black/35
                            px-2.5
                            py-1
                            text-[11px]
                            font-medium
                            text-white
                            shadow-none
                            backdrop-blur-sm
                        "
                    >
                        <MoodIcon className={cn("h-3.5 w-3.5", mood.iconClassName)} />
                        {mood.label}
                    </Badge>

                    <Button
                        size="icon"
                        variant="secondary"
                        aria-label={
                            journal.favorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }
                        aria-pressed={journal.favorite}
                        className="
                            h-7
                            w-7
                            rounded-full
                            border-0
                            bg-black/35
                            text-white
                            backdrop-blur-sm
                            transition-colors
                            hover:bg-black/55
                        "
                        onClick={() => onToggleFavorite?.(journal)}
                    >
                        <Star
                            className={`h-3.5 w-3.5 ${journal.favorite
                                    ? "fill-yellow-500 text-yellow-500 dark:fill-yellow-400 dark:text-yellow-400"
                                    : ""
                                }
                            `}
                        />
                    </Button>

                </div>

                {/* Bottom Content */}

                <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                    <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug">
                        {journal.title}
                    </h3>

                    <JournalCardFooter
                        journal={journal}
                        onView={onView}
                    />
                </div>

            </div>
        </Card>
    );
}