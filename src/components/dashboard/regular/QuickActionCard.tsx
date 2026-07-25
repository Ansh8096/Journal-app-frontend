import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

import type { QuickAction } from "./Config"

interface QuickActionCardProps {
    action: QuickAction;
}

export default function QuickActionCard({
    action,
}: QuickActionCardProps) {
    const Icon = action.icon;

    return (
        <Link to={action.href}>
            <Card
                className="
                    h-full
                    cursor-pointer
                    transition-all
                    duration-200
                    ease-in-out
                    hover:-translate-y-1
                    hover:border-primary/20
                    hover:shadow-md
                    focus-within:ring-2
                    focus-within:ring-primary
                "
            >
                <CardContent
                    className="
                        flex
                        flex-col
                        items-center
                        p-6
                        text-center
                    "
                >
                    <Icon className="mb-3 h-8 w-8 text-primary" />

                    <h3 className="font-semibold">
                        {action.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                        {action.description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}