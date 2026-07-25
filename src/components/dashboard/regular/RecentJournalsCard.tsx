import { ArrowRight, CloudRain, Flame, HeartHandshake, Smile, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RecentJournalRow from "./RecentJournalRow";

const moodIcons = {
    HAPPY: Smile,
    GRATEFUL: HeartHandshake,
    FOCUSED: Target,
    STRESSED: CloudRain,
    MOTIVATED: Flame,
    EXCITED: Sparkles,
};

const recentJournals = [
    {
        id: 1,
        title: "A Peaceful Morning",
        preview: "Woke up early today and enjoyed the calm morning. The sunrise was beautiful and set a positive tone for the day.",
        mood: "Happy",
        moodColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        moodIcon: moodIcons.HAPPY, 
        date: "May 20, 2025",
        time: "08:30 AM",
        favorite: false,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300",
    },
    {
        id: 2,
        title: "Productive Day at Work",
        preview: "Completed the project ahead of schedule and learned something new while working with React Query.",
        mood: "Focused",
        moodColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        moodIcon: moodIcons.FOCUSED, 
        date: "May 19, 2025",
        time: "06:45 PM",
        favorite: false,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300",
    },
    {
        id: 3,
        title: "Grateful for the Little Things",
        preview: "Today reminded me how beautiful little things in life are. Grateful for my family and friends.",
        mood: "Grateful",
        moodColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
        moodIcon: moodIcons.GRATEFUL, 
        date: "May 18, 2025",
        time: "09:10 PM",
        favorite: true,
        image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300",
    },
];


export default function RecentJournalsCard() {

    return (
        <Card>

            <CardContent className="p-6">

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-semibold">
                            Recent Journals
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Your latest journal entries.
                        </p>

                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                    >
                        <Link to="/journals">

                            View all

                            <ArrowRight className="ml-2 h-4 w-4" />

                        </Link>

                    </Button>

                </div>

                <div className="divide-y rounded-lg border">

                    {recentJournals.map((journal) => (

                        <RecentJournalRow
                            key={journal.id}
                            journal={journal}
                        />

                    ))}

                </div>

            </CardContent>

        </Card>
    );
}