import { clientApi } from "@/shared/lib/api/client";
import { serverApi } from "@/shared/lib/api/server";
import {
    DeletePostManagerResponse,
    GetPostDetailResponse,
    GetPostLatestListResponse,
    GetPostListResponse,
    GetPostManagerListResponse,
    PatchPostResponse,
    SetIncrementPostLikeResponse,
    SetIncrementPostViewResponse,
    SetPostResponse,
} from "@/entities/post/model/post.type";

/**
 * 포스트 - 목록 조회
 */
export const getPostListFetch = () => {
    const url = `/api/v1/get/post`;
    return clientApi.get<GetPostListResponse>(url);
};

/**
 * 포스트 - 상세 조회
 */
export const getPostDetailFetch = (idx: number) => {
    const url = `/api/v1/get/post/${idx}`;
    return clientApi.get<GetPostDetailResponse>(url, {
        headers: { "x-skip-tracking": "true" },
    });
};

/**
 * 포스트 - 상세 ISR/SSR 조회 (조회수 증가 없음)
 */
export const getPostDetailServerFetch = (idx: number) =>
    serverApi.get<GetPostDetailResponse>(`/api/v1/get/post/${idx}`, {
        headers: { "x-internal-fetch": "isr" },
        throwOnError: false,
    });

/**
 * 포스트 - 최근 생성한 목록 조회 (10개)
 */
export const getPostLatestListFetch = () => {
    const url = `/api/v1/get/post/latest`;
    return clientApi.get<GetPostLatestListResponse>(url);
};

/**
 * 포스트 - 최근 목록 SSR 조회
 */
export const getPostLatestListServerFetch = () =>
    serverApi.get<GetPostLatestListResponse>("/api/v1/get/post/latest");

/**
 * 포스트 - 생성
 */
export const setPostFetch = (data: unknown) =>
    clientApi.post<SetPostResponse>("/api/v1/set/post/create", data);

/**
 * 포스트 - 수정
 */
export const patchPostFetch = ({ data, idx }: { data: unknown; idx: number }) =>
    clientApi.patch<PatchPostResponse>(`/api/v1/patch/post/${idx}`, data);

export const getPostManagerListFetch = () =>
    clientApi.get<GetPostManagerListResponse>("/api/v1/get/post/manager");

export const deletePostManagerFetch = (data: { idx: number }) =>
    clientApi.delete<DeletePostManagerResponse>("/api/v1/delete/post/manager", { body: data });

/**
 * 포스트 - 조회수 증가(사용안함)
 */
export const setPostViewIncrementFetch = (data: { postId: number; userId?: string }) =>
    clientApi.post<SetIncrementPostViewResponse>(`/api/v1/set/view/increment`, data);

export const setPostLikeIncrementFetch = (data: { postId: number; userId?: string }) =>
    clientApi.post<SetIncrementPostLikeResponse>(`/api/v1/set/like/increment`, data);
