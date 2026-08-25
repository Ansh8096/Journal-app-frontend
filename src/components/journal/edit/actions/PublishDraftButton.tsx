import {
    Send,
} from "lucide-react";

import LoadingSubmitButton from "@/components/common/LoadingSubmitButton";

import {
    cn,
} from "@/lib/utils";


interface PublishDraftButtonProps {

    onClick:
        () => void;

    loading?: boolean;

    disabled?: boolean;

    className?: string;
}


export default function PublishDraftButton({
    onClick,

    loading = false,

    disabled = false,

    className,
}: PublishDraftButtonProps) {

    return (
        <LoadingSubmitButton
            type="button"

            onClick={
                onClick
            }

            loading={
                loading
            }

            loadingText="Publishing Draft..."

            disabled={
                disabled ||
                loading
            }

            className={cn(
                `
                    group
                    rounded-lg!
                    transition-all
                    duration-200
                    hover:scale-[1.02]
                    hover:shadow-sm
                    active:scale-[0.98]
                `,
                className,
            )}
        >

            {!loading && (
                <Send
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                />
            )}

            <span>
                Publish Draft
            </span>

        </LoadingSubmitButton>
    );
}