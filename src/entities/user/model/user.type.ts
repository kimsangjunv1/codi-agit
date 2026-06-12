import { ApiResponse } from "@/shared/model/common.type";

export interface SetUserPayload {
    name: string;
    password: string;
    email: string;
    inviteCode: string;
}

export interface SetLoginPayload {
    password: string;
    email: string;
}

export interface UserManagerItem {
    id: string;
    name: string;
    email: string;
    created_at: string;
}

export type GetUserManagerListResponse = ApiResponse<UserManagerItem[]>;
