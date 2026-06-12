"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type CategoryManagerPageContextValue = ReturnType<typeof useSearch>;

const CategoryManagerPageContext = createContext<CategoryManagerPageContextValue | null>(null);

export function CategoryManagerPageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <CategoryManagerPageContext.Provider value={search}>{children}</CategoryManagerPageContext.Provider>;
}

export function useCategoryManagerProvider() {
    const context = useContext(CategoryManagerPageContext);

    if (!context) {
        throw new Error("useCategoryManagerProvider must be used within CategoryManagerPageProvider");
    }

    return context;
}
