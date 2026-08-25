import {
    useEffect,
    useRef,
    useState,
} from "react";

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
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

import {
    Skeleton,
} from "@/components/ui/skeleton";

import {
    AlertCircle,
} from "lucide-react";

import {
    toast,
} from "sonner";

import AppLayout
    from "@/layouts/app/AppLayout";

import {
    useDraft,
    usePublishDraft,
    useUpdateDraft,
} from "@/hooks/journal";

import JournalEditLayout
    from "@/components/journal/edit/layout/JournalEditLayout";

import EditDraftForm
    from "@/components/journal/edit/form/EditDraftForm";

import {
    JournalDetailsCard,
} from "@/components/journal/create/details/JournalDetailsCard";

import WeatherCard
    from "@/components/journal/create/weather/WeatherCard";

import WritingTipCard
    from "@/components/journal/create/inspiration/WritingTipCard";

import {
    getRandomWritingTip,
} from "@/lib/writing-tip/getRandomWritingTip";

import {
    editDraftSchema,
    type EditDraftFormValues,
} from "@/schemas/journal/edit-draft.schema";

import type {
    SelectedImage,
} from "@/types/journal/image";

import type {
    JournalImageResponse,
    JournalResponse,
} from "@/types/api/journal";
import { buildUpdateDraftPayload } from "@/utils/build-update-draft-payload";
import { isDraftEmpty } from "@/lib/validation/isDraftEmpty";
import { getErrorMessage } from "@/lib/error";
import { buildJournalDetailsRoute } from "@/constants/routes";
import { useWeather } from "@/hooks/weather/useWeather";


