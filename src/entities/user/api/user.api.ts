import { clientApi } from "@/shared/lib/api/client";
import { serverApi } from "@/shared/lib/api/server";
import {
    GetUserManagerListResponse,
    SetLoginPayload,
    SetUserPayload,
} from "@/entities/user/model/user.type";

/**
 * 유저 - 회원가입
 */
export const setUserFetch = (data: SetUserPayload) =>
    clientApi.post<unknown>("/api/v1/set/user", data);

/**
 * 유저 - 로그인
 */
export const setLoginFetch = (data: SetLoginPayload) =>
    serverApi.post<unknown>("/api/v1/set/login", data);

export const getUserManagerListFetch = () =>
    clientApi.get<GetUserManagerListResponse>("/api/v1/get/users/manager");
