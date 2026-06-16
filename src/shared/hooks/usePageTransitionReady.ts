import { useLayoutEffect } from "react";

import { useLayoutStore } from "@/shared/stores/useLayoutStore";

const usePageTransitionReady = (key: string, isReady: boolean) => {
    const transitionPhase = useLayoutStore((state) => state.transitionPhase);
    const registerPageBlocker = useLayoutStore((state) => state.registerPageBlocker);
    const releasePageBlocker = useLayoutStore((state) => state.releasePageBlocker);

    const isWaiting = transitionPhase === "waiting";

    useLayoutEffect(() => {
        if (!isWaiting) return;

        if (!isReady) {
            registerPageBlocker(key);
            return () => releasePageBlocker(key);
        }

        releasePageBlocker(key);
    }, [key, isReady, isWaiting, registerPageBlocker, releasePageBlocker]);
};

export default usePageTransitionReady;
