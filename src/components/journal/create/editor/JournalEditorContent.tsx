import { EditorContent, type Editor } from "@tiptap/react";
import { createJournalConfig, JOURNAL_EDITOR_CONTENT_CLASS } from "../form/CreateJournalConfig";


interface JournalEditorContentProps {
    editor: Editor | null;
}

export default function JournalEditorContent({
    editor,
}: JournalEditorContentProps) {
    return (
        <div
            className="px-6 py-4"
            style={{
                minHeight: createJournalConfig.editor.minHeight,
            }}
        >
            <EditorContent
                editor={editor}
                className={JOURNAL_EDITOR_CONTENT_CLASS}
            />
        </div>
    );
}