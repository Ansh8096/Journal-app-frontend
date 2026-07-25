export const ROUTES = {
    LOGIN: "/login",
    SIGNUP: "/signup",

    DASHBOARD: "/dashboard",
    JOURNALS: "/journals", // journals list 
    NEW_JOURNAL: "/journals/new",
    JOURNAL_DETAILS: "/journals/:journalId",
    EDIT_JOURNAL: "/journals/:journalId/edit",
    PROFILE: "/profile",
    SETTINGS: "/settings",
} as const;

export const buildJournalDetailsRoute = (journalId: string) =>
    `/journals/${journalId}`;