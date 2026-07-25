import type { LucideIcon } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateCardProps {
    title: string;
    description: React.ReactNode;
    buttonText: string;
    buttonLink: string;
    icon: LucideIcon;
}

export default function EmptyStateCard({
    title,
    description,
    buttonText,
    buttonLink,
    icon: Icon,
}: EmptyStateCardProps) {
    return (
        <Card className="
        rounded-3xl
        animate-in
        fade-in
        duration-500
    ">

            <CardContent className="flex flex-col items-center px-6 py-7 text-center">

                {/* Icon */}

                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 transition-transform
        duration-300
        group-hover:scale-105">
                    <Icon className="h-7 w-7 text-violet-600 dark:text-violet-600" />
                </div>
                {/* Heading */}

                <h2 className="text-2xl font-semibold tracking-tight">
                    {title}
                </h2>

                {/* Description */}

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    {description}
                </p>

                {/* CTA */}

                <Button
                    className="mt-4 h-10 rounded-xl px-6"
                    asChild
                >
                    <Link to={buttonLink}>

                        <SquarePen className="mr-2 h-4 w-4" />

                        {buttonText}

                    </Link>
                </Button>

            </CardContent>

        </Card>
    );
}