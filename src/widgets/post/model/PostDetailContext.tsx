"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type PostDetailPageContextValue = ReturnType<typeof useSearch>;

const PostDetailPageContext = createContext<PostDetailPageContextValue | null>(null);

export function PostDetailPageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <PostDetailPageContext.Provider value={search}>{children}</PostDetailPageContext.Provider>;
}

export function usePostDetailProvider() {
    const context = useContext(PostDetailPageContext);

    if (!context) {
        throw new Error("usePostDetailProvider must be used within PostDetailPageProvider");
    }

    return context;
}
