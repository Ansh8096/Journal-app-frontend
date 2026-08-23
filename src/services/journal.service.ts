import journalApi from "@/api/journal.api";

import type {
    CreateJournalRequest,
    UpdateJournalRequest,
    JournalResponse,
    JournalPageResponse,
    JournalSearchCriteria,
    UpdateFavoriteRequest,
    JournalStatisticsResponse,
    DownloadJournalResponse,
    CreateDraftRequest,
    UpdateDraftRequest,
    DraftJournalQuery,
    DraftOverview,
} from "@/types/api/journal";

import type { MessageResponse } from "@/types/api/common";

class JournalService {

    private buildMultipartFormData(
        fieldName: "journal" | "draft",
        request:
            | CreateJournalRequest
            | CreateDraftRequest
            | UpdateDraftRequest
            | UpdateJournalRequest,
        images?: File[]
    ): FormData {


        const formData = new FormData();

        formData.append(
            fieldName,
            new Blob(
                [JSON.stringify(request)],
                {
                    type: "application/json",
                }
            )
        );

        images?.forEach(image =>
            formData.append(
                "images",
                image
            )
        );

        return formData;
    }

    private buildImageFormData(
        image: File
    ): FormData {

        const formData = new FormData();

        formData.append(
            "image",
            image
        );

        return formData;
    }

    private buildImagesFormData(
        images: File[]
    ): FormData {

        const formData = new FormData();

        images.forEach(image =>
            formData.append(
                "images",
                image
            )
        );

        return formData;
    }

    async createJournal(
        request: CreateJournalRequest,
        images?: File[]
    ): Promise<JournalResponse> {

        const formData =
            this.buildMultipartFormData(
                "journal",
                request,
                images
            );

        return await journalApi.createJournal(formData);
    }

    async getJournals(criteria?: JournalSearchCriteria): Promise<JournalPageResponse> {
        return await journalApi.getJournals(criteria);
    }

    async getJournalById(id: string): Promise<JournalResponse> {
        return await journalApi.getJournalById(id);
    }

    async updateJournal(
        id: string,
        request: UpdateJournalRequest,
        images?: File[]
    ): Promise<JournalResponse> {

        const formData =
            this.buildMultipartFormData(
                "journal",
                request,
                images
            );

        return await journalApi.updateJournal(
            id,
            formData
        );
    }

    async deleteJournal(id: string): Promise<MessageResponse> {
        return await journalApi.deleteJournal(id);
    }

    async uploadJournalImages(
        journalId: string,
        images: File[]
    ): Promise<JournalResponse> {

        const formData = this.buildImagesFormData(images);

        return await journalApi.uploadJournalImages(
            journalId,
            formData
        );
    }

    async replaceJournalImage(
        journalId: string,
        publicId: string,
        image: File
    ): Promise<JournalResponse> {

        const formData = this.buildImageFormData(image);

        return await journalApi.replaceJournalImage(
            journalId,
            publicId,
            formData
        );
    }

    async deleteJournalImage(
        journalId: string,
        publicId: string
    ): Promise<JournalResponse> {

        return await journalApi.deleteJournalImage(
            journalId,
            publicId
        );
    }

    async setCoverImage(
        journalId: string,
        publicId: string
    ): Promise<JournalResponse> {

        return await journalApi.setCoverImage(
            journalId,
            publicId
        );
    }

    async updateFavorite(
        journalId: string,
        favorite: UpdateFavoriteRequest
    ): Promise<JournalResponse> {

        return await journalApi.updateFavorite(
            journalId,
            favorite
        );
    }

    async getJournalStatistics(): Promise<JournalStatisticsResponse> {
        return await journalApi.getJournalStatistics();
    }

    async downloadJournal(
        journalId: string
    ): Promise<DownloadJournalResponse> {
        return await journalApi.downloadJournal(
            journalId
        );
    }

    async createDraft(
        request: CreateDraftRequest,
        images?: File[]
    ): Promise<JournalResponse> {

        const formData =
            this.buildMultipartFormData(
                "draft",
                request,
                images
            );

        return await journalApi.createDraft(
            formData
        );
    }

    async updateDraft(
        journalId: string,
        request: UpdateDraftRequest,
        images?: File[]
    ): Promise<JournalResponse> {

        const formData =
            this.buildMultipartFormData(
                "draft",
                request,
                images
            );

        return await journalApi.updateDraft(
            journalId,
            formData
        );
    }

    async getDrafts(
        params?: DraftJournalQuery
    ): Promise<JournalPageResponse> {

        const cleanParams: DraftJournalQuery = {
            ...params,

            query:
                params?.query?.trim() || undefined,

            tag:
                params?.tag?.trim() || undefined,

            from:
                params?.from || undefined,

            to:
                params?.to || undefined,
        };

        return await journalApi.getDrafts(
            cleanParams
        );
    }

    async getDraftOverview(): Promise<DraftOverview> {
        return await journalApi.getDraftOverview();
    }

    async getDraftById(
        journalId: string
    ): Promise<JournalResponse> {

        return await journalApi.getDraftById(
            journalId
        );
    }

    async deleteDraft(
        journalId: string
    ): Promise<MessageResponse> {

        return await journalApi.deleteDraft(
            journalId
        );
    }

    async replaceDraftImage(
        journalId: string,
        publicId: string,
        image: File
    ): Promise<JournalResponse> {

        const formData =
            this.buildImageFormData(
                image
            );

        return await journalApi.replaceDraftImage(
            journalId,
            publicId,
            formData
        );
    }

    async setDraftCoverImage(
        journalId: string,
        publicId: string
    ): Promise<JournalResponse> {

        return await journalApi.setDraftCoverImage(
            journalId,
            publicId
        );
    }

    async deleteDraftImage(
        journalId: string,
        publicId: string
    ): Promise<JournalResponse> {

        return await journalApi.deleteDraftImage(
            journalId,
            publicId
        );
    }

    async publishDraft(
        journalId: string
    ): Promise<JournalResponse> {

        return await journalApi.publishDraft(
            journalId
        );
    }
}


export default new JournalService();