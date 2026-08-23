import {
    journalConstants,
} from "@/constants/journal/journal-constants";


interface ImageCounterProps {
    count: number;

    maxCount?: number;
}


export default function ImageCounter({
    count,
    maxCount =
        journalConstants.images.constraints
            .maxImagesPerUpload,
}: ImageCounterProps) {

    return (
        <span
            className="
                text-xs
                font-medium
                text-muted-foreground
            "
        >
            {count} / {maxCount}
        </span>
    );
}