import type { Editor } from "@tiptap/react";

export interface ToolbarCommand {
    execute(editor: Editor): void;

    isActive(editor: Editor): boolean;
}

export const toolbarActions: Record<string, ToolbarCommand> = {
    bold: {
        execute: (editor) => {
            editor.chain().focus().toggleBold().run();
        },

        isActive: (editor) => editor.isActive("bold"),
    },

    italic: {
        execute: (editor) => {
            editor.chain().focus().toggleItalic().run();
        },

        isActive: (editor) => editor.isActive("italic"),
    },

    underline: {
        execute: (editor) => {
            editor.chain().focus().toggleUnderline().run();
        },

        isActive: (editor) => editor.isActive("underline"),
    },

    strike: {
        execute: (editor) => {
            editor.chain().focus().toggleStrike().run();
        },

        isActive: (editor) => editor.isActive("strike"),
    },

    bulletList: {
        execute: (editor) => {
            editor.chain().focus().toggleBulletList().run();
        },

        isActive: (editor) =>
            editor.isActive("bulletList"),
    },

    orderedList: {
        execute: (editor) => {
            editor.chain().focus().toggleOrderedList().run();
        },

        isActive: (editor) =>
            editor.isActive("orderedList"),
    },

    blockquote: {
        execute: (editor) => {
            editor.chain().focus().toggleBlockquote().run();
        },

        isActive: (editor) =>
            editor.isActive("blockquote"),
    },
};