"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type UserManagerPageContextValue = ReturnType<typeof useSearch>;

const UserManagerPageContext = createContext<UserManagerPageContextValue | null>(null);

export function UserManagerPageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <UserManagerPageContext.Provider value={search}>{children}</UserManagerPageContext.Provider>;
}

export function useUserManagerProvider() {
    const context = useContext(UserManagerPageContext);

    if (!context) {
        throw new Error("useUserManagerProvider must be used within UserManagerPageProvider");
    }

    return context;
}
