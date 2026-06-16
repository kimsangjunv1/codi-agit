"use client";

import ReactLenis from "lenis/react";
import { usePathname } from "next/navigation";

const LENIS_ROUTES = new Set(["/", "/resume"]);

export default function LenisProvider() {
    const pathname = usePathname();

    if (!LENIS_ROUTES.has(pathname)) {
        return null;
    }

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.14,
            }}
        />
    );
}
