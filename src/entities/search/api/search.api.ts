import { clientApi } from "@/shared/lib/api/client";
import { GetSearchResponse } from "@/entities/search/model/search.type";

const SEARCH_CACHE_TTL = 1000 * 60 * 5;
const searchCache = new Map<string, { data: GetSearchResponse; expiredAt: number }>();

export const getIntegratedSearchFetch = (keyword: string, signal?: AbortSignal) => {
    const normalizedKeyword = keyword.trim().replace(/\s+/g, " ");
    const cached = searchCache.get(normalizedKeyword);

    if (cached && cached.expiredAt > Date.now()) {
        return Promise.resolve(cached.data);
    }

    const params = new URLSearchParams({ keyword: normalizedKeyword });

    return clientApi
        .get<GetSearchResponse>(`/api/v1/get/search?${params.toString()}`, {
            signal,
            skipAuthRedirect: true,
        })
        .then((data) => {
            searchCache.set(normalizedKeyword, {
                data,
                expiredAt: Date.now() + SEARCH_CACHE_TTL,
            });

            return data;
        });
};
