import { useMutation } from "@tanstack/react-query";

import journalService from "@/services/journal.service";

export function useDownloadJournal() {
    return useMutation({
        mutationFn: (journalId: string) =>
            journalService.downloadJournal(journalId),
    });
}