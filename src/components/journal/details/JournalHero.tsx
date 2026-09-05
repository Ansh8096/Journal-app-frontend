import { useEffect, useState } from "react";
import { ImageIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { JournalResponse } from "@/types/api/journal";
import { journalDetailsConfig } from "./JournalDetailsConfig";

interface JournalHeroProps {
    journal: JournalResponse;

    canChangeCover?: boolean;

    coverLoading?: boolean;

    onChangeCover?: () => void;
}

export default function JournalHero({
    journal,
    canChangeCover = true,
    coverLoading = false,
    onChangeCover,
}: JournalHeroProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(
        journal.coverImageUrl ??
            journalDetailsConfig.hero.fallbackImageUrl,
    );

    useEffect(() => {
        setImageSrc(
            journal.coverImageUrl ??
                journalDetailsConfig.hero.fallbackImageUrl,
        );
    }, [journal.coverImageUrl]);

    const handleImageError = () => {
        if (
            imageSrc !==
            journalDetailsConfig.hero.fallbackImageUrl
        ) {
            setImageSrc(
                journalDetailsConfig.hero.fallbackImageUrl,
            );

            return;
        }

        setImageSrc(null);
    };

    return (
        <section className="relative overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div
                className="
                    relative
                    h-40
                    sm:h-44
                    md:h-48
                    lg:h-52
                    xl:h-56
                    2xl:h-64
                "
            >
                <div className="relative h-full w-full overflow-hidden bg-muted">
                    {coverLoading && (
                        <div
                            className="
                                absolute
                                inset-0
                                z-10
                                flex
                                items-center
                                justify-center
                                bg-black/40
                                backdrop-blur-[2px]
                            "
                        >
                            <div className="flex flex-col items-center gap-3 text-white">
                                <Loader2 className="h-8 w-8 animate-spin" />

                                <span className="text-sm font-medium">
                                    Updating cover...
                                </span>
                            </div>
                        </div>
                    )}

                    {imageSrc ? (
                        <div
                            key={imageSrc}
                            className="
                                h-full
                                w-full
                                animate-in
                                fade-in
                                duration-500
                            "
                        >
                            <img
                                src={imageSrc}
                                alt={`${journal.title} cover image`}
                                draggable={false}
                                loading="eager"
                                decoding="async"
                                fetchPriority="high"
                                onError={handleImageError}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ) : (
                        <div
                            className="
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center
                                bg-muted
                            "
                        >
                            <div className="flex flex-col items-center gap-3">
                                <ImageIcon className="h-14 w-14 text-muted-foreground/40" />

                                <span className="text-sm text-muted-foreground">
                                    No cover image
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {canChangeCover && (
                    <div className="
                            absolute
                            right-3
                            top-3
                            sm:right-5
                            sm:top-5
                        ">
                        <Button
                            variant="secondary"
                            disabled={coverLoading}
                            aria-label="Change journal cover image"
                            aria-busy={coverLoading}
                            onClick={onChangeCover}
                            className="
                                border-0
                                bg-black/65
                                text-white
                                shadow-lg
                                backdrop-blur-md
                                hover:bg-black/75
                                hover:text-white
                            "
                        >
                            {coverLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="mr-2 h-4 w-4" />
                                    Change Cover
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}