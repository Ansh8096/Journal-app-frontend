import type { Editor } from "@tiptap/react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ParagraphStyleDropdownProps {
    editor: Editor | null;
}

type ParagraphStyle = "paragraph" | "heading1" | "heading2" | "heading3";

export default function ParagraphStyleDropdown({
    editor,
}: ParagraphStyleDropdownProps) {
    const getCurrentStyle = (): ParagraphStyle => {
        if (!editor) {
            return "paragraph";
        }

        if (editor.isActive("heading", { level: 1 })) {
            return "heading1";
        }

        if (editor.isActive("heading", { level: 2 })) {
            return "heading2";
        }

        if (editor.isActive("heading", { level: 3 })) {
            return "heading3";
        }

        return "paragraph";
    };

    const handleValueChange = (value: ParagraphStyle) => {
        if (!editor) {
            return;
        }

        switch (value) {
            case "paragraph":
                editor.chain().focus().setParagraph().run();
                break;

            case "heading1":
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                break;

            case "heading2":
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                break;

            case "heading3":
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                break;
        }
    };

    return (
        <Select
            value={getCurrentStyle()}
            disabled={!editor}
            onValueChange={(value) =>
                handleValueChange(value as ParagraphStyle)
            }
        >
            <SelectTrigger
                aria-label="Paragraph Style"
                className="
                    h-9
                    w-36
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
                <SelectItem value="paragraph">
                    Paragraph
                </SelectItem>

                <SelectItem value="heading1">
                    Heading 1
                </SelectItem>

                <SelectItem value="heading2">
                    Heading 2
                </SelectItem>

                <SelectItem value="heading3">
                    Heading 3
                </SelectItem>
            </SelectContent>
        </Select>
    );
}