import { useState } from "react";

import type { Editor } from "@tiptap/react";

import { Separator } from "@/components/ui/separator";

import { createJournalConfig } from "../form/CreateJournalConfig";

import JournalToolbarButton from "./toolbar/JournalToolbarButton";
import ParagraphStyleDropdown from "./toolbar/ParagraphStyleDropdown";
import LinkDialog from "./toolbar/LinkDialog";
import { toolbarActions } from "@/lib/editor/toolbar-actions";
import AlignmentDropdown from "./toolbar/AlignmentDropdown";

interface JournalEditorToolbarProps {
    editor: Editor | null;
}

export default function JournalEditorToolbar({
    editor,
}: JournalEditorToolbarProps) {
    const [isLinkDialogOpen, setIsLinkDialogOpen] =
        useState(false);

    const isDisabled = !editor;

    return (
        <>
            <div
                className="
                    flex
                    flex-nowrap
                    items-center
                    gap-1
                    overflow-x-auto
                    border-b
                    bg-card
                    px-3
                    py-2
                "
            >
                {createJournalConfig.editor.toolbar.map(
                    (group, groupIndex) => (
                        <div
                            key={groupIndex}
                            className="flex shrink-0 items-center gap-0.5"
                        >
                            {group.map((action) => {
                                if (action.type === "select") {
                                    switch (action.id) {
                                        case "paragraph":
                                            return (
                                                <ParagraphStyleDropdown
                                                    key={action.id}
                                                    editor={editor}
                                                />
                                            );
                                        
                                        case "alignment":
                                            return (
                                                <AlignmentDropdown
                                                    key={action.id}
                                                    editor={editor}
                                                />
                                            );
                                    }
                                }

                                return (
                                    <JournalToolbarButton
                                        key={action.id}
                                        icon={action.icon}
                                        label={
                                            action.label
                                        }
                                        shortcut={
                                            action.shortcut
                                        }
                                        pressed={
                                            action.id === "link"
                                                ? editor?.isActive("link") ?? false
                                                : editor
                                                    ? toolbarActions[action.id]?.isActive(editor) ??
                                                        false
                                                    :   false
                                        }
                                        disabled={
                                            isDisabled
                                        }
                                        onPressedChange={() => {
                                            if (!editor) {
                                                return;
                                            }
                                        
                                            if (action.id === "link") {
                                                setIsLinkDialogOpen(true);
                                                return;
                                            }
                                        
                                            toolbarActions[action.id]?.execute(editor);
                                        }}
                                    />
                                );
                            })}

                            {groupIndex <
                                createJournalConfig
                                    .editor.toolbar
                                    .length -
                                    1 && (
                                <Separator
                                    orientation="vertical"
                                    className="mx-1 h-6 shrink-0"
                                />
                            )}
                        </div>
                    )
                )}
            </div>

            <LinkDialog
                editor={editor}
                open={isLinkDialogOpen}
                onOpenChange={
                    setIsLinkDialogOpen
                }
            />
        </>
    );
}