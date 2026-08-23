import { Button } from "@/components/ui/button";

interface ImageUploadButtonProps {
    disabled?: boolean;
    onClick: () => void;
}

export default function ImageUploadButton({
    disabled = false,
    onClick,
}: ImageUploadButtonProps) {
    return (
        <Button
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-label="Choose images to upload"
            className="
                h-8
                min-w-[112px]
                rounded-full
                px-5
                text-sm
                font-semibold
                shadow-sm
                transition-all
                duration-200
                hover:shadow-md
                active:scale-95
            "
        >
            Choose Files
        </Button>
    );
}