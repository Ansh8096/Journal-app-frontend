import * as React from "react";

import { Hash } from "lucide-react";

import { TagChip } from "./TagChip";

import {
    journalDetailsConstants,
} from "@/constants/journal/journal-details";

import { cn } from "@/lib/utils";

import {
    validateTag,
} from "@/lib/validation/TagValidation";


export interface TagsInputProps {

    value: string[];

    onChange: (
        tags: string[],
    ) => void;

    disabled?: boolean;

    error?: string;

    className?: string;
}


export function TagsInput({
    value,
    onChange,
    disabled = false,
    error,
    className,
}: TagsInputProps) {

    const [
        inputValue,
        setInputValue,
    ] = React.useState("");


    const [
        validationError,
        setValidationError,
    ] = React.useState<
        string | undefined
    >(undefined);


    const inputRef =
        React.useRef<
            HTMLInputElement
        >(null);


    /**
     * --------------------------------
     * DISPLAYED ERROR
     * --------------------------------
     *
     * Local validation errors take
     * priority over RHF errors.
     */

    const displayedError =
        validationError ?? error;


    /**
     * --------------------------------
     * REMOVE TAG
     * --------------------------------
     */

    const handleRemoveTag =
        React.useCallback(
            (
                tagToRemove: string,
            ) => {

                onChange(
                    value.filter(
                        (tag) =>
                            tag !==
                            tagToRemove,
                    ),
                );

            },
            [
                onChange,
                value,
            ],
        );


    /**
     * --------------------------------
     * ADD TAG
     * --------------------------------
     */

    const handleAddTag =
        React.useCallback(
            () => {

                const result =
                    validateTag(
                        inputValue,
                        value,
                    );


                /**
                 * Invalid tag
                 */
                if (!result.valid) {

                    setValidationError(
                        result.message,
                    );

                    return;
                }


                /**
                 * Clear previous error.
                 */
                setValidationError(
                    undefined,
                );


                /**
                 * Add validated tag.
                 */
                onChange([
                    ...value,
                    result.tag!,
                ]);


                /**
                 * Clear input.
                 */
                setInputValue("");


                /**
                 * Keep focus in the
                 * input for quick entry.
                 */
                inputRef.current?.focus();

            },
            [
                inputValue,
                onChange,
                value,
            ],
        );


    /**
     * --------------------------------
     * KEYBOARD HANDLING
     * --------------------------------
     */

    const handleKeyDown =
        React.useCallback(
            (
                event:
                    React.KeyboardEvent<
                        HTMLInputElement
                    >,
            ) => {

                const {
                    key,
                } = event;


                /**
                 * Remove last tag with
                 * Backspace when input
                 * is empty.
                 */
                if (
                    key ===
                    "Backspace"
                ) {

                    if (
                        inputValue ===
                            "" &&
                        value.length >
                            0
                    ) {

                        event.preventDefault();

                        onChange(
                            value.slice(
                                0,
                                -1,
                            ),
                        );

                    }

                    return;
                }


                /**
                 * Supported tag separators.
                 */
                const shouldAddTag =
                    key === "Enter" ||
                    key === "," ||
                    key === "Tab";


                if (
                    !shouldAddTag
                ) {
                    return;
                }


                event.preventDefault();

                handleAddTag();

            },
            [
                handleAddTag,
                inputValue,
                onChange,
                value,
            ],
        );


    /**
     * --------------------------------
     * RENDER
     * --------------------------------
     */

    return (
        <section
            aria-labelledby="journal-tags-heading"
            aria-describedby={
                displayedError
                    ? "journal-tags-error"
                    : undefined
            }
            className={cn(
                "space-y-4",
                className,
            )}
        >

            <div className="space-y-1">

                <h3
                    id="journal-tags-heading"
                    className="text-sm font-semibold text-foreground"
                >
                    {
                        journalDetailsConstants
                            .tags
                            .label
                    }
                </h3>

            </div>


            <div
                role="group"
                aria-label={
                    journalDetailsConstants
                        .tags
                        .label
                }
                aria-disabled={
                    disabled
                }
                className={cn(
                    "flex min-h-12 w-full flex-wrap items-center gap-2",
                    "rounded-xl border bg-background px-3 py-2",
                    "transition-all duration-200",
                    "focus-within:border-primary",
                    "focus-within:ring-2",
                    "focus-within:ring-primary/20",
                    displayedError &&
                        "border-destructive",
                    disabled &&
                        "cursor-not-allowed opacity-60",
                )}
                onClick={() => {

                    if (!disabled) {
                        inputRef.current?.focus();
                    }

                }}
            >

                {value.length === 0 && (
                    <div
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        aria-live="polite"
                    >

                        <Hash
                            className="h-4 w-4"
                            aria-hidden="true"
                        />

                        <span>
                            No tags added yet.
                        </span>

                    </div>
                )}


                {value.map(
                    (tag) => (
                        <TagChip
                            key={tag}
                            tag={tag}
                            disabled={
                                disabled
                            }
                            onRemove={
                                handleRemoveTag
                            }
                        />
                    ),
                )}


                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    disabled={disabled}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder={
                        journalDetailsConstants
                            .tags
                            .placeholder
                    }
                    aria-label="Add a new tag"
                    aria-invalid={
                        Boolean(
                            displayedError,
                        )
                    }
                    aria-disabled={
                        disabled
                    }
                    onChange={(event) => {

                        setInputValue(
                            event.target.value,
                        );


                        if (
                            validationError
                        ) {

                            setValidationError(
                                undefined,
                            );

                        }

                    }}
                    onKeyDown={
                        handleKeyDown
                    }
                    className={cn(
                        "min-w-[140px] flex-1",
                        "bg-transparent",
                        "text-sm text-foreground",
                        "placeholder:text-muted-foreground",
                        "outline-none",
                        "disabled:cursor-not-allowed",
                        "disabled:opacity-70",
                    )}
                />

            </div>


            <p className="text-xs text-muted-foreground">

                Press{" "}

                <kbd className="rounded border px-1 py-0.5 text-[11px]">
                    Enter
                </kbd>{" "}

                <kbd className="rounded border px-1 py-0.5 text-[11px]">
                    ,
                </kbd>{" "}

                or{" "}

                <kbd className="rounded border px-1 py-0.5 text-[11px]">
                    Tab
                </kbd>{" "}

                to add a tag.

            </p>


            {displayedError && (
                <p
                    id="journal-tags-error"
                    className="text-sm text-destructive"
                    role="alert"
                >
                    {displayedError}
                </p>
            )}

        </section>
    );
}


export default React.memo(
    TagsInput,
);