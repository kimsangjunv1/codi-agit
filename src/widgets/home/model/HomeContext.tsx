"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type HomePageContextValue = ReturnType<typeof useSearch>;

const HomePageContext = createContext<HomePageContextValue | null>(null);

export function HomePageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <HomePageContext.Provider value={search}>{children}</HomePageContext.Provider>;
}

export function useHomeProvider() {
    const context = useContext(HomePageContext);

    if (!context) {
        throw new Error("useHomeProvider must be used within HomePageProvider");
    }

    return context;
}
