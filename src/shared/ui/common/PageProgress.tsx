"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { finishNProgress, configureNProgress } from "@/shared/lib/nprogress";

const PageProgress = () => {
    const pathname = usePathname();

    useEffect(() => {
        configureNProgress();
    }, []);

    useEffect(() => {
        finishNProgress();
    }, [pathname]);

    return null;
};

export default PageProgress;
