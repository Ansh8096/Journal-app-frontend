import userApi from "@/api/user.api";

import type {
    UserProfile,
    UpdateProfileRequest,
    ChangePasswordRequest,
    ChangeEmailRequest,
    ChangeUsernameRequest,
    DeleteAccountRequest,
} from "@/types/api/user";

import type { MessageResponse } from "@/types/api/common";


class UserService{

    async getProfile(): Promise<UserProfile> {
        return await userApi.getProfile();
    }

    async updateProfile(request: UpdateProfileRequest): Promise<MessageResponse>{
        return await userApi.updateProfile(request);
    }

    async changePassword(request: ChangePasswordRequest) : Promise<MessageResponse>{
        return await userApi.changePassword(request);
    }

    async changeEmail(request: ChangeEmailRequest): Promise<MessageResponse> {
        return await userApi.changeEmail(request);
    }

    async changeUsername(request: ChangeUsernameRequest): Promise<MessageResponse> {
        return await userApi.changeUsername(request);
    }

    async deleteAccount(request: DeleteAccountRequest): Promise<MessageResponse> {
        return await userApi.deleteAccount(request);
    }

    
}

export default new UserService();