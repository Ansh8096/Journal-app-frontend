import client from "./client";

import type {
    UserProfile,
    UpdateProfileRequest,
    ChangePasswordRequest,
    ChangeEmailRequest,
    ChangeUsernameRequest,
    DeleteAccountRequest,
} from "@/types/api/user";

import type { MessageResponse } from "@/types/api/common";

class UserApi{

    async getProfile(): Promise<UserProfile>{
        const { data } = await client.get<UserProfile>("/users/me")
        return data;
    }

    async updateProfile(request: UpdateProfileRequest): Promise<MessageResponse> {

        const { data } = await client.patch<MessageResponse>(
            "/users/me",
            request
        );

        return data;
    }

    async changePassword( request: ChangePasswordRequest): Promise<MessageResponse> {

        const { data } = await client.patch<MessageResponse>(
            "/users/me/password",
            request
        );

        return data;
    }

    async changeEmail(request: ChangeEmailRequest): Promise<MessageResponse> {

        const { data } = await client.patch<MessageResponse>(
            "/users/me/email",
            request
        );

        return data;
    }

    async changeUsername(request: ChangeUsernameRequest): Promise<MessageResponse> {

        const { data } = await client.patch<MessageResponse>(
            "/users/me/username",
            request
        );

        return data;
    }

    async deleteAccount(request: DeleteAccountRequest): Promise<MessageResponse> {
    
        // Axios supports sending a request body with DELETE, but it has to be passed in the config object...
        const { data } = await client.delete<MessageResponse>(
            "/users/me",
            {
                data: request,
            }
        );
    
        return data;
    }

}

export default new UserApi();