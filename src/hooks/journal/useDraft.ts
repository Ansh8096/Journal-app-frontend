import {
    useQuery,
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";

import {
    draftKeys,
} from "@/lib/react-query/query-keys";

import type {
    JournalResponse,
} from "@/types/api/journal";


export function useDraft(
    draftId?: string,
) {

    return useQuery<
        JournalResponse,
        Error
    >({

        /**
         * --------------------------------
         * QUERY KEY
         * --------------------------------
         */

        queryKey:
            draftKeys.detail(
                draftId ?? "",
            ),


        /**
         * --------------------------------
         * FETCH DRAFT
         * --------------------------------
         */

        queryFn:
            () => {

                if (!draftId) {
                    throw new Error(
                        "Draft ID is required.",
                    );
                }

                return journalService.getDraftById(
                    draftId,
                );
            },


        /**
         * --------------------------------
         * ENABLE QUERY ONLY WHEN ID EXISTS
         * --------------------------------
         */

        enabled:
            Boolean(draftId),
    });
}