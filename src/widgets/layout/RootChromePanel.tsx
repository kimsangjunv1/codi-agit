"use client";

import { ReactNode } from "react";

import Footer from "@/shared/ui/layout/Footer";
import Header from "@/widgets/layout/chrome/Header";
import MobileMenu from "@/shared/ui/layout/MobileMenu";
import Navigation from "@/widgets/layout/chrome/Navigation";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import { getResumeMainWidthSvw, useResumeProjectPanelStore } from "@/shared/stores/useResumeProjectPanelStore";

type RootChromePanelProps = {
    children: ReactNode;
};

export default function RootChromePanel({ children }: RootChromePanelProps) {
    const isMobile = useLayoutStore((state) => state.isMobile);
    const isOpen = useResumeProjectPanelStore((state) => state.isOpen);
    const isExpanded = useResumeProjectPanelStore((state) => state.isExpanded);
    const panelWidthSvw = useResumeProjectPanelStore((state) => state.panelWidthSvw);
    const isResizing = useResumeProjectPanelStore((state) => state.isResizing);

    const mainWidthSvw = getResumeMainWidthSvw({ isOpen, isExpanded, panelWidthSvw }, isMobile);
    const transition = isResizing ? "none" : "width 280ms cubic-bezier(0.22, 1, 0.36, 1)";

    return (
        <>
            <Header />
            <div
                className="relative overflow-x-clip"
                style={{
                    width: `${mainWidthSvw}svw`,
                    transition,
                    pointerEvents: mainWidthSvw === 0 ? "none" : undefined,
                }}
                aria-hidden={mainWidthSvw === 0}
            >
                <Navigation />
                <MobileMenu />
                {children}
                <Footer />
            </div>
        </>
    );
}
