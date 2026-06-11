"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type PostManagerPageContextValue = ReturnType<typeof useSearch>;

const PostManagerPageContext = createContext<PostManagerPageContextValue | null>(null);

export function PostManagerPageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <PostManagerPageContext.Provider value={search}>{children}</PostManagerPageContext.Provider>;
}

export function usePostManagerProvider() {
    const context = useContext(PostManagerPageContext);

    if (!context) {
        throw new Error("usePostManagerProvider must be used within PostManagerPageProvider");
    }

    return context;
}
