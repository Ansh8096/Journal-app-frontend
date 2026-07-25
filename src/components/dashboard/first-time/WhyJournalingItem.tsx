import type { LucideIcon } from "lucide-react";

interface WhyJournalingItemProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconContainerClassName: string;
    iconClassName: string;
}

export default function WhyJournalingItem({
    title,
    description,
    icon: Icon,
    iconContainerClassName,
    iconClassName,
}: WhyJournalingItemProps) {
    return (
        <div
            className="
                group
                flex
                items-start
                gap-4
                rounded-2xl
                px-2
                py-2
                transition-all
                duration-200
                hover:translate-x-1
                hover:bg-accent/30
            "
        >
            {/* Icon */}

            <div
                className={`
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    transition-transform
                    duration-200
                    group-hover:scale-105
                    ${iconContainerClassName}
                `}
            >
                <Icon
                    className={`
                        h-7
                        w-7
                        ${iconClassName}
                    `}
                />
            </div>

            {/* Content */}

            <div className="space-y-1">

                <h3 className="text-lg font-medium">
                    {title}
                </h3>

                <p className="text-sm leading-5 text-muted-foreground">
                    {description}
                </p>

            </div>

        </div>
    );
}