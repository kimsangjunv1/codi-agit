"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type InvitationManagerPageContextValue = ReturnType<typeof useSearch>;

const InvitationManagerPageContext = createContext<InvitationManagerPageContextValue | null>(null);

export function InvitationManagerPageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <InvitationManagerPageContext.Provider value={search}>{children}</InvitationManagerPageContext.Provider>;
}

export function useInvitationManagerProvider() {
    const context = useContext(InvitationManagerPageContext);

    if (!context) {
        throw new Error("useInvitationManagerProvider must be used within InvitationManagerPageProvider");
    }

    return context;
}
