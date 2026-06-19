import { ApiResponse } from "@/shared/model/common.type";

export type SearchResultType = "post";

export interface SearchResultItem {
    id: string;
    type: SearchResultType;
    group: string;
    title: string;
    description: string;
    url: string;
    createdAt?: string;
}

export type GetSearchResponse = ApiResponse<SearchResultItem[]>;
