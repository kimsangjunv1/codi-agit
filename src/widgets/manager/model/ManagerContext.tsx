"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type ManagerPageContextValue = ReturnType<typeof useSearch>;

const ManagerPageContext = createContext<ManagerPageContextValue | null>(null);

export function ManagerPageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <ManagerPageContext.Provider value={search}>{children}</ManagerPageContext.Provider>;
}

export function useManagerProvider() {
    const context = useContext(ManagerPageContext);

    if (!context) {
        throw new Error("useManagerProvider must be used within ManagerPageProvider");
    }

    return context;
}
