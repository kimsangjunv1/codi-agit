"use client";

import { Fragment, useEffect, useRef } from "react";

import SortableBlock from "@/widgets/post/ui/SortableBlock";
import PostHero from "@/widgets/post/ui/PostHero";
import PostAttachedImageList from "@/widgets/post/ui/PostAttachedImageList";

import { useGetPostDetailQuery } from "@/entities/post/api/post.query";
import { collectImagesFromPost } from "@/features/managePost/lib/preparePostSave";

import { SectionContent } from "@/entities/post/model/post.type";
import { useCreatePostStore } from "@/shared/stores/useCreatePostStore";
import { usePostDraftImageStore } from "@/shared/stores/usePostDraftImageStore";
import PostTocPanel from "@/widgets/post/ui/PostTocPanel";

const PostModifyEditor = ({ id }: { id: string }) => {
    const { setPostIdx } = useCreatePostStore();

    useEffect(() => {
        setPostIdx(parseInt(id));
    }, [id, setPostIdx]);

    return (
        <section className="flex flex-col w-full post pb-[7.2rem]">
            <section className="mx-auto post-inner flex flex-col gap-[5.2rem] w-full items-center">
                <RenderContents id={id} />
            </section>

            <PostTocPanel />
        </section>
    );
};

const RenderContents = ({ id }: { id: string }) => {
    const { data: getPostListData } = useGetPostDetailQuery(parseInt(id));
    const data = getPostListData?.result;

    const { title, summary, thumbnail, category_idx, setTitle, setSummary, setCategoryIdx, setThumbnail } = useCreatePostStore();
    const { reset: resetDraftImages, addFromUrl } = usePostDraftImageStore();
    const initializedRef = useRef(false);

    useEffect(() => {
        initializedRef.current = false;
    }, [id]);

    useEffect(() => {
        if (data?.title && data?.summary) {
            setTitle(data.title);
            setSummary(data.summary);
            setCategoryIdx(data.category_idx);
            setThumbnail(data.thumbnail ?? "");
        }
    }, [data, setTitle, setSummary, setCategoryIdx, setThumbnail]);

    useEffect(() => {
        if (!data || initializedRef.current) return;

        initializedRef.current = true;
        resetDraftImages();
        collectImagesFromPost(data.thumbnail ?? "", data.contents ?? []).forEach((url) => addFromUrl(url));
    }, [data, resetDraftImages, addFromUrl]);

    return (
        <Fragment>
            <section className="flex flex-col justify-center items-center gap-[3.2rem] h-[100dvh] p-[0.8rem] w-full">
                <PostHero
                    mode="edit"
                    imageUrl={thumbnail}
                    title={title}
                    summary={summary}
                    categoryIdx={category_idx}
                    editLabel="수정 중"
                    onTitleChange={setTitle}
                    onSummaryChange={setSummary}
                    onThumbnailChange={setThumbnail}
                    onCategoryChange={setCategoryIdx}
                />
            </section>

            <Contents contents={data?.contents ?? []} />
        </Fragment>
    );
};

const Contents = ({ contents }: { contents: SectionContent[][] }) => {
    return (
        <article className="flex gap-[0.4rem] w-full max-w-[var(--size-tablet)] min-w-0">
            <section className="flex flex-col gap-[7.2rem] flex-1 min-w-0">
                <SortableBlock contents={contents} />
                <PostAttachedImageList />
            </section>
        </article>
    );
};

export default PostModifyEditor;
