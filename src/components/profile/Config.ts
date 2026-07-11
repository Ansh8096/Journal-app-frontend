export const profileConfig = {
    page: {
        title: "Profile",
        description:" View and manage your account information, preferences, and journal profile.",
    },

    header: {
        editButton: "Edit Profile",
    },

    cards: {
        personalInformation: {
            title: "Personal Information",
            description: "Your basic personal details.",
        },

        preferences: {
            title: "Preferences",
            description: "Manage your profile preferences.",
        },

        accountInformation: {
            title: "Account Information",
            description: "Information about your account.",
        },
    },

    labels: {
        username: "Username",
        newEmail: "New Email",
        city: "City",
        email: "Email",
        sentimentAnalysis: "Weekly Journal Insights",
        accountCreated: "Account Created",
        currentPassword: "Current Password",
    },

    avatar: {
        alt: "Profile Picture",
        uploadButton: "Change Photo",
    },

    messages: {
        profileUpdated: "Profile updated successfully.",
        avatarUpdated: "Profile picture updated successfully.",
    },

    dialogs: {
        username: {
            title: "Edit Username",
            description: "Update your username.",
        },
    
        changeEmail: {
            title: "Change Email",
            description:
                "Update your email address by confirming your current password.",
        },

        preferences: {
            title: "Edit Preferences",
            description:
                "Update your city and notification preferences.",
        },

        avatar: {
            title: "Change Profile Photo",
            description:
                "Upload a new profile photo. Supported formats: JPG, PNG, WEBP.",
        },
    },
    
    actions: {
        edit: "Edit",
        cancel: "Cancel",
        save: "Save Changes",
        upload: "Upload Photo",
        uploading: "Uploading...",
        chooseImage:"Choose Image", 
        saving: "Saving..."
    },

    placeholders: {
        username: "Enter your username",

        newEmail: "Enter your new email",

        currentPassword: "Enter your current password",

        city: "Enter your city",

        currentProfilePhoto: "Current profile photo",
    },

    descriptions: {
        weeklySentimentEmails: "Receive a personalized weekly summary based on your journal entries."
    },

} as const;