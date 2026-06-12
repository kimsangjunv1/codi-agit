"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type LoginPageContextValue = ReturnType<typeof useSearch>;

const LoginPageContext = createContext<LoginPageContextValue | null>(null);

export function LoginPageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <LoginPageContext.Provider value={search}>{children}</LoginPageContext.Provider>;
}

export function useLoginProvider() {
    const context = useContext(LoginPageContext);

    if (!context) {
        throw new Error("useLoginProvider must be used within LoginPageProvider");
    }

    return context;
}
