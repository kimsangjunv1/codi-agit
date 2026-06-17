"use client";

import { useEffect, useLayoutEffect } from "react";

import UI from "@/shared/ui/common/UIComponent";
import { GetPostLatestListResponse } from "@/entities/post/model/post.type";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import { clampPageScroll } from "@/widgets/home/lib/clampPageScroll";

import ArchiveList from "./ArchiveList";
import ArchiveSliderHorizontal from "./ArchiveSliderHorizontal";
import ArchiveSliderVertical from "./ArchiveSliderVertical";
import HomeViewModeFloatingMenu from "./HomeViewModeFloatingMenu";

type ArchiveFeedProps = {
    initialData: GetPostLatestListResponse;
};

const ArchiveFeed = ({ initialData }: ArchiveFeedProps) => {
    const { mainViewMode, categoryFilter, isMobile } = useLayoutStore();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [mainViewMode]);

    useLayoutEffect(() => {
        clampPageScroll();
        requestAnimationFrame(clampPageScroll);
    }, [mainViewMode, categoryFilter]);

    if (mainViewMode === 1) {
        return (
            <>
                <section className="flex-1 w-full h-full overflow-hidden">
                    <UI.ErrorBoundaryWrapper>
                        {isMobile ? (
                            <ArchiveSliderVertical initialData={initialData} />
                        ) : (
                            <ArchiveSliderHorizontal initialData={initialData} />
                        )}
                    </UI.ErrorBoundaryWrapper>
                </section>
                <HomeViewModeFloatingMenu />
            </>
        );
    }

    return (
        <>
            <section className="w-full h-full mobile:pt-[calc(var(--header-height)/2)] pc:pt-[var(--header-height)] pb-[calc((1.6rem*4)+env(safe-area-inset-bottom))]">
                <UI.ErrorBoundaryWrapper>
                    <ArchiveList />
                </UI.ErrorBoundaryWrapper>
            </section>
            <HomeViewModeFloatingMenu />
        </>
    );
};

export default ArchiveFeed;
