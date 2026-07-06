import journalApi from "@/api/journal.api";

import type {
    CreateJournalRequest,
    UpdateJournalRequest,
    JournalResponse,
    JournalPageResponse,
    JournalSearchCriteria,
} from "@/types/api/journal";

import type { MessageResponse } from "@/types/api/common";

class JournalService{

    async createJournal(request: CreateJournalRequest) : Promise<JournalResponse>{
        return await journalApi.createJournal(request);
    }

    async getJournals(criteria?: JournalSearchCriteria): Promise<JournalPageResponse> {
        return await journalApi.getJournals(criteria);
    }

    async getJournalById(id: string): Promise<JournalResponse> {
        return await journalApi.getJournalById(id);
    }

    async updateJournal(id: string, request: UpdateJournalRequest): Promise<JournalResponse> {
        return await journalApi.updateJournal(id, request);
    }
    
    async deleteJournal(id: string): Promise<MessageResponse> {
        return await journalApi.deleteJournal(id);
    }
    

}

export default new JournalService();