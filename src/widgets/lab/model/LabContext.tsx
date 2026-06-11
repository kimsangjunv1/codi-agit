"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type LabPageContextValue = ReturnType<typeof useSearch>;

const LabPageContext = createContext<LabPageContextValue | null>(null);

export function LabPageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <LabPageContext.Provider value={search}>{children}</LabPageContext.Provider>;
}

export function useLabProvider() {
    const context = useContext(LabPageContext);

    if (!context) {
        throw new Error("useLabProvider must be used within LabPageProvider");
    }

    return context;
}
