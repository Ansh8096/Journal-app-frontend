import type { Editor } from "@tiptap/react";

interface JournalEditorFooterProps {
    editor: Editor | null;
}

export default function JournalEditorFooter({
    editor,
}: JournalEditorFooterProps) {
    const text = editor?.getText().trim() ?? "";

    const wordCount =
        text.length === 0 ? 0 : text.split(/\s+/).length;

    return (
        <footer className="flex items-center justify-end border-t bg-muted/20 px-6 py-2">
            <span className="text-xs text-muted-foreground">
                {wordCount} {wordCount === 1 ? "word" : "words"}
            </span>
        </footer>
    );
}