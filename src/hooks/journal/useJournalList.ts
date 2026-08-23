import {
    keepPreviousData,
    useQuery,
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";
import { journalKeys } from "@/lib/react-query/query-keys";

import type { JournalSearchCriteria } from "@/types/api/journal";

export function useJournalList(criteria?: JournalSearchCriteria) {
    return useQuery({
        queryKey: journalKeys.list(criteria), // use this structure, beacuse now Each combination gets its own cached result.

        queryFn: () => journalService.getJournals(criteria),

        placeholderData: keepPreviousData,
    });
}