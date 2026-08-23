import type { LucideIcon } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface JournalToolbarButtonProps {
    icon: LucideIcon;

    label: string;

    shortcut?: string;

    pressed: boolean;

    disabled?: boolean;

    onPressedChange: () => void;
}

export default function JournalToolbarButton({
    icon: Icon,
    label,
    shortcut,
    pressed,
    disabled = false,
    onPressedChange,
}: JournalToolbarButtonProps) {
    return (
        <TooltipProvider delayDuration={150}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle
                        type="button"
                        size="sm"
                        pressed={pressed}
                        disabled={disabled}
                        aria-label={label}
                        title={shortcut ? `${label} (${shortcut})` : label}
                        onPressedChange={onPressedChange}
                        className="
                            h-9
                            w-9
                            rounded-lg
                            border-0
                            p-0
                            transition-colors
                            hover:bg-muted
                            data-[state=on]:bg-primary
                            data-[state=on]:text-primary-foreground
                        "
                    >
                        <Icon className="h-4 w-4" />
                    </Toggle>
                </TooltipTrigger>

                <TooltipContent side="top">
                    <div className="flex items-center gap-2 text-xs">
                        <span>{label}</span>

                        {shortcut && (
                            <span className="text-muted-foreground">
                                {shortcut}
                            </span>
                        )}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}