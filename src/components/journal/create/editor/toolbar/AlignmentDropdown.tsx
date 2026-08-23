import type { Editor } from "@tiptap/react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AlignmentDropdownProps {
    editor: Editor | null;
}

type TextAlignment =
    | "left"
    | "center"
    | "right"
    | "justify";

export default function AlignmentDropdown({
    editor,
}: AlignmentDropdownProps) {
    const getCurrentAlignment = (): TextAlignment => {
        if (!editor) {
            return "left";
        }

        if (editor.isActive({ textAlign: "center" })) {
            return "center";
        }

        if (editor.isActive({ textAlign: "right" })) {
            return "right";
        }

        if (editor.isActive({ textAlign: "justify" })) {
            return "justify";
        }

        return "left";
    };

    const handleValueChange = (
        value: TextAlignment
    ) => {
        if (!editor) {
            return;
        }

        editor
            .chain()
            .focus()
            .setTextAlign(value)
            .run();
    };

    return (
        <Select
            value={getCurrentAlignment()}
            disabled={!editor}
            onValueChange={(value) =>
                handleValueChange(
                    value as TextAlignment
                )
            }
        >
            <SelectTrigger
                aria-label="Text Alignment"
                className="
                    h-9
                    min-w-[8.5rem]
                    rounded-lg
                    border-0
                    bg-transparent
                    shadow-none
                    transition-colors
                    hover:bg-muted
                    focus:ring-0
                "
            >
                <SelectValue />
            </SelectTrigger>

            <SelectContent className="rounded-xl">
                <SelectItem value="left">
                    Left
                </SelectItem>

                <SelectItem value="center">
                    Center
                </SelectItem>

                <SelectItem value="right">
                    Right
                </SelectItem>

                <SelectItem value="justify">
                    Justify
                </SelectItem>
            </SelectContent>
        </Select>
    );
}