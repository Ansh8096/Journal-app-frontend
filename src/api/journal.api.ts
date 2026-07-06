import client from "./client";

import type {
    CreateJournalRequest,
    UpdateJournalRequest,
    JournalResponse,
    JournalPageResponse,
    JournalSearchCriteria,
} from "@/types/api/journal";

import type { MessageResponse } from "@/types/api/common";

class JournalApi{

    async createJournal(request: CreateJournalRequest): Promise<JournalResponse> {

        const { data } = await client.post<JournalResponse>(
            "/journals",
            request
        );

        return data;
    }


    // Instead of manually building query strings, we'll let Axios handle it...
    async getJournals(params?: JournalSearchCriteria): Promise<JournalPageResponse> {

        const { data } = await client.get<JournalPageResponse>(
            "/journals",
            {
                params,
            }
        );

        return data;
    }

    async getJournalById( id: string): Promise<JournalResponse> {
        
        const { data } = await client.get<JournalResponse>(
            `journals/${id}`
        );
        
        return data;
    }

    async updateJournal(
        id: string,
        request: UpdateJournalRequest
    ): Promise<JournalResponse> {

        const { data } = await client.patch<JournalResponse>(
            `/journals/${id}`,
            request
        );

        return data;
    }

    async deleteJournal(id: string): Promise<MessageResponse> {

        const { data } = await client.delete<MessageResponse>(
            `/journals/${id}`
        );

        return data;
    }

}

export default new JournalApi();