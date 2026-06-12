"use client";

import { useLayoutEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";

import { useGetPostListQuery } from "@/entities/post/api/post.query";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import { clampPageScroll } from "@/widgets/home/lib/clampPageScroll";

import ArchiveListDefaultItem from "./ArchiveListDefaultItem";
import ArchiveListGridItem from "./ArchiveListGridItem";
import { FeedEmpty, FeedError, FeedLoading } from "./FeedStatus";
import ListViewModeToggle from "./ListViewModeToggle";

const ArchiveList = () => {
    const { data, isLoading, isError, error, refetch } = useGetPostListQuery();
    const { categoryFilter, listViewMode } = useLayoutStore();
    const listRef = useRef<HTMLElement | null>(null);

    const posts = data?.result ?? [];
    const filtered = categoryFilter !== 999 ? posts.filter((item) => item.category_idx === categoryFilter) : posts;

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
        return <FeedError message={error?.message} onRetry={() => refetch()} />;
    }

    if (data?.resultCode === "ERROR") {
        return <FeedError message={data.resultMessage} onRetry={() => refetch()} />;
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
                className={
                    listViewMode === "grid"
                        ? "grid grid-cols-4 gap-[4px] px-[1.2rem] mx-auto max-w-[var(--size-tablet)]"
                        : "flex flex-col gap-6"
                }
            >
                <AnimatePresence mode="popLayout">
                    {filtered.map((post) =>
                        listViewMode === "grid" ? (
                            <ArchiveListGridItem key={post.idx} post={post} />
                        ) : (
                            <ArchiveListDefaultItem key={post.idx} post={post} />
                        ),
                    )}
                </AnimatePresence>
            </article>
            <ListViewModeToggle />
        </>
    );
};

export default ArchiveList;
