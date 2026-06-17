"use client";

import ReactLenis from "lenis/react";
import { usePathname } from "next/navigation";

import { useLayoutStore } from "@/shared/stores/useLayoutStore";

const LENIS_ROUTES = new Set(["/resume"]);

export default function LenisProvider() {
    const pathname = usePathname();
    const isMobile = useLayoutStore((state) => state.isMobile);

    if (!LENIS_ROUTES.has(pathname) || isMobile) {
        return null;
    }

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.2,
                // lerp: 0.26,
                // smoothWheel: true,
                // wheelMultiplier: 1,
                // syncTouch: true,
                // syncTouchLerp: 1,
                // touchInertiaExponent: 1,
                // touchMultiplier: 1,
                // duration: 0.1,
                // easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            }}
            // easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        />
    );
}
