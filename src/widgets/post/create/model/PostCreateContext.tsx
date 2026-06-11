"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type PostCreatePageContextValue = ReturnType<typeof useSearch>;

const PostCreatePageContext = createContext<PostCreatePageContextValue | null>(null);

export function PostCreatePageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <PostCreatePageContext.Provider value={search}>{children}</PostCreatePageContext.Provider>;
}

export function usePostCreateProvider() {
    const context = useContext(PostCreatePageContext);

    if (!context) {
        throw new Error("usePostCreateProvider must be used within PostCreatePageProvider");
    }

    return context;
}
