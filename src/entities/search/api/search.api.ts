import { clientApi } from "@/shared/lib/api/client";
import { GetSearchResponse } from "@/entities/search/model/search.type";

export const getIntegratedSearchFetch = (keyword: string, signal?: AbortSignal) => {
    const params = new URLSearchParams({ keyword });

    return clientApi.get<GetSearchResponse>(`/api/v1/get/search?${params.toString()}`, {
        signal,
        skipAuthRedirect: true,
    });
};
