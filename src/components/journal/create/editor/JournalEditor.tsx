import {
    Controller,
    type Control,
    type FieldValues,
    type Path,
} from "react-hook-form";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

import { Card, CardContent } from "@/components/ui/card";

import JournalEditorContent from "./JournalEditorContent";
import JournalEditorFooter from "./JournalEditorFooter";
import JournalEditorToolbar from "./JournalEditorToolbar";

import { createJournalConfig } from "../form/CreateJournalConfig";
import React from "react";


interface JournalEditorProps<
    TFormValues extends FieldValues
> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
}

function EditorField({
    value,
    onChange,
}: {
    value: string;
    onChange(value: string): void;
}) {

    const editor = useEditor({

        extensions: [

            StarterKit,

            Underline,

            Placeholder.configure({
                placeholder:
                    createJournalConfig.editor.placeholder,
            }),

            TextAlign.configure({
                types: [
                    "heading",
                    "paragraph",
                ],
            }),

            Link.configure({

                openOnClick: false,

                autolink: true,

                linkOnPaste: true,

                HTMLAttributes: {

                    rel: "noopener noreferrer",

                    target: "_blank",

                    class:
                        "text-primary underline underline-offset-4",

                },

            }),

        ],

        content: value,

        immediatelyRender: false,

        editorProps: {
            attributes: {
                class:
                    "prose prose-neutral dark:prose-invert max-w-none focus:outline-none",
            },
        },

        onUpdate({
            editor,
        }) {
            onChange(
                editor.getHTML(),
            );
        },

    });

    /**
     * Sync external form updates back
     * into Tiptap.
     */
    React.useEffect(() => {

        if (!editor) {
            return;
        }

        const current =
            editor.getHTML();

        if (current !== value) {

            editor.commands.setContent(value, {
                emitUpdate: false,
            });
        }
        
    }, [
        editor,
        value,
    ]);

    return (
        <>
            <JournalEditorToolbar
                editor={editor}
            />

            <JournalEditorContent
                editor={editor}
            />

            <JournalEditorFooter
                editor={editor}
            />
        </>
    );
}

export default function JournalEditor<
    TFormValues extends FieldValues
>({
    control,
    name,
}: JournalEditorProps<TFormValues>) {

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field,
                fieldState,
            }) => (
                <section className="space-y-3">

                    <Card className="overflow-hidden rounded-2xl">

                        <CardContent className="p-0">

                            <EditorField
                                value={field.value}
                                onChange={field.onChange}
                            />

                        </CardContent>

                    </Card>

                    {fieldState.error && (
                        <p
                            className="
                                text-sm
                                font-medium
                                text-destructive
                            "
                        >
                            {fieldState.error.message}
                        </p>
                    )}

                </section>
            )}
        />
    );
}