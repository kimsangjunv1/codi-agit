"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type CommentManagerPageContextValue = ReturnType<typeof useSearch>;

const CommentManagerPageContext = createContext<CommentManagerPageContextValue | null>(null);

export function CommentManagerPageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <CommentManagerPageContext.Provider value={search}>{children}</CommentManagerPageContext.Provider>;
}

export function useCommentManagerProvider() {
    const context = useContext(CommentManagerPageContext);

    if (!context) {
        throw new Error("useCommentManagerProvider must be used within CommentManagerPageProvider");
    }

    return context;
}
