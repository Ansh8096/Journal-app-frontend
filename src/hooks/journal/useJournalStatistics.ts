import { useQuery } from "@tanstack/react-query";

import journalService from "@/services/journal.service";
    
import { journalKeys } from "@/lib/react-query/query-keys";

export function useJournalStatistics() {
    return useQuery({
        queryKey: journalKeys.statistics(),

        queryFn: () => journalService.getJournalStatistics(),
    });
}