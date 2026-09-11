import { create } from "zustand";

export const DEFAULT_RESUME_PANEL_WIDTH_SVW = 50;
export const MIN_RESUME_PANEL_WIDTH_SVW = 28;
export const MAX_RESUME_PANEL_WIDTH_SVW = 72;

type ResumeProjectPanelStore = {
    isOpen: boolean;
    isExpanded: boolean;
    panelWidthSvw: number;
    isResizing: boolean;
    open: () => void;
    close: () => void;
    setExpanded: (expanded: boolean) => void;
    toggleExpanded: () => void;
    setPanelWidthSvw: (width: number) => void;
    setIsResizing: (resizing: boolean) => void;
};

export const clampResumePanelWidth = (width: number) =>
    Math.min(MAX_RESUME_PANEL_WIDTH_SVW, Math.max(MIN_RESUME_PANEL_WIDTH_SVW, width));

export const getResumeMainWidthSvw = (
    state: Pick<ResumeProjectPanelStore, "isOpen" | "isExpanded" | "panelWidthSvw">,
    isMobile: boolean,
) => {
    if (!state.isOpen) return 100;
    if (isMobile || state.isExpanded) return 0;
    return 100 - state.panelWidthSvw;
};

export const useResumeProjectPanelStore = create<ResumeProjectPanelStore>((set) => ({
    isOpen: false,
    isExpanded: false,
    panelWidthSvw: DEFAULT_RESUME_PANEL_WIDTH_SVW,
    isResizing: false,
    open: () =>
        set({
            isOpen: true,
            isExpanded: false,
        }),
    close: () =>
        set({
            isOpen: false,
            isExpanded: false,
            isResizing: false,
            panelWidthSvw: DEFAULT_RESUME_PANEL_WIDTH_SVW,
        }),
    setExpanded: (isExpanded) => set({ isExpanded }),
    toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
    setPanelWidthSvw: (width) => set({ panelWidthSvw: clampResumePanelWidth(width) }),
    setIsResizing: (isResizing) => set({ isResizing }),
}));
