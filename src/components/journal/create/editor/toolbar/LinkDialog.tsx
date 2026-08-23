import { useEffect, useState } from "react";

import type { Editor } from "@tiptap/react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LinkDialogProps {
    editor: Editor | null;

    open: boolean;

    onOpenChange: (open: boolean) => void;
}

export default function LinkDialog({
    editor,
    open,
    onOpenChange,
}: LinkDialogProps) {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (!open || !editor) {
            return;
        }

        const currentUrl =
            editor.getAttributes("link").href ?? "";

        setUrl(currentUrl);
    }, [editor, open]);

    const handleSave = () => {
        if (!editor) {
            return;
        }

        const trimmedUrl = url.trim();

        if (!trimmedUrl) {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .unsetLink()
                .run();
        } else {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({
                    href: trimmedUrl,
                })
                .run();
        }

        onOpenChange(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Insert Link
                    </DialogTitle>

                    <DialogDescription>
                        Add or edit a hyperlink for the selected
                        text.
                    </DialogDescription>
                </DialogHeader>

                <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(event) =>
                        setUrl(event.target.value)
                    }
                    autoFocus
                />

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}