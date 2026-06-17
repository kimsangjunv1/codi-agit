"use client";

import { useLayoutEffect, useRef } from "react";

import { useGetPostListQuery } from "@/entities/post/api/post.query";
import usePageTransitionReady from "@/shared/hooks/usePageTransitionReady";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import { clampPageScroll } from "@/widgets/home/lib/clampPageScroll";

import ArchiveListDefaultItem from "./ArchiveListDefaultItem";
import ArchiveListGridItem from "./ArchiveListGridItem";
import { FeedEmpty, FeedError, FeedLoading } from "./FeedStatus";
import ListViewModeToggle from "./ListViewModeToggle";
import { AnimatePresence } from "motion/react";

const ArchiveList = () => {
    const { data, isLoading, isError, error, refetch } = useGetPostListQuery();
    const { categoryFilter, listViewMode } = useLayoutStore();
    const listRef = useRef<HTMLElement | null>(null);

    const posts = data?.result ?? [];
    const filtered = categoryFilter !== 999 ? posts.filter((item) => item.category_idx === categoryFilter) : posts;
    const isDataReady = !isLoading || posts.length > 0 || isError || data?.resultCode === "ERROR";

    usePageTransitionReady("archive-list-data", isDataReady);

    useLayoutEffect(() => {
        clampPageScroll();

        const listEl = listRef.current;
        if (!listEl || typeof ResizeObserver === "undefined") return;

        const ro = new ResizeObserver(() => {
            requestAnimationFrame(clampPageScroll);
        });
        ro.observe(listEl);

        return () => ro.disconnect();
    }, [categoryFilter, filtered.length, listViewMode]);

    if (isLoading && posts.length === 0) {
        return <FeedLoading />;
    }

    if (isError) {
        return (
            <FeedError
                message={error?.message}
                onRetry={() => refetch()}
            />
        );
    }

    if (data?.resultCode === "ERROR") {
        return (
            <FeedError
                message={data.resultMessage}
                onRetry={() => refetch()}
            />
        );
    }

    if (posts.length === 0) {
        return <FeedEmpty />;
    }

    if (filtered.length === 0) {
        return <FeedEmpty title="해당 카테고리에 게시물이 없습니다" />;
    }

    return (
        <>
            <article
                ref={listRef}
                // className="relative grid grid-cols-4 gap-[32px]"
                // className={listViewMode === "grid" ? "relative grid grid-cols-4 gap-[4px] px-[1.2rem] mx-auto max-w-[var(--size-tablet)]" : "relative flex flex-col gap-6"}
            >
                {/* grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 */}
                <div className="relative w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-[2.4rem_0.4rem] max-w-[var(--size-pc)] mx-auto px-[2.0rem]">
                    {/* <div className="relative w-full grid grid-cols-[repeat(auto-fit,minmax(calc(1.6rem*16),1fr))] gap-[2.4rem_0.4rem] max-w-[var(--size-pc)] mx-auto px-[2.0rem]"> */}
                    <AnimatePresence mode="popLayout">
                        {filtered.map(
                            (post) => (
                                <ArchiveListDefaultItem
                                    key={post.idx + post.title}
                                    post={post}
                                />
                            ),
                            // listViewMode === "grid" ? (
                            //     <ArchiveListGridItem
                            //         key={post.idx + post.title}
                            //         post={post}
                            //     />
                            // ) : (
                            //     <ArchiveListDefaultItem
                            //         key={post.idx + post.title}
                            //         post={post}
                            //     />
                            // ),
                        )}
                    </AnimatePresence>
                </div>
            </article>

            <ListViewModeToggle />
        </>
    );
};

export default ArchiveList;
