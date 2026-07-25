import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { firstTimeDashboardConfig } from "./config";
import welcomeIllustration from "@/assets/new-dashboard-welcome-illustrator.png";

export default function WelcomeHero() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <Card className="overflow-hidden rounded-3xl bg-linear-to-r from-background via-background to-muted/20">

            <CardContent
                className="
                    grid
                    items-center
                    gap-4
                    px-8
                    py-5
                    lg:grid-cols-[2fr_0.8fr]
                "
            >

                {/* Left Section */}

                <div className="max-w-2xl">

                    <h1
                        className="
                            text-3xl
                            xl:text-[2.25rem]
                            font-bold
                            leading-tight
                            tracking-tight
                            truncate
                        "
                    >
                        {firstTimeDashboardConfig.hero.title}, {user.username}! 👋
                    </h1>

                    <div className="mt-3 space-y-1">

                        <p className="text-sm text-muted-foreground">
                            {firstTimeDashboardConfig.hero.subtitle}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            {firstTimeDashboardConfig.hero.description}
                        </p>

                    </div>

                    <Button
                        size="default"
                        className="
                            mt-5
                            h-10
                            rounded-xl
                            px-5
                            shadow-sm
                            hover:shadow-md
                            transition-all
                        "
                        asChild
                    >

                        <Link to="/journals/new">

                            <SquarePen className="mr-2 h-4 w-4" />

                            {firstTimeDashboardConfig.hero.buttonText}

                        </Link>

                    </Button>

                </div>

                {/* Right Section */}

                <div className="hidden items-center justify-end lg:flex">

                    <img
                        src={welcomeIllustration}
                        alt="Welcome Illustration"
                        className="
                            h-40
                            w-auto
                            object-contain
                            transition-transform
                            duration-300
                            hover:scale-105
                        "
                    />

                </div>

            </CardContent>

        </Card>
    );
}