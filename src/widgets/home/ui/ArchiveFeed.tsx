"use client";

import { useEffect, useLayoutEffect } from "react";

import UI from "@/shared/ui/common/UIComponent";
import { GetPostLatestListResponse } from "@/entities/post/model/post.type";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import { clampPageScroll } from "@/widgets/home/lib/clampPageScroll";

import ArchiveList from "./ArchiveList";
import ArchiveSlider from "./ArchiveSlider";

type ArchiveFeedProps = {
    initialData: GetPostLatestListResponse;
};

const ArchiveFeed = ({ initialData }: ArchiveFeedProps) => {
    const { mainViewMode, categoryFilter } = useLayoutStore();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [mainViewMode]);

    useLayoutEffect(() => {
        clampPageScroll();
        requestAnimationFrame(clampPageScroll);
    }, [mainViewMode, categoryFilter]);

    if (mainViewMode === 1) {
        return (
            <section className="flex-1 w-full h-full overflow-hidden">
                <UI.ErrorBoundaryWrapper>
                    <ArchiveSlider initialData={initialData} />
                </UI.ErrorBoundaryWrapper>
            </section>
        );
    }

    return (
        <section className="w-full h-full pt-[var(--header-height)] pb-[calc(1.6rem*4)]">
            <UI.ErrorBoundaryWrapper>
                <ArchiveList />
            </UI.ErrorBoundaryWrapper>
        </section>
    );
};

export default ArchiveFeed;
