import { Card, CardContent } from "@/components/ui/card";

import QuickActionCard from "./QuickActionCard";
import { regularDashboardConfig } from "./Config";

const QuickActions = () => {
    return (
        <Card>

            <CardContent className="space-y-4 p-6">

                <div>

                    <h2 className="text-2xl font-semibold">
                        Quick Actions
                    </h2>

                    <p className="text-muted-foreground">
                        Jump to the most common tasks.
                    </p>

                </div>

                <div
                    className="
                        grid
                        gap-4
                        md:grid-cols-2
                        xl:grid-cols-4
                    "
                >
                    {regularDashboardConfig.quickActions.items.map((action) => (
                        <QuickActionCard
                            key={action.href}
                            action={action}
                        />
                    ))}
                </div>

            </CardContent>

        </Card>
    );
};

export default QuickActions;