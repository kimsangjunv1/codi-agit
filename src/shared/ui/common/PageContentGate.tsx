"use client";

import { ReactNode } from "react";

import { useLayoutStore } from "@/shared/stores/useLayoutStore";

type PageContentGateProps = {
    children: ReactNode;
};

const PageContentGate = ({ children }: PageContentGateProps) => {
    const isPageContentVisible = useLayoutStore((state) => state.isPageContentVisible);

    if (!isPageContentVisible) {
        return null;
    }

    return children;
};

export default PageContentGate;
