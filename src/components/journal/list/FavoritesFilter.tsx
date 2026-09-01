import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { journalPageConfig } from "./JournalListConfig";
import { cn } from "@/lib/utils";

interface FavoritesFilterProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

export default function FavoritesFilter({
    checked,
    onCheckedChange,
}: FavoritesFilterProps) {
    return (
        <Button
            type="button"
            variant="outline"
            aria-pressed={checked}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                "h-11 xl:w-auto transition-all duration-200",
                checked
                    ? "border-primary bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                    : "hover:border-primary/40 hover:text-primary",
            )}
        >
            <Star
                className={cn(
                    "mr-2 h-4 w-4 transition-all",
                    checked && "fill-current",
                )}
            />

            {journalPageConfig.actions.favorites}
        </Button>
    );
}