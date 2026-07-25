import { Card, CardContent } from "@/components/ui/card";

import WhyJournalingItem from "./WhyJournalingItem";
import { firstTimeDashboardConfig } from "./config";

export default function WhyJournaling() {
    return (
        <Card
            className="
                rounded-3xl
                transition-shadow
                duration-300
                hover:shadow-md
            "
        >
            <CardContent className="p-7">

                {/* Header */}

                <h2 className="mb-8 text-2xl font-bold tracking-tight">
                    Why Journaling?
                </h2>

                {/* Items */}

                <div className="space-y-5">

                    {firstTimeDashboardConfig.whyJournaling.items.map((item) => (
                        <WhyJournalingItem
                            key={item.title}
                            {...item}
                        />
                    ))}

                </div>

            </CardContent>
        </Card>
    );
}