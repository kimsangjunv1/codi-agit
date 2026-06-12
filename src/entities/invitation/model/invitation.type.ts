import { ApiResponse } from "@/shared/model/common.type";

export interface SetInvitationCodePayload {
    is_active: boolean;
    expire_at: string | null;
}

export interface PatchInvitationCodePayload {
    id: number;
    is_active: boolean;
    expire_at: string | null;
}

export interface DeleteInvitationCodePayload {
    id: number;
}

export interface InvitationCodeListItem {
    id: number;
    code: string;
    is_used: boolean;
    used_by: string | null;
    created_at: string;
    is_active: boolean;
    expire_at: string | null;
}

export type GetInvitationCodeListOnManagerResponse = ApiResponse<InvitationCodeListItem[]>;

export type GetInvitationCodeCheckResponse = ApiResponse<{
    is_active: boolean;
    is_used: boolean;
    expire_at: string;
} | null> & {
    statusCode: number;
};