export default function EditDraftPage() {


    const navigate =
        useNavigate();

    /* ---------------------------------------------------------------------- */
    /*                              DRAFT ID                                  */
    /* ---------------------------------------------------------------------- */

    const {
        draftId,
    } = useParams<{
        draftId: string;
    }>();


    /* ---------------------------------------------------------------------- */
    /*                              DRAFT FETCH                               */
    /* ---------------------------------------------------------------------- */

    const {
        data: draft,
        isLoading,
        isError,
        refetch,
    } = useDraft(
        draftId,
    );

    const {
        mutate: updateDraft,
        isPending: isUpdatePending,
    } = useUpdateDraft();

    const {
        mutate: publishDraft,
        isPending: isPublishPending,
    } = usePublishDraft();

    const {
        data: weather,
        isLoading: isWeatherLoading,
        isFetching: isWeatherFetching,
        isError: isWeatherError,
        refetch: refetchWeather,
    } = useWeather();

    /* ---------------------------------------------------------------------- */
    /*                              EDIT FORM                                 */
    /* ---------------------------------------------------------------------- */

    const form =
        useForm<EditDraftFormValues>({
            resolver:
                zodResolver(
                    editDraftSchema,
                ),

            defaultValues: {
                title: "",
                content: "",
                mood: null,
                tags: [],
            },

            mode: "onBlur",
        });


    /* ---------------------------------------------------------------------- */
    /*                              IMAGE STATE                               */
    /* ---------------------------------------------------------------------- */

    /**
     * Existing images already stored on
     * the server.
     */
    const [
        existingImages,
        setExistingImages,
    ] = useState<
        JournalImageResponse[]
    >([]);


    /**
     * Newly selected local images.
     *
     * These contain File objects and
     * preview URLs.
     */
    const [
        newImages,
        setNewImages,
    ] = useState<
        SelectedImage[]
    >([]);


    /**
     * Existing server image public IDs
     * that the user has requested to remove.
     *
     * No backend request is performed
     * until the draft is actually saved.
     */
    const [
        removedImagePublicIds,
        setRemovedImagePublicIds,
    ] = useState<string[]>([]);

    // Dialog state:

    const [
        isDiscardDialogOpen,
        setIsDiscardDialogOpen,
    ] = useState(false);


    /* ---------------------------------------------------------------------- */
    /*                                REFS                                    */
    /* ---------------------------------------------------------------------- */

    /**
     * Prevent a refetch of the same draft
     * from resetting the user's unsaved
     * changes.
     */
    const initializedDraftIdRef =
        useRef<string | null>(
            null,
        );


    /**
     * Keep the latest newImages available
     * for preview URL cleanup.
     */
    const newImagesRef =
        useRef<SelectedImage[]>(
            [],
        );

    /**
    * Keeps the last successfully saved
    * DraftResponse available locally.
    *
    * This is the source used by
    * "Discard Changes".
    */
    const savedDraftRef =
        useRef<JournalResponse | null>(
            null,
        );

    /* ---------------------------------------------------------------------- */
    /*                          REACT HOOK FORM WATCHERS                      */
    /* ---------------------------------------------------------------------- */

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

    const isDraftActionPending =
        isUpdatePending ||
        isPublishPending;

    const handlePublishRequest =
        async () => {

            if (isDraftActionPending) {
                return;
            }

            await form.handleSubmit(
                handlePublishDraft,
            )();
        };

    /* ---------------------------------------------------------------------- */
    /*                              DERIVED DATA                              */
    /* ---------------------------------------------------------------------- */

    /**
     * Draft creation date.
     *
     * We display the date belonging to
     * the existing draft, not the current
     * date.
     */
    const draftDate =
        draft
            ? new Date(
                draft.createdAt,
            )
            : new Date();


    /**
     * Writing tip remains UI-only.
     */
    const [
        tip,
    ] = useState(
        () =>
            getRandomWritingTip(),
    );


    /* ---------------------------------------------------------------------- */
    /*                               EFFECTS                                  */
    /* ---------------------------------------------------------------------- */

    /**
     * Keep the latest image state available
     * to the cleanup effect below.
     */
    useEffect(() => {

        newImagesRef.current =
            newImages;

    }, [newImages]);


    /**
     * Revoke all remaining local preview
     * URLs when this page unmounts.
     *
     * Existing server image URLs are not
     * object URLs and therefore must not
     * be revoked.
     */
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


    /**
     * Populate the Edit Draft form when
     * the draft is first loaded.
     *
     * The initialization guard prevents
     * a later refetch of the same draft
     * from wiping out unsaved edits.
     */
    useEffect(() => {

        if (!draft) {
            return;
        }


        if (
            initializedDraftIdRef.current ===
            draft.id
        ) {
            return;
        }


        initializedDraftIdRef.current =
            draft.id;

        /**
         * --------------------------------
         * SAVE CURRENT SERVER BASELINE
         * --------------------------------
         */
        savedDraftRef.current = draft;

        /**
         * ------------------------------
         * POPULATE RHF
         * ------------------------------
         */

        form.reset({

            title:
                draft.title,

            content:
                draft.content,

            mood:
                draft.mood,

            tags:
                draft.tags,

        });


        /**
         * ------------------------------
         * POPULATE EXISTING IMAGES
         * ------------------------------
         *
         * These images already exist
         * on the backend.
         */

        setExistingImages(
            draft.images ?? [],
        );


        /**
         * ------------------------------
         * RESET LOCAL IMAGE CHANGES
         * ------------------------------
         */

        setNewImages([]);

        setRemovedImagePublicIds([]);

    }, [
        draft,
        form,
    ]);


    /* ---------------------------------------------------------------------- */
    /*                         JOURNAL DETAILS HANDLERS                      */
    /* ---------------------------------------------------------------------- */

    /**
     * Update draft mood through RHF.
     */
    const handleMoodChange = (
        value: NonNullable<
            EditDraftFormValues["mood"]
        >,
    ) => {

        form.setValue(
            "mood",
            value,
            {
                shouldDirty:
                    true,

                shouldTouch:
                    true,

                shouldValidate:
                    true,
            },
        );
    };


    /**
     * Update draft tags through RHF.
     */
    const handleTagsChange = (
        value: string[],
    ) => {

        form.setValue(
            "tags",
            value,
            {
                shouldDirty:
                    true,

                shouldTouch:
                    true,

                shouldValidate:
                    true,
            },
        );
    };


    /* ---------------------------------------------------------------------- */
    /*                         EXISTING IMAGE HANDLERS                         */
    /* ---------------------------------------------------------------------- */

    /**
     * Remove an existing server image
     * from the local Edit state.
     *
     * The backend is not called here.
     */
    const handleRemoveExistingImage = (
        publicId: string,
    ) => {

        /**
         * Remove image from the visible
         * existing image collection.
         */
        setExistingImages(
            (previous) =>
                previous.filter(
                    (image) =>
                        image.publicId !==
                        publicId,
                ),
        );


        /**
         * Remember the public ID so the
         * eventual update payload can
         * contain removeImagePublicIds.
         */
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


    /**
     * Replace an existing server image
     * with a newly selected local image.
     *
     * The old image is marked for removal
     * and the replacement becomes a new
     * local image.
     */
    const handleReplaceExistingImage = (
        publicId: string,
        replacement: SelectedImage,
    ) => {

        /**
         * Remove the old image from the
         * visible server-image collection.
         */
        setExistingImages(
            (previous) =>
                previous.filter(
                    (image) =>
                        image.publicId !==
                        publicId,
                ),
        );


        /**
         * Remember old image for the
         * eventual update request.
         */
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


        /**
         * Add the replacement to local
         * image state.
         */
        setNewImages(
            (previous) => [
                ...previous,
                replacement,
            ],
        );
    };

    const handleUpdateDraft = (
        values: EditDraftFormValues,
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
         * VERIFY DRAFT ID
         * --------------------------------
         */

        if (!draftId) {

            toast.error(
                "Unable to save draft",
                {
                    description:
                        "The draft ID is missing.",
                },
            );

            return;
        }


        /**
         * --------------------------------
         * EMPTY-DRAFT VALIDATION
         * --------------------------------
         *
         * Drafts may be incomplete, but they
         * cannot be completely empty.
         *
         * Existing server images and newly
         * selected images both count as data.
         */

        const hasImages =
            existingImages.length > 0 ||
            newImages.length > 0;


        const isEmpty =
            isDraftEmpty({
                values,
                hasImages,
            });


        if (isEmpty) {

            toast.error(
                "Draft is empty",
                {
                    description:
                        "Add at least a title, content, mood, tag, or image before saving the draft.",
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
            buildUpdateDraftPayload(
                values,
                newImages,
                removedImagePublicIds,
            );


        /**
         * --------------------------------
         * UPDATE DRAFT
         * --------------------------------
         */

        updateDraft(
            {
                draftId,

                request:
                    payload.request,

                images:
                    payload.images,
            },

            {
                /**
                 * --------------------------------
                 * F.13 — SUCCESS
                 * --------------------------------
                 */

                onSuccess: (
                    updatedDraft,
                ) => {

                    // SAVE NEW BASELINE
                    savedDraftRef.current =
                        updatedDraft;

                    /**
                     * Release local preview URLs.
                     *
                     * These are temporary object URLs
                     * created for newly selected images.
                     */
                    newImages.forEach(
                        (image) => {

                            URL.revokeObjectURL(
                                image.previewUrl,
                            );

                        },
                    );


                    /**
                     * The returned JournalResponse is now
                     * our new local baseline.
                     *
                     * This is important because we're
                     * staying on the Edit Draft page.
                     */

                    form.reset({
                        title:
                            updatedDraft.title,

                        content:
                            updatedDraft.content,

                        mood:
                            updatedDraft.mood,

                        tags:
                            updatedDraft.tags,
                    });


                    /**
                     * Replace existing image state with
                     * the server's updated image collection.
                     */
                    setExistingImages(
                        updatedDraft.images ?? [],
                    );


                    /**
                     * Clear temporary local image state.
                     */
                    setNewImages([]);


                    /**
                     * Clear pending server-image removals.
                     */
                    setRemovedImagePublicIds([]);


                    /**
                     * Success feedback.
                     */
                    toast.success(
                        "Draft saved successfully",
                        {
                            description:
                                `"${updatedDraft.title || "Untitled draft"}" was updated successfully.`,
                        },
                    );
                },


                /**
                 * --------------------------------
                 * F.14 — ERROR
                 * --------------------------------
                 */

                onError: (
                    error,
                ) => {

                    toast.error(
                        "Failed to save draft",
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
                     * - change existingImages
                     *
                     * The user must be able to retry.
                     */
                },
            },
        );
    };

    const handleDiscardRequest = () => {

        /**
         * Don't allow discard while an
         * update request is running.
         */
        if (isDraftActionPending) {
            return;
        }


        /**
         * Nothing to discard.
         */
        if (!hasUnsavedChanges) {
            return;
        }


        /**
         * Open confirmation dialog.
         */
        setIsDiscardDialogOpen(
            true,
        );
    };

    const handleConfirmDiscard = () => {

        /**
         * Don't allow discard while
         * saving the draft.
         */
        if (isDraftActionPending) {
            return;
        }


        const savedDraft =
            savedDraftRef.current;


        /**
         * We cannot restore a baseline if
         * one has not been established.
         */
        if (!savedDraft) {
            setIsDiscardDialogOpen(false);

            return;
        }


        /**
         * --------------------------------
         * REVOKE LOCAL PREVIEW URLS
         * --------------------------------
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
         * RESTORE RHF
         * --------------------------------
         */
        form.reset({
            title:
                savedDraft.title,

            content:
                savedDraft.content,

            mood:
                savedDraft.mood,

            tags:
                savedDraft.tags,
        });


        /**
         * --------------------------------
         * RESTORE EXISTING SERVER IMAGES
         * --------------------------------
         */
        setExistingImages(
            savedDraft.images ?? [],
        );


        /**
         * --------------------------------
         * CLEAR LOCAL IMAGE CHANGES
         * --------------------------------
         */
        setNewImages([]);

        setRemovedImagePublicIds([]);


        /**
         * --------------------------------
         * CLOSE DIALOG
         * --------------------------------
         */
        setIsDiscardDialogOpen(
            false,
        );


        /**
         * --------------------------------
         * FEEDBACK
         * --------------------------------
         */
        toast.success(
            "Changes discarded",
            {
                description:
                    "Your draft has been restored to its last saved state.",
            },
        );
    };

    const handlePublishSuccess = (
        publishedJournal: JournalResponse,
    ) => {

        /**
         * The draft has now become a
         * published journal.
         */
        toast.success(
            "Draft published successfully",
            {
                description:
                    `"${publishedJournal.title || "Untitled journal"}" is now published.`,
            },
        );


        /**
         * Navigate to the normal Journal
         * Details page.
         */
        navigate(
            buildJournalDetailsRoute(
                publishedJournal.id,
            ),
            {
                replace: true,
            },
        );
    };

    const handlePublishError = (
        error: Error,
    ) => {

        toast.error(
            "Failed to publish draft",
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
         * Do not reset the form.
         *
         * If we reached this handler after
         * saving first, the latest content is
         * already safely stored as a draft.
         *
         * The user can simply try Publish again.
         */
    };

    const handleUpdateBeforePublishError = (
        error: Error,
    ) => {

        toast.error(
            "Failed to save draft",
            {
                description:
                    getErrorMessage(
                        error,
                    ),
            },
        );

        /**
         * Do NOT:
         *
         * - reset form
         * - clear images
         * - clear removedImagePublicIds
         *
         * The user can fix the problem and
         * try Publish Draft again.
         */
    };

    const validateCurrentDraft =
        (
            values: EditDraftFormValues,
        ): boolean => {

            const hasImages =
                existingImages.length > 0 ||
                newImages.length > 0;

            const empty =
                isDraftEmpty({
                    values,
                    hasImages,
                });

            if (empty) {

                toast.error(
                    "Draft is empty",
                    {
                        description:
                            "Add at least a title, content, mood, tag, or image before publishing.",
                    },
                );

                return false;
            }

            return true;
    };

    const handlePublishDraft = (
        values: EditDraftFormValues,
    ) => {

        /**
         * --------------------------------
         * PREVENT DUPLICATE ACTIONS
         * --------------------------------
         */

        if (isDraftActionPending) {
            return;
        }


        /**
         * --------------------------------
         * DRAFT ID
         * --------------------------------
         */

        if (!draftId) {

            toast.error(
                "Unable to publish draft",
                {
                    description:
                        "The draft ID is missing.",
                },
            );

            return;
        }


        /**
         * --------------------------------
         * EMPTY-DRAFT VALIDATION
         * --------------------------------
         */

        if (
            !validateCurrentDraft(
                values,
            )
        ) {
            return;
        }


        /**
         * --------------------------------
         * CHECK WHETHER CURRENT EDITS
         * HAVE NOT BEEN SAVED YET
         * --------------------------------
         */

        if (
            hasUnsavedChanges
        ) {

            /**
             * Save the current version first.
             *
             * Only after the update succeeds
             * will we publish the saved result.
             */
            const payload =
                buildUpdateDraftPayload(
                    values,
                    newImages,
                    removedImagePublicIds,
                );


            updateDraft(
                {
                    draftId,

                    request:
                        payload.request,

                    images:
                        payload.images,
                },

                {
                    onSuccess: (
                        updatedDraft,
                    ) => {

                        /**
                         * We have now saved the latest
                         * editor state.
                         *
                         * Update local baseline before
                         * publishing.
                         */
                        savedDraftRef.current =
                            updatedDraft;


                        /**
                         * Release local object URLs.
                         */
                        newImages.forEach(
                            (image) => {

                                URL.revokeObjectURL(
                                    image.previewUrl,
                                );

                            },
                        );


                        /**
                         * Reset RHF baseline to the
                         * newly saved state.
                         */
                        form.reset({
                            title:
                                updatedDraft.title,

                            content:
                                updatedDraft.content,

                            mood:
                                updatedDraft.mood,

                            tags:
                                updatedDraft.tags,
                        });


                        /**
                         * Synchronize local image state.
                         */
                        setExistingImages(
                            updatedDraft.images ?? [],
                        );

                        setNewImages([]);

                        setRemovedImagePublicIds([]);


                        /**
                         * Now publish the freshly
                         * saved draft.
                         */
                        publishDraft(
                            {
                                draftId:
                                    updatedDraft.id,
                            },

                            {
                                onSuccess:
                                    handlePublishSuccess,

                                onError:
                                    handlePublishError,
                            },
                        );
                    },

                    onError:
                        handleUpdateBeforePublishError,
                },
            );

            return;
        }


        /**
         * --------------------------------
         * NOTHING UNSAVED
         * --------------------------------
         *
         * The current draft already matches
         * the server baseline, so there's
         * nothing to save first.
         */

        publishDraft(
            {
                draftId,
            },

            {
                onSuccess:
                    handlePublishSuccess,

                onError:
                    handlePublishError,
            },
        );
    };

    const handleRefreshWeather = async () => {
        await refetchWeather();
    };

    /* ---------------------------------------------------------------------- */
    /*                           INVALID DRAFT ID                             */
    /* ---------------------------------------------------------------------- */

    if (!draftId) {

        return (
            <AppLayout>

                <div
                    className="
                        flex
                        min-h-[60vh]
                        items-center
                        justify-center
                        px-4
                    "
                >

                    <Alert
                        className="max-w-lg"
                    >

                        <AlertCircle
                            className="h-4 w-4"
                        />

                        <AlertTitle>
                            Draft not found
                        </AlertTitle>

                        <AlertDescription>
                            We couldn't determine which
                            draft you want to edit.
                        </AlertDescription>

                    </Alert>

                </div>

            </AppLayout>
        );
    }


    /* ---------------------------------------------------------------------- */
    /*                              LOADING                                   */
    /* ---------------------------------------------------------------------- */

    if (isLoading) {

        return (
            <AppLayout>

                <div
                    className="space-y-8"
                    aria-busy="true"
                    aria-live="polite"
                >

                    {/* ------------------------------------------------------
                        PAGE HEADER
                    ------------------------------------------------------- */}

                    <section
                        className="space-y-3"
                    >

                        <Skeleton
                            className="h-9 w-56"
                        />

                        <Skeleton
                            className="h-5 w-80"
                        />

                    </section>


                    {/* ------------------------------------------------------
                        PAGE CONTENT
                    ------------------------------------------------------- */}

                    <section
                        className="
                            grid
                            gap-8
                            xl:grid-cols-12
                        "
                    >

                        {/* LEFT */}

                        <main
                            className="
                                space-y-8
                                xl:col-span-8
                            "
                        >

                            <Skeleton
                                className="
                                    h-11
                                    w-full
                                "
                            />


                            <div
                                className="space-y-3"
                            >

                                <Skeleton
                                    className="
                                        h-10
                                        w-full
                                    "
                                />

                                <Skeleton
                                    className="
                                        h-72
                                        w-full
                                    "
                                />

                            </div>


                            <div
                                className="space-y-3"
                            >

                                <Skeleton
                                    className="
                                        h-6
                                        w-32
                                    "
                                />

                                <div
                                    className="
                                        grid
                                        grid-cols-2
                                        gap-4
                                        sm:grid-cols-3
                                    "
                                >

                                    <Skeleton
                                        className="
                                            aspect-square
                                            w-full
                                        "
                                    />

                                    <Skeleton
                                        className="
                                            aspect-square
                                            w-full
                                        "
                                    />

                                    <Skeleton
                                        className="
                                            aspect-square
                                            w-full
                                        "
                                    />

                                </div>

                            </div>

                        </main>


                        {/* RIGHT */}

                        <aside
                            className="
                                space-y-6
                                xl:col-span-4
                            "
                        >

                            <Skeleton
                                className="
                                    h-64
                                    w-full
                                "
                            />

                            <Skeleton
                                className="
                                    h-52
                                    w-full
                                "
                            />

                            <Skeleton
                                className="
                                    h-40
                                    w-full
                                "
                            />

                        </aside>

                    </section>

                </div>

            </AppLayout>
        );
    }


    /* ---------------------------------------------------------------------- */
    /*                                ERROR                                   */
    /* ---------------------------------------------------------------------- */

    if (isError) {

        return (
            <AppLayout>

                <div
                    className="
                        flex
                        min-h-[60vh]
                        items-center
                        justify-center
                        px-4
                    "
                >

                    <Alert
                        variant="destructive"
                        className="max-w-lg"
                    >

                        <AlertCircle
                            className="h-4 w-4"
                        />

                        <AlertTitle>
                            Failed to load draft
                        </AlertTitle>

                        <AlertDescription
                            className="
                                mt-2
                                space-y-4
                            "
                        >

                            <p>
                                We couldn't load this
                                draft. Please try again.
                            </p>


                            <button
                                type="button"
                                onClick={() => {
                                    void refetch();
                                }}
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-md
                                    border
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                "
                            >
                                Try again
                            </button>

                        </AlertDescription>

                    </Alert>

                </div>

            </AppLayout>
        );
    }


    /* ---------------------------------------------------------------------- */
    /*                           NO DRAFT DATA                                */
    /* ---------------------------------------------------------------------- */

    if (!draft) {

        return (
            <AppLayout>

                <div
                    className="
                        flex
                        min-h-[60vh]
                        items-center
                        justify-center
                        px-4
                    "
                >

                    <Alert
                        className="max-w-lg"
                    >

                        <AlertCircle
                            className="h-4 w-4"
                        />

                        <AlertTitle>
                            Draft not found
                        </AlertTitle>

                        <AlertDescription>
                            The draft you're trying to edit
                            could not be found.
                        </AlertDescription>

                    </Alert>

                </div>

            </AppLayout>
        );
    }


    /* ---------------------------------------------------------------------- */
    /*                               SUCCESS                                  */
    /* ---------------------------------------------------------------------- */

    return (
        <AppLayout>

            <FormProvider {...form}>

                <JournalEditLayout
                    title="Edit Draft"
                    description="
                        Continue working on your draft
                        and save your changes.
                    "
                    sidebar={
                        <>
                            {/* --------------------------------
                                JOURNAL DETAILS
                            --------------------------------- */}

                            <JournalDetailsCard
                                date={
                                    draftDate
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
                                    isDraftActionPending
                                }

                                onDateClick={
                                    undefined
                                }

                                onTimeClick={
                                    undefined
                                }
                            />


                            {/* --------------------------------
                                WEATHER
                            --------------------------------- */}

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
                                    isDraftActionPending
                                }

                                onRefresh={
                                    handleRefreshWeather
                                }
                            />


                            {/* --------------------------------
                                WRITING TIP
                            --------------------------------- */}

                            <WritingTipCard
                                tip={
                                    tip
                                }
                            />
                        </>
                    }
                >

                    <EditDraftForm
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
                            handleUpdateDraft
                        }

                        isUpdating={
                            isDraftActionPending
                        }

                        onDiscardRequest={
                            handleDiscardRequest
                        }

                        hasUnsavedChanges={
                            hasUnsavedChanges
                        }

                        onPublishDraft={
                            handlePublishRequest
                        }

                        isPublishingDraft={
                            isPublishPending
                        }
                    />

                </JournalEditLayout>

                <AlertDialog
                    open={
                        isDiscardDialogOpen
                    }

                    onOpenChange={
                        (open) => {

                            if (isDraftActionPending) {
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
                                draft, including newly added
                                images and image removals, will
                                be discarded.
                            </AlertDialogDescription>

                        </AlertDialogHeader>


                        <AlertDialogFooter>

                            <AlertDialogCancel
                                disabled={
                                    isDraftActionPending
                                }
                            >
                                Cancel
                            </AlertDialogCancel>


                            <AlertDialogAction
                                onClick={
                                    handleConfirmDiscard
                                }

                                disabled={
                                    isDraftActionPending
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