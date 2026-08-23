import { useQuery } from "@tanstack/react-query";
import journalService from "@/services/journal.service";
import { journalKeys } from "@/lib/react-query/query-keys";


export function useJournal(id?: string) {
    return useQuery({
        queryKey: journalKeys.detail(id ?? ""), // it returns the cached journal by id

        queryFn: () => journalService.getJournalById(id!), // This is the function React Query executes when it needs data.

        enabled: !!id, // This prevents React Query from making a request when: id === "", id === undefined etc.
    }); 
}