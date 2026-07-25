import { Lightbulb } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { regularDashboardConfig } from "./Config";

export default function MotivationCard() {
    const { motivation } = regularDashboardConfig;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />

                    {motivation.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 p-6 md:p-8">
                <blockquote className="whitespace-pre-line text-base italic leading-relaxed md:text-lg">
                    "{motivation.quote}"
                </blockquote>

                <p className="text-sm leading-relaxed text-muted-foreground">
                    {motivation.description}
                </p>
            </CardContent>
        </Card>
    );
}