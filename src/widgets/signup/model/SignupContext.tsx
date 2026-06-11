"use client";

import { createContext, useContext, type ReactNode } from "react";

import useSearch from "./useSearch";

type SignupPageContextValue = ReturnType<typeof useSearch>;

const SignupPageContext = createContext<SignupPageContextValue | null>(null);

export function SignupPageProvider({ children }: { children: ReactNode }) {
    const search = useSearch();

    return <SignupPageContext.Provider value={search}>{children}</SignupPageContext.Provider>;
}

export function useSignupProvider() {
    const context = useContext(SignupPageContext);

    if (!context) {
        throw new Error("useSignupProvider must be used within SignupPageProvider");
    }

    return context;
}
