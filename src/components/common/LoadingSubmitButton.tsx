import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

type LoadingSubmitButtonProps = ComponentProps<typeof Button> & {
    loading: boolean;
    loadingText?: string;
};

export default function LoadingSubmitButton({
    loading,
    loadingText = "Saving...",
    children,
    disabled,
    ...props
}: LoadingSubmitButtonProps) {
    return (
        <Button
            disabled={loading || disabled}
            {...props}
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {loadingText}
                </>
            ) : (
                children
            )}
        </Button>
    );
}