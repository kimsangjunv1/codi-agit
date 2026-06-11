"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type PostModifyPageContextValue = ReturnType<typeof useSearch>;

const PostModifyPageContext = createContext<PostModifyPageContextValue | null>(null);

export function PostModifyPageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <PostModifyPageContext.Provider value={search}>{children}</PostModifyPageContext.Provider>;
}

export function usePostModifyProvider() {
    const context = useContext(PostModifyPageContext);

    if (!context) {
        throw new Error("usePostModifyProvider must be used within PostModifyPageProvider");
    }

    return context;
}
