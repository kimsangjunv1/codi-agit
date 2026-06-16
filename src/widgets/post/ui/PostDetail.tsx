"use client";

import { Fragment, memo, useCallback, useEffect, useMemo } from "react";

import { Block, GetPostDetailResponse, PostPrevNextInfo, SectionContent } from "@/entities/post/model/post.type";

import { util } from "@/shared/lib/util";
import { highlightCode } from "@/shared/lib/highlight";
import { sanitizeHtml } from "@/shared/lib/sanitizeHtml";

import useNavigate from "@/shared/hooks/useNavigate";
import { useGetPostDetailQuery, useIncrementPostViewOnVisit } from "@/entities/post/api/post.query";

import UI from "@/shared/ui/common/UIComponent";
import IconComponent from "@/shared/ui/common/IconComponent";
import { BLOCK_COLUMN_CLASS, BLOCK_ROW_CLASS, POST_TIPTAP_CONTENT_CLASS } from "@/widgets/post/ui/blockEditor/blockEditorStyles";
import { isMainBlock } from "@/widgets/post/lib/blockMode";
import GiscusComments from "@/shared/ui/common/GiscusComments";
import AsyncErrorState from "@/shared/ui/common/AsyncErrorState";
import PostHero from "@/widgets/post/ui/PostHero";

import { useToastStore } from "@/shared/stores/useToastStore";
import { useCreatePostStore } from "@/shared/stores/useCreatePostStore";

type PostDetailProps = {
    id: string;
    initialData: GetPostDetailResponse;
};

const PostDetail = ({ id, initialData }: PostDetailProps) => {
    const { setPostIdx } = useCreatePostStore();
    const postIdx = parseInt(id);

    useIncrementPostViewOnVisit(postIdx);

    useEffect(() => {
        setPostIdx(postIdx);
    }, [postIdx, setPostIdx]);

    return (
        <section className="flex flex-col w-full post pb-[7.2rem]">
            <section className="mx-auto post-inner flex flex-col gap-[5.2rem] w-full items-center">
                <RenderContents
                    id={id}
                    initialData={initialData}
                />
            </section>
        </section>
    );
};

const RenderContents = ({ id, initialData }: { id: string; initialData: GetPostDetailResponse }) => {
    const postIdx = parseInt(id);
    const { data: getPostListData, isLoading, isError, error, refetch } = useGetPostDetailQuery(postIdx, initialData);

    const hasContent = Boolean(getPostListData?.result?.title);

    if (isLoading && !hasContent) {
        return (
            <section className="flex items-center justify-center w-full h-[100dvh]">
                <UI.Loading />
            </section>
        );
    }

    if (isError) {
        return (
            <AsyncErrorState
                title="게시물을 불러오지 못했습니다"
                message={error?.message}
                onRetry={() => refetch()}
                className="h-[100dvh]"
            />
        );
    }

    if (getPostListData?.resultCode === "ERROR") {
        return (
            <AsyncErrorState
                title="게시물을 불러오지 못했습니다"
                message={getPostListData.resultMessage}
                onRetry={() => refetch()}
                className="h-[100dvh]"
            />
        );
    }

    const DATA = getPostListData?.result;

    return (
        <>
            <section className="flex flex-col justify-center items-center gap-[3.2rem] h-[100dvh] p-[0.8rem] w-full">
                <PostHero
                    mode="view"
                    imageUrl={DATA?.thumbnail ?? ""}
                    title={DATA?.title ?? ""}
                    summary={DATA?.summary ?? ""}
                    createDate={DATA?.created_at ?? ""}
                    viewCount={DATA?.views ?? 0}
                    likeCount={DATA?.likes ?? 0}
                    thumbnailAlt={DATA?.title ?? ""}
                />
            </section>

            <Contents
                contents={DATA?.contents ?? []}
                prev={DATA?.prev}
                next={DATA?.next}
                postId={id}
            />
        </>
    );
};

const CodeBlockContent = memo(({ content }: { content: string }) => {
    const html = useMemo(() => sanitizeHtml(`<pre class="code-block"><code>${highlightCode(content)}</code></pre>`), [content]);

    return (
        <section className="overflow-x-auto">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>
    );
});
CodeBlockContent.displayName = "CodeBlockContent";

