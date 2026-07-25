import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface StatisticCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: LucideIcon;
    iconClassName?: string;
}

export default function StatsCard({
    title,
    value,
    subtitle,
    icon: Icon,
    iconClassName = "text-muted-foreground",
}: StatisticCardProps) {
    return (
        <Card className="h-full transition-shadow hover:shadow-md">

            <CardContent>

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm text-muted-foreground">
                            {title}
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {value}
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {subtitle}
                        </p>

                    </div>

                    <Icon className={`h-8 w-8 ${iconClassName}`} />

                </div>

            </CardContent>

        </Card>
    );
}