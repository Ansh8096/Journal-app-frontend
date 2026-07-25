import { EllipsisVertical, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface RecentJournalRowProps {
    journal: any;
}

export default function RecentJournalRow({
    journal,
}: RecentJournalRowProps) {

    const MoodIcon = journal.moodIcon;

    return (
        <div
            className="
                grid
                grid-cols-[56px_1fr_120px_120px_90px_60px]
                items-center
                gap-4
                p-4
                transition-all
                duration-200
                hover:bg-muted/40
            "
        >

            <div className="flex justify-center">
                <MoodIcon className="h-8 w-8 text-primary" />
            </div>

            <div>

                <h3 className="font-semibold">
                    {journal.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {journal.preview}
                </p>

            </div>

            <Badge className={journal.moodColor}>
                {journal.mood}
            </Badge>

            <div className="text-sm">

                <p className="font-medium">
                    {journal.date}
                </p>

                <p className="text-muted-foreground">
                    {journal.time}
                </p>

            </div>

            <img
                src={journal.image}
                alt={journal.title}
                className="h-16 w-16 rounded-lg object-cover shadow-sm"
            />

            <div className="flex items-center justify-end gap-2">

                <Star
                    className={`h-5 w-5 ${
                        journal.favorite
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                    }`}
                />

                <EllipsisVertical className="h-5 w-5 cursor-pointer text-muted-foreground" />

            </div>

        </div>
    );
}