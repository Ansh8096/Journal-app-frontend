import { Fragment } from "react";
import { Card, CardContent } from "@/components/ui/card";
import GettingStartedStep from "./GettingStartedStep";
import { firstTimeDashboardConfig } from "./config";

export default function GettingStarted() {
    return (
        <Card
            className="
                rounded-3xl
                border-orange-200/60
                bg-linear-to-br
                from-orange-50
                via-amber-50/60
                to-orange-50/40
                transition-shadow
                duration-300
                hover:shadow-md
                dark:border-orange-900/40
                dark:from-orange-950/20
                dark:via-amber-950/10
                dark:to-orange-950/10
            "
        >
            <CardContent className="p-4">
                {/* Header */}

                <h2 className=" mb-8 text-2xl font-bold tracking-tight">
                    Getting Started
                </h2>

                {/* Timeline */}

                <div
                    className="
                        grid
                        grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]
                        items-start
                        gap-x-0.5
                    "
                >
                    {firstTimeDashboardConfig.gettingStarted.steps.map((step, index) => (
                        <Fragment key={step.step}>
                            <GettingStartedStep {...step} />

                            {index !== firstTimeDashboardConfig.gettingStarted.steps.length - 1 && (
                                <div
                                    className="
                                        mt-7
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <div
                                        className="
                                            w-11
                                            border-t-2
                                            border-dashed
                                            border-orange-400
                                        "
                                    />
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}