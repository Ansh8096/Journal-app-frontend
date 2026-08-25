import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
    JournalDetailsCard,
} from "@/components/journal/create/details/JournalDetailsCard";

import WeatherCard from "@/components/journal/create/weather/WeatherCard";

import WritingTipCard from "@/components/journal/create/inspiration/WritingTipCard";

import {
    getRandomWritingTip,
} from "@/lib/writing-tip/getRandomWritingTip";

import {
    FormProvider,
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import AppLayout from "@/layouts/app/AppLayout";

import {
    useJournal,
    useUpdateJournal,
} from "@/hooks/journal";

import {
    editJournalSchema,
    type EditJournalFormValues,
} from "@/schemas/journal/edit-journal.schema";

import EditJournalForm from "@/components/journal/edit/form/EditJournalForm";

import {
    Skeleton,
} from "@/components/ui/skeleton";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

import {
    Button,
} from "@/components/ui/button";

import {
    AlertCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { JournalImageResponse } from "@/types/api/journal";
import type { SelectedImage } from "@/types/journal/image";
import { buildUpdateJournalPayload } from "@/utils/build-update-journal-payload";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error";
import { buildJournalDetailsRoute } from "@/constants/routes";
import JournalEditLayout from "@/components/journal/edit/layout/JournalEditLayout";
import { useWeather } from "@/hooks/weather/useWeather";


export default function EditJournalPage() {

    const {
        journalId,
    } = useParams<{
        journalId: string;
    }>();

    const [
        existingImages,
        setExistingImages,
    ] = useState<JournalImageResponse[]>([]);

    const navigate = useNavigate();

    const [
        newImages,
        setNewImages,
    ] = useState<
        SelectedImage[]
    >([]);


    const [
        removedImagePublicIds,
        setRemovedImagePublicIds,
    ] = useState<string[]>([]);

    const [
        isDiscardDialogOpen,
        setIsDiscardDialogOpen,
    ] = useState(false);

    /**
     * --------------------------------
     * FETCH JOURNAL
     * --------------------------------
     *
     * useJournal already handles:
     *
     * - React Query caching
     * - detail query key
     * - API request
     * - enabled state
     */

    const {
        data: journal,
        isLoading,
        isError,
        refetch,
    } = useJournal(
        journalId,
    );

    const {
        data: weather,
        isLoading: isWeatherLoading,
        isFetching: isWeatherFetching,
        isError: isWeatherError,
        refetch: refetchWeather,
    } = useWeather();

    const {
        mutate: updateJournal,
        isPending: isUpdatePending,
    } = useUpdateJournal();

    const form =
        useForm<EditJournalFormValues>({
            resolver:
                zodResolver(
                    editJournalSchema,
                ),

            defaultValues: {
                title: "",
                content: "",
                mood: null,
                tags: [],
            },

            mode: "onBlur",
        });

    const newImagesRef =
        useRef<
            SelectedImage[]
        >([]);

    useEffect(() => {

        newImagesRef.current =
            newImages;

    }, [newImages]);

    useEffect(() => {

        return () => {

            newImagesRef.current.forEach(
                (image) => {

                    URL.revokeObjectURL(
                        image.previewUrl,
                    );

                },
            );

        };

    }, []);

    const initializedJournalIdRef = useRef<string | null>(null);

    useEffect(() => {

        if (!journal) {
            return;
        }

        if (
            initializedJournalIdRef.current ===
            journal.id
        ) {
            return;
        }

        initializedJournalIdRef.current =
            journal.id;

        form.reset({
            title: journal.title,
            content: journal.content,
            mood: journal.mood,
            tags: journal.tags,
        });

        setExistingImages(
            journal.images ?? [],
        );

        setRemovedImagePublicIds([]);

        setNewImages([]);

    }, [journal, form]);


    const journalDate =
        journal
            ? new Date(journal.createdAt)
            : new Date();

    const [tip] =
        useState(
            () =>
                getRandomWritingTip(),
        );

    const mood =
        form.watch("mood");

    const tags =
        form.watch("tags");

    const moodError =
        form.formState.errors
            .mood?.message;

    const tagsError =
        form.formState.errors
            .tags?.message;

    const hasUnsavedChanges =
        form.formState.isDirty ||
        newImages.length > 0 ||
        removedImagePublicIds.length > 0;


    const handleUpdate = (
        values: EditJournalFormValues,
    ) => {

        /**
         * --------------------------------
         * PREVENT DUPLICATE SUBMISSIONS
         * --------------------------------
         */

        if (isUpdatePending) {
            return;
        }


        /**
         * --------------------------------
         * JOURNAL ID
         * --------------------------------
         */

        if (!journalId) {

            toast.error(
                "Unable to update journal",
                {
                    description:
                        "The journal ID is missing.",
                },
            );

            return;
        }

        /**
         * --------------------------------
         * BUILD UPDATE PAYLOAD
         * --------------------------------
         */

        const payload =
            buildUpdateJournalPayload(
                values,
                newImages,
                removedImagePublicIds,
            );

        updateJournal(
            {
                journalId,

                request:
                    payload.request,

                images:
                    payload.images,
            },

            {
                onSuccess: (
                    updatedJournal,
                ) => {

                    /**
                     * Release all temporary
                     * local preview URLs.
                     *
                     * Existing server images
                     * don't have object URLs.
                     */
                    newImages.forEach(
                        (image) => {

                            URL.revokeObjectURL(
                                image.previewUrl,
                            );

                        },
                    );


                    /**
                     * Clear temporary image state.
                     */
                    setNewImages([]);


                    setRemovedImagePublicIds(
                        [],
                    );


                    /**
                     * Optional local cleanup.
                     *
                     * We are leaving the page,
                     * so keeping these values is
                     * unnecessary.
                     */
                    setExistingImages(
                        updatedJournal.images ?? [],
                    );


                    /**
                     * Success feedback.
                     */
                    toast.success(
                        "Journal updated",
                        {
                            description:
                                `"${updatedJournal.title}" was updated successfully.`,
                        },
                    );


                    /**
                     * Navigate to the updated
                     * journal details page.
                     */
                    navigate(
                        buildJournalDetailsRoute(
                            updatedJournal.id,
                        ),
                        {
                            replace: true,
                        },
                    );
                },

                onError: (
                    error,
                ) => {

                    toast.error(
                        "Failed to update journal",
                        {
                            description:
                                getErrorMessage(
                                    error,
                                ),
                        },
                    );

                    /**
                     * IMPORTANT:
                     *
                     * Do NOT:
                     *
                     * - reset the form
                     * - clear newImages
                     * - clear removedImagePublicIds
                     *
                     * The user should be able
                     * to correct the problem
                     * and retry.
                     */
                },
            },
        );
    };

    const handleMoodChange = (
        value: NonNullable<
            EditJournalFormValues["mood"]
        >,
    ) => {

        form.setValue(
            "mood",
            value,
            {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
            },
        );
    };

    const handleTagsChange = (
        value: string[],
    ) => {

        form.setValue(
            "tags",
            value,
            {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
            },
        );
    };

    const handleRemoveExistingImage = (
        publicId: string,
    ) => {

        setExistingImages(
            (previous) =>
                previous.filter(
                    (image) =>
                        image.publicId !==
                        publicId,
                ),
        );

        setRemovedImagePublicIds(
            (previous) => {

                if (
                    previous.includes(
                        publicId,
                    )
                ) {
                    return previous;
                }

                return [
                    ...previous,
                    publicId,
                ];
            },
        );
    };

    const handleDiscardRequest = () => {

        if (isUpdatePending) {
            return;
        }

        if (!hasUnsavedChanges) {
            return;
        }

        setIsDiscardDialogOpen(true);
    };

    const handleConfirmDiscard = () => {

        /**
         * Prevent discard while an update
         * request is running.
         */
        if (isUpdatePending) {
            return;
        }


        /**
         * --------------------------------
         * REVOKE NEW IMAGE PREVIEW URLS
         * --------------------------------
         *
         * Existing server images do not have
         * object URLs and therefore do not
         * need revocation.
         */
        newImages.forEach(
            (image) => {

                URL.revokeObjectURL(
                    image.previewUrl,
                );

            },
        );


        /**
         * --------------------------------
         * CLEAR NEW IMAGE STATE
         * --------------------------------
         */
        setNewImages([]);


        /**
         * --------------------------------
         * RESTORE ORIGINAL SERVER IMAGES
         * --------------------------------
         *
         * journal is the originally fetched
         * server state.
         */
        setExistingImages(
            journal?.images ?? [],
        );


        /**
         * --------------------------------
         * CLEAR PENDING IMAGE REMOVALS
         * --------------------------------
         */
        setRemovedImagePublicIds([]);


        /**
         * --------------------------------
         * RESET RHF
         * --------------------------------
         *
         * Because E.4 used:
         *
         * form.reset({
         *     title,
         *     content,
         *     mood,
         *     tags,
         * });
         *
         * those values are now RHF's
         * current defaults.
         */
        form.reset();


        /**
         * --------------------------------
         * CLOSE DIALOG
         * --------------------------------
         */
        setIsDiscardDialogOpen(false);


        /**
         * --------------------------------
         * FEEDBACK
         * --------------------------------
         */
        toast.success(
            "Changes discarded",
            {
                description:
                    "Your journal has been restored to its last saved state.",
            },
        );
    };

    const handleReplaceExistingImage = (
        publicId: string,
        replacement: SelectedImage,
    ) => {

        setExistingImages(
            (previous) =>
                previous.filter(
                    (image) =>
                        image.publicId !== publicId,
                ),
        );

        setRemovedImagePublicIds(
            (previous) => {

                if (
                    previous.includes(publicId)
                ) {
                    return previous;
                }

                return [
                    ...previous,
                    publicId,
                ];
            },
        );

        setNewImages(
            (previous) => [
                ...previous,
                replacement,
            ],
        );
    };

    const handleRefreshWeather = async () => {
        await refetchWeather();
    };

    /**
     * --------------------------------
     * INVALID JOURNAL ID
     * --------------------------------
     */

    if (!journalId) {

        return (
            <AppLayout>

                <div className="flex min-h-[60vh] items-center justify-center px-4">

                    <Alert className="max-w-lg">

                        <AlertCircle className="h-4 w-4" />

                        <AlertTitle>
                            Journal not found
                        </AlertTitle>

                        <AlertDescription>
                            We couldn't determine which
                            journal you want to edit.
                        </AlertDescription>

                    </Alert>

                </div>

            </AppLayout>
        );
    }


    /**
     * --------------------------------
     * LOADING STATE
     * --------------------------------
     */

    if (isLoading) {

        return (
            <AppLayout>

                <div
                    className="space-y-8"
                    aria-busy="true"
                    aria-live="polite"
                >

                    {/* Page header */}

                    <section className="space-y-3">

                        <Skeleton className="h-9 w-56" />

                        <Skeleton className="h-5 w-80" />

                    </section>


                    {/* Main layout */}

                    <section className="grid gap-8 xl:grid-cols-12">

                        <main className="space-y-8 xl:col-span-8">

                            {/* Title */}

                            <Skeleton className="h-11 w-full" />


                            {/* Editor */}

                            <div className="space-y-3">

                                <Skeleton className="h-10 w-full" />

                                <Skeleton className="h-72 w-full" />

                            </div>


                            {/* Images */}

                            <div className="space-y-3">

                                <Skeleton className="h-6 w-32" />

                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

                                    <Skeleton className="aspect-square w-full" />

                                    <Skeleton className="aspect-square w-full" />

                                    <Skeleton className="aspect-square w-full" />

                                </div>

                            </div>

                        </main>


                        <aside className="space-y-6 xl:col-span-4">

                            <Skeleton className="h-64 w-full" />

                        </aside>

                    </section>

                </div>

            </AppLayout>
        );
    }


    /**
     * --------------------------------
     * ERROR STATE
     * --------------------------------
     */

    if (isError) {

        return (
            <AppLayout>

                <div className="flex min-h-[60vh] items-center justify-center px-4">

                    <Alert
                        variant="destructive"
                        className="max-w-lg"
                    >

                        <AlertCircle className="h-4 w-4" />

                        <AlertTitle>
                            Failed to load journal
                        </AlertTitle>

                        <AlertDescription className="mt-2 space-y-4">

                            <p>
                                We couldn't load this journal.
                                Please try again.
                            </p>


                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    void refetch();
                                }}
                            >
                                Try again
                            </Button>

                        </AlertDescription>

                    </Alert>

                </div>

            </AppLayout>
        );
    }


    /**
     * --------------------------------
     * NOT FOUND / NO DATA
     * --------------------------------
     *
     * React Query succeeded but no
     * journal data was returned.
     */

    if (!journal) {

        return (
            <AppLayout>

                <div className="flex min-h-[60vh] items-center justify-center px-4">

                    <Alert className="max-w-lg">

                        <AlertCircle className="h-4 w-4" />

                        <AlertTitle>
                            Journal not found
                        </AlertTitle>

                        <AlertDescription>
                            The journal you're trying to edit
                            could not be found.
                        </AlertDescription>

                    </Alert>

                </div>

            </AppLayout>
        );
    }

    return (
    <AppLayout>

        <FormProvider {...form}>

            <JournalEditLayout
                title="Edit Journal"
                description="Update your journal and save your changes."
                sidebar={

                    <>
                        {/* ------------------------------------------------
                            JOURNAL DETAILS
                        ------------------------------------------------- */}

                        <JournalDetailsCard
                            date={
                                journalDate
                            }

                            mood={
                                mood ?? null
                            }

                            tags={
                                tags
                            }

                            onMoodChange={
                                handleMoodChange
                            }

                            onTagsChange={
                                handleTagsChange
                            }

                            moodError={
                                moodError
                            }

                            tagsError={
                                tagsError
                            }

                            disabled={
                                isUpdatePending
                            }

                            onDateClick={() => {
                                console.log(
                                    "Open date picker",
                                );
                            }}

                            onTimeClick={() => {
                                console.log(
                                    "Open time picker",
                                );
                            }}
                        />


                        {/* ------------------------------------------------
                            WEATHER
                        ------------------------------------------------- */}

                        <WeatherCard
                            weather={
                                weather
                            }

                            loading={
                                isWeatherLoading ||
                                isWeatherFetching
                            }

                            error={
                                isWeatherError
                            }

                            disabled={
                                isUpdatePending
                            }

                            onRefresh={handleRefreshWeather}
                        />


                        {/* ------------------------------------------------
                            WRITING TIP
                        ------------------------------------------------- */}

                        <WritingTipCard
                            tip={
                                tip
                            }
                        />
                    </>
                }
            >

                <EditJournalForm
                    existingImages={
                        existingImages
                    }

                    newImages={
                        newImages
                    }

                    onNewImagesChange={
                        setNewImages
                    }

                    onRemoveExistingImage={
                        handleRemoveExistingImage
                    }

                    onReplaceExistingImage={
                        handleReplaceExistingImage
                    }

                    onSubmit={
                        handleUpdate
                    }

                    isUpdating={
                        isUpdatePending
                    }

                    onDiscardRequest={
                        handleDiscardRequest
                    }

                    hasUnsavedChanges={
                        hasUnsavedChanges
                    }
                />

            </JournalEditLayout>


            {/* ------------------------------------------------------------
                DISCARD CONFIRMATION
            ------------------------------------------------------------- */}

            <AlertDialog
                open={
                    isDiscardDialogOpen
                }

                onOpenChange={
                    (open) => {

                        if (
                            isUpdatePending
                        ) {
                            return;
                        }

                        setIsDiscardDialogOpen(
                            open,
                        );
                    }
                }
            >

                <AlertDialogContent>

                    <AlertDialogHeader>

                        <AlertDialogTitle>
                            Discard changes?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            All unsaved changes to this
                            journal, including newly added
                            images and image removals, will
                            be discarded.
                        </AlertDialogDescription>

                    </AlertDialogHeader>


                    <AlertDialogFooter>

                        <AlertDialogCancel
                            disabled={
                                isUpdatePending
                            }
                        >
                            Cancel
                        </AlertDialogCancel>


                        <AlertDialogAction
                            onClick={
                                handleConfirmDiscard
                            }

                            disabled={
                                isUpdatePending
                            }
                        >
                            Discard Changes
                        </AlertDialogAction>

                    </AlertDialogFooter>

                </AlertDialogContent>

            </AlertDialog>

        </FormProvider>

    </AppLayout>
);
}