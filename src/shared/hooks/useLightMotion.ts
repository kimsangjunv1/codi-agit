"use client";

import { useLayoutStore } from "@/shared/stores/useLayoutStore";

import { useReducedMotion } from "./useReducedMotion";

/** 모바일·접근성 설정에서 GPU 친화 모션만 사용 */
export function useLightMotion() {
    const reducedMotion = useReducedMotion();
    const isMobile = useLayoutStore((state) => state.isMobile);

    return reducedMotion || isMobile;
}
