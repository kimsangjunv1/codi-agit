import { ApiResponse } from "@/shared/model/common.type";

export interface SetCategoryPayload {
    title: string;
    description: string;
}

export interface PatchCategoryPayload {
    idx: number;
    title?: string;
    description?: string;
    is_enabled?: boolean;
}

export interface DeleteCategoryPayload {
    idx: number;
}

export interface CategoryItem {
    idx: number;
    title: string;
    is_enabled: boolean;
    description: string;
}

export interface CategoryItemManager extends CategoryItem {
    created_at: string;
}

export type GetCategoryListResponse = ApiResponse<CategoryItem[]>;
export type GetCategoryListOnManagerResponse = ApiResponse<CategoryItemManager[]>;
