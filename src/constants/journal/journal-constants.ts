export const journalConstants = {
    images: {
        constraints: {
             // Maximum images a journal can have in total.
            maxImagesPerJournal: 20,

            // Maximum images allowed in a single upload request.
            maxImagesPerUpload: 5,

            // Maximum size allowed for each image.
            maxFileSize: 5 * 1024 * 1024,

            // Supported image MIME types.
            allowedMimeTypes: [
                "image/jpeg",
                "image/png",
                "image/webp",
            ],
        },

        input: {
            acceptedFileTypes: ".jpg,.jpeg,.png,.webp",
        },
        
    },

    pagination: {
        defaultPage: 0,
        defaultPageSize: 10,
        pageSizeOptions: [10, 20, 50],
    },

    search: {
        debounceDelay: 400, // 400 milliseconds. This prevents hitting the backend on every keystroke.
        minQueryLength: 1, // The search begins as soon as at least one character is entered.
    },

    defaults: {
        journal: {
            favorite: false,
            coverImage: null,
        },
    },

    query: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    },

    validation: {
        title: {
            maxLength: 120
        }
    }

} as const;