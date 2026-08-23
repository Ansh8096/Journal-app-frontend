import { ImagePlus } from "lucide-react";

interface AddMoreImageCardProps {
    disabled?: boolean;
    onClick: () => void;
}

export default function AddMoreImageCard({
    disabled = false,
    onClick,
}: AddMoreImageCardProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-label="Add more journal images"
            className="
                group
                flex
                aspect-square
                w-full
                min-w-0
                flex-col
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                border-border
                bg-muted/20
                px-3
                text-center
                transition-all
                duration-200

                hover:border-primary
                hover:bg-primary/5
                hover:shadow-sm

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2

                active:scale-[0.98]

                disabled:pointer-events-none
                disabled:opacity-50
            "
        >
            <ImagePlus
                aria-hidden="true"
                className="
                    h-7
                    w-7
                    text-muted-foreground
                    transition-colors
                    duration-200

                    group-hover:text-primary

                    sm:h-8
                    sm:w-8
                "
            />

            <span
                className="
                    mt-2
                    text-xs
                    font-medium
                    text-muted-foreground

                    sm:mt-3
                    sm:text-sm
                "
            >
                Add More
            </span>
        </button>
    );
}