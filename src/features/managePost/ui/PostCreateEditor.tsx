"use client";

import { Fragment, useEffect } from "react";

import SortableBlock from "@/features/managePost/ui/SortableBlock";
import PostHero from "@/features/managePost/ui/PostHero";
import PostAttachedImageList from "@/features/managePost/ui/PostAttachedImageList";
import PostTocPanel from "@/features/managePost/ui/PostTocPanel";

import { useGetCategoryListQuery } from "@/entities/category/api/category.query";

import { useBlockStore } from "@/features/managePost/model/useEditorBlockStore";
import { useCreatePostStore } from "@/shared/stores/useCreatePostStore";
import { usePostDraftImageStore } from "@/shared/stores/usePostDraftImageStore";

const PostCreateEditor = () => {
    const { reset: resetBlocks } = useBlockStore();
    const { reset: resetPost, setTitle, setSummary, setThumbnail, setCategoryIdx, category_idx } = useCreatePostStore();
    const { reset: resetDraftImages } = usePostDraftImageStore();
    const { data: getCategoryListData } = useGetCategoryListQuery();

    useEffect(() => {
        resetBlocks();
        resetPost();
        resetDraftImages();
    }, [resetBlocks, resetPost, resetDraftImages]);

    useEffect(() => {
        const firstCategory = getCategoryListData?.result?.find((e) => e.is_enabled);
        if (firstCategory && category_idx === 0) {
            setCategoryIdx(firstCategory.idx);
        }
    }, [getCategoryListData, category_idx, setCategoryIdx]);

    return (
        <section className="flex flex-col w-full post pb-[7.2rem]">
            <section className="mx-auto post-inner flex flex-col gap-[5.2rem] w-full items-center bg-[#efefef]">
                <RenderContents
                    onTitleChange={setTitle}
                    onSummaryChange={setSummary}
                    onThumbnailChange={setThumbnail}
                    onCategoryChange={setCategoryIdx}
                />
            </section>

            <PostTocPanel />
        </section>
    );
};

const RenderContents = ({
    onTitleChange,
    onSummaryChange,
    onThumbnailChange,
    onCategoryChange,
}: {
    onTitleChange: (value: string) => void;
    onSummaryChange: (value: string) => void;
    onThumbnailChange: (value: string) => void;
    onCategoryChange: (value: number) => void;
}) => {
    const { title, summary, thumbnail, category_idx } = useCreatePostStore();

    return (
        <Fragment>
            <section className="flex flex-col justify-center items-center gap-[3.2rem] h-[100svh] w-full">
                <PostHero
                    mode="edit"
                    imageUrl={thumbnail}
                    title={title}
                    summary={summary}
                    categoryIdx={category_idx}
                    editLabel="작성 중"
                    onTitleChange={onTitleChange}
                    onSummaryChange={onSummaryChange}
                    onThumbnailChange={onThumbnailChange}
                    onCategoryChange={onCategoryChange}
                />
            </section>

            <Contents />
        </Fragment>
    );
};

const Contents = () => {
    return (
        <article className="flex gap-[0.4rem] w-full max-w-[var(--size-tablet)] min-w-0">
            <section className="flex flex-col gap-[7.2rem] flex-1 min-w-0">
                <SortableBlock />
                <PostAttachedImageList />
            </section>
        </article>
    );
};

export default PostCreateEditor;
