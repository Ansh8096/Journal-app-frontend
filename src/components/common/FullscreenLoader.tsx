import { Loader2 } from "lucide-react";

import logo from "@/assets/journalflow-logo-2.svg";

interface FullscreenLoaderProps {
    message?: string;
}

const FullscreenLoader = ({
    message = "Preparing your journal...",
}: FullscreenLoaderProps) => {

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background">

            <img
                src={logo}
                alt="JournalFlow"
                className="w-72 sm:w-80 md:w-96 animate-breathe select-none"
                draggable={false}
            />

            {/* <div className="flex flex-col items-center gap-3">

                <Loader2 className="h-6 w-6 animate-spin text-primary" />

                <p className="text-sm text-muted-foreground">
                    {message}
                </p>

            </div> */}

        </div>
    );
};

export default FullscreenLoader;