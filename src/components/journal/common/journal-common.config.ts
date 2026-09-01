export const JOURNAL_CONFIG = {
    page: {
        list: {
            title: "My Journals",
            description:
                "Capture, organize, and revisit your thoughts and memories.",
        },

        create: {
            title: "Create Journal",
            description:
                "Write down today's thoughts, experiences, and reflections.",
        },

        edit: {
            title: "Edit Journal",
            description:
                "Update your journal entry while preserving your memories.",
        },

        details: {
            title: "Journal Details",
        },
    },

    search: {
        placeholder: "Search journals...",
        emptyQueryMessage: "Start typing to search your journals.",
        noResultsTitle: "No journals found",
        noResultsDescription:
            "Try adjusting your search or filters.",
    },

    form: {
        placeholders: {
            title: "Give your journal a title...",
            content: "Write your thoughts here...",
        },

        images: {
            title: "Add Photos (Optional)",

            description:
                "Add up to 5 images to your journal entry.",

            helperText:
                "JPG, PNG, WEBP • Max 5 MB each",
        },
    },

    actions: {
        create: "Create Journal",
        edit: "Edit Journal",
        delete: "Delete Journal",
        save: "Save Changes",
        cancel: "Cancel",
        retry: "Retry",
        viewAllImages: "View All Images",
        uploadImages: "Upload Images",
    },

    emptyState: {
        title: "No journals yet",
        description:
            "Start documenting your thoughts and memories by creating your first journal.",
        action: "Create Your First Journal",
    },

    dialogs: {
        delete: {
            title: "Delete Journal",
            description:
                "This action cannot be undone.",
            confirm: "Delete",
            cancel: "Cancel",
        },
    },

    messages: {
        created: "Journal created successfully.",
        updated: "Journal updated successfully.",
        deleted: "Journal deleted successfully.",
        imageUploaded: "Images uploaded successfully.",
        imageDeleted: "Image deleted successfully.",
        imageReplaced: "Image replaced successfully.",
        coverUpdated: "Cover image updated successfully.",
    },
} as const;