const ContentColumn = memo(({ col, rowLength, onCopySentence }: { col: SectionContent; rowLength: number; onCopySentence: (text: string) => void }) => {
    const sanitizedContent = useMemo(() => (typeof col.content === "string" ? sanitizeHtml(col.content) : ""), [col.content]);
    const subtitle = col.subtitle?.trim() ?? "";
    const title = col.title?.trim() ?? "";
    const showHeading = isMainBlock(col) && Boolean(subtitle || title);
    const columnClassName = `${BLOCK_COLUMN_CLASS} ${rowLength !== 0 ? "flex gap-[2.4rem]" : ""} ${rowLength === 1 ? "tablet:col-span-2" : "tablet:min-h-[36.0rem]"} ${col.type === 0 ? "flex flex-col gap-[1.6rem]" : ""} ${col.type === 1 || col.type === 2 ? "rounded-[2.4rem] overflow-hidden" : ""} ${col.type === 2 ? "flex-col" : ""}`;

    return (
        <section className={columnClassName}>
            {col.type === 0 ? (
                <Fragment>
                    {showHeading ? (
                        <section className="flex flex-col gap-[0.8rem]">
                            {subtitle ? <p className="text-[#676767]">{subtitle}</p> : null}
                            {title ? <h5 className="text-[2.0rem] tablet:text-[2.4rem] font-bold text-[var(--color-gray-1000)]">{title}</h5> : null}
                        </section>
                    ) : null}

                    {typeof col.content === "string" ? (
                        <section
                            className={POST_TIPTAP_CONTENT_CLASS}
                            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                            onClick={(e) => {
                                const target = e.target as HTMLElement;
                                if (target.tagName === "P" || target.closest("p")) {
                                    const paragraph = target.tagName === "P" ? target : target.closest("p");
                                    onCopySentence(paragraph?.textContent ?? "");
                                }
                            }}
                        />
                    ) : (
                        <section className="flex flex-col items-start gap-[1.6rem] overflow-x-auto">
                            {(col.content as Block[]).map((e) =>
                                e.children.map((itemInfo, itemIdx) => (
                                    <p
                                        key={`${col.id}-${itemIdx}`}
                                        style={{
                                            lineHeight: itemInfo.style?.lineHeight,
                                            fontSize: `${itemInfo.style?.fontSize}rem`,
                                            fontWeight: itemInfo.style?.fontWeight,
                                            color: itemInfo.style?.color,
                                            textAlign: itemInfo.style?.textAlign as React.CSSProperties["textAlign"],
                                            background: `${itemInfo.style?.backgroundColor}`,
                                        }}
                                        className="whitespace-break-spaces transition-colors border border-transparent cursor-pointer hover:border-[var(--color-gray-400)] rounded-[0.8rem]"
                                        onClick={() => onCopySentence(itemInfo.value)}
                                    >
                                        {itemInfo.value}
                                    </p>
                                )),
                            )}
                        </section>
                    )}
                </Fragment>
            ) : null}

            {col.type === 1 && col.imageUrl ? (
                <img
                    src={col.imageUrl}
                    alt=""
                    className="w-full rounded-[2.4rem] shadow-[var(--shadow-normal)]"
                />
            ) : null}

            {col.type === 2 ? <CodeBlockContent content={`${col.content}`} /> : null}
        </section>
    );
});
ContentColumn.displayName = "ContentColumn";

const Contents = ({ contents, prev, next, postId }: { contents: SectionContent[][]; prev?: PostPrevNextInfo; next?: PostPrevNextInfo; postId: string }) => {
    const { pushToUrl } = useNavigate();
    const { setToast } = useToastStore();

    const handleCopySentence = useCallback(
        (text: string) => {
            util.dom.setCopyOnClipboard(text);
            setToast({ msg: "선택하신 문장을 복사했어요", time: 2 });
        },
        [setToast],
    );

    return (
        <article className="flex gap-[0.4rem] w-full max-w-[var(--size-tablet)] min-w-0 px-[1.2rem] [content-visibility:auto]">
            <section className="flex flex-col gap-[7.2rem] flex-1 min-w-0">
                {contents?.map((row, rowIdx) => (
                    <section
                        key={rowIdx}
                        className={BLOCK_ROW_CLASS}
                    >
                        {row.map((col) => (
                            <ContentColumn
                                key={col.id}
                                col={col}
                                rowLength={row.length}
                                onCopySentence={handleCopySentence}
                            />
                        ))}
                    </section>
                ))}

                <section className="flex gap-[1.6rem] flex-wrap">
                    <UI.Button
                        className={`flex items-center justify-start gap-[0.8rem] border border-[var(--color-gray-200)] min-w-[calc(var(--size-tablet)/2-(1.6rem*10))] flex-1 p-[1.6rem] rounded-[1.6rem] hover:border-[var(--color-blue-500)] ${prev ? "" : "pointer-events-none"}`}
                        onClick={() => {
                            if (prev) {
                                pushToUrl(`/post/${prev?.idx}`);
                            } else {
                                setToast({ msg: "이전 글이 없어요", time: 2 });
                            }
                        }}
                    >
                        {prev ? (
                            <Fragment>
                                <IconComponent
                                    type="outlined-arrow-below"
                                    alt="테스트"
                                    className="rotate-90"
                                />

                                <div className="flex flex-col gap-[0.8rem]">
                                    <p className="text-left text-[1.2rem] font-semibold text-[var(--color-gray-500)]">이전글</p>
                                    <p className="text-left text-[1.6rem] font-semibold">{prev.title}</p>
                                </div>
                            </Fragment>
                        ) : (
                            <p className="text-[var(--color-gray-500)]">이전글이 없습니다.</p>
                        )}
                    </UI.Button>

                    <UI.Button
                        className={`flex items-center justify-end gap-[0.8rem] border border-[var(--color-gray-200)] min-w-[calc(var(--size-tablet)/2-(1.6rem*10))] flex-1 p-[1.6rem] rounded-[1.6rem] hover:border-[var(--color-blue-500)] ${next ? "" : "pointer-events-none"}`}
                        onClick={() => {
                            if (next) {
                                pushToUrl(`/post/${next?.idx}`);
                            } else {
                                setToast({ msg: "다음 글이 없어요", time: 2 });
                            }
                        }}
                    >
                        {next ? (
                            <Fragment>
                                <div className="flex flex-col gap-[0.8em]">
                                    <p className="text-right text-[1.2rem] font-semibold text-[var(--color-gray-500)]">다음글</p>
                                    <p className="text-right text-[1.6rem] font-semibold">{next.title}</p>
                                </div>
                                <IconComponent
                                    type="outlined-arrow-below"
                                    alt="테스트"
                                    className="rotate-270"
                                />
                            </Fragment>
                        ) : (
                            <p className="text-[var(--color-gray-500)]">다음글이 없습니다.</p>
                        )}
                    </UI.Button>
                </section>

                <GiscusComments
                    term={`post-${postId}`}
                    className="w-full pt-[2.4rem]"
                />
            </section>
        </article>
    );
};

export default PostDetail;
