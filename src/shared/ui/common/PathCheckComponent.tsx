"use client"

import { ReactNode, useEffect, useState } from "react";

import { useLayoutStore } from '@/shared/stores/useLayoutStore';

const MOBILE_QUERY = "(max-width: 960px)";

const PathCheckComponent = ({ children }: { children: ReactNode }) => {
    const [ isNowOnMobile, setIsNowOnMobile ] = useState<boolean>(false);
    
    const { setIsMobile } = useLayoutStore();

    useEffect(() => {
        const mediaQuery = window.matchMedia(MOBILE_QUERY);
        const handleResize = () => setIsNowOnMobile(mediaQuery.matches);

        handleResize();
        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    useEffect(() => {
        setIsMobile(isNowOnMobile);
    }, [ isNowOnMobile, setIsMobile ])

    return children
}

export default PathCheckComponent
