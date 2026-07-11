import { Lightbulb } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { motivationCard } from "./Config";

const MotivationCard = () => {
    return (
        <Card>

            <CardHeader>

                <CardTitle className="flex items-center gap-2">

                    <Lightbulb className="h-5 w-5 text-yellow-500" />

                    {motivationCard.title}

                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4 p-6 md:p-8">

                <blockquote className="whitespace-pre-line text-base md:text-lg italic leading-relaxed">

                    "{motivationCard.quote}"

                </blockquote>

                <p className="text-sm leading-relaxed text-muted-foreground">

                    {motivationCard.description}

                </p>

            </CardContent>

        </Card>
    );
};

export default MotivationCard;