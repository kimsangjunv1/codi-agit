type ServerFetchOptions = Omit<RequestInit, "body"> & {
    body?: unknown;
    throwOnError?: boolean;
};

import { getSiteUrl } from "@/shared/lib/siteUrl";

export async function serverFetch<T>(url: string, options: ServerFetchOptions = {}): Promise<T> {
    const target = url.startsWith("http") ? url : `${getSiteUrl()}${url}`;
    const response = await fetch(target, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers ?? {}),
        },
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
    const data = await response.json().catch(() => null);

    if (!response.ok && options.throwOnError !== false) {
        throw new Error(data?.resultMessage ?? data?.message ?? "서버 API 요청에 실패했습니다.");
    }

    return data as T;
}

export const serverApi = {
    get: <T>(url: string, options?: ServerFetchOptions) => serverFetch<T>(url, options),
    post: <T>(url: string, body?: unknown, options?: ServerFetchOptions) => serverFetch<T>(url, { ...options, method: "POST", body }),
    patch: <T>(url: string, body?: unknown, options?: ServerFetchOptions) => serverFetch<T>(url, { ...options, method: "PATCH", body }),
    delete: <T>(url: string, options?: ServerFetchOptions) => serverFetch<T>(url, { ...options, method: "DELETE" }),
};
