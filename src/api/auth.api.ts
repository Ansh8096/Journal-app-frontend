import client from "./client";

import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest
} from "@/types/api/auth"

import type { MessageResponse } from "@/types/api/common";

// Because every API module will follow the same structure: AuthApi, JournalApi, UserApi...
class AuthApi{

    async login(request : LoginRequest): Promise<LoginResponse>{
        const { data } = await client.post<LoginResponse>(
            "/auth/login",
            request
        );
        console.log("user is logged in, response: " , data);
        return data;
    }

    async signup(request: RegisterRequest) : Promise<MessageResponse>{
        const { data } = await client.post<MessageResponse>(
            "/auth/signup",
            request
        )
        
        console.log("user is created, response: " , data.message);
        return data;
    }
}

export default new AuthApi();