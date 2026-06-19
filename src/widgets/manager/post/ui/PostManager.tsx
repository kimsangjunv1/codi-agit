"use client";

import PostThumbnail from "@/shared/ui/common/PostThumbnail";

import { useGetPostManagerListQuery } from "@/entities/post/api/post.query";
import type { PostManagerItem } from "@/entities/post/model/post.type";
import useNavigate from "@/shared/hooks/useNavigate";
import { util } from "@/shared/lib/util";
import { useModalStore } from "@/shared/stores/useModalStore";
import UI from "@/shared/ui/common/UIComponent";
import { useDeletePostManagerWithToast } from "@/widgets/manager/post/hooks/usePostManagerMutations";
import ManagerDetailMetaGrid from "@/widgets/manager/ui/ManagerDetailMetaGrid";
import ManagerDetailPane from "@/widgets/manager/ui/ManagerDetailPane";
import ManagerDetailPaneHeader from "@/widgets/manager/ui/ManagerDetailPaneHeader";
import ManagerEmptyState from "@/widgets/manager/ui/ManagerEmptyState";
import ManagerListError from "@/widgets/manager/ui/ManagerListError";
import ManagerListItemCard from "@/widgets/manager/ui/ManagerListItemCard";
import ManagerListPane from "@/widgets/manager/ui/ManagerListPane";
import ManagerListPaneHeader from "@/widgets/manager/ui/ManagerListPaneHeader";
import ManagerListSkeleton from "@/widgets/manager/ui/ManagerListSkeleton";
import useManagerSelection from "@/widgets/manager/ui/useManagerSelection";

const PostManager = () => {
    const { pushToUrl } = useNavigate();
    const { setModal } = useModalStore();
    const { data, isLoading, isError, error, refetch } = useGetPostManagerListQuery();
    const { mutate: deletePost } = useDeletePostManagerWithToast();
    const { selectedItem, setSelectedItem } = useManagerSelection();
    const list = data?.result ?? [];
    const selectedPost = list.find((item) => String(item.idx) === selectedItem);

    const deletePostModal = (item: PostManagerItem) =>
        setModal({
            type: "CHECK",
            title: "게시물을 삭제할까요?",
            content: <div className="flex flex-col gap-[1rem]"><p className="text-[var(--color-gray-600)]">삭제 대상: {item.title}</p><p className="text-[1.2rem] text-[var(--color-gray-500)]">연결된 댓글과 조회 기록도 함께 삭제됩니다.</p></div>,
            cancel: { text: "취소" },
            confirm: { text: "삭제하기", onClick: () => deletePost({ idx: item.idx }) },
            isOpen: true,
        });

    return (
        <div className="contents">
            <ManagerListPane>
                <ManagerListPaneHeader title="게시물 관리" count={list.length} description="등록된 게시글을 조회·수정·삭제합니다." />
                <div className="p-[1.2rem]">
                    {isLoading ? <ManagerListSkeleton /> : isError || data?.resultCode === "ERROR" ? (
                        <ManagerListError message={isError ? error?.message : data?.resultMessage} onRetry={() => refetch()} />
                    ) : list.length === 0 ? <ManagerEmptyState variant="no-list" title="등록된 게시물이 없습니다" /> : (
                        <section className="flex flex-col gap-[0.8rem]">
                            {list.map((item) => (
                                <ManagerListItemCard key={item.idx} isSelected={selectedItem === String(item.idx)} onClick={() => setSelectedItem(item.idx)}>
                                    <div className="flex gap-[1.2rem]">
                                        <div className="relative size-[4.8rem] shrink-0 overflow-hidden rounded-[0.6rem] bg-[var(--color-gray-100)]">
                                            <PostThumbnail
                                                readinessKey={`manager-post-thumbnail-${item.idx}`}
                                                seed={item.idx}
                                                src={item.thumbnail}
                                                alt=""
                                                fill
                                                sizes="48px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-[1.4rem] font-semibold">{item.title}</p>
                                            <p className="mt-[0.4rem] truncate text-[1.1rem] text-[var(--color-gray-500)]">{item.category?.title ?? "미분류"} · 조회 {item.views ?? 0} · {util.string.getCurrentDate(item.created_at)}</p>
                                        </div>
                                    </div>
                                </ManagerListItemCard>
                            ))}
                        </section>
                    )}
                </div>
            </ManagerListPane>
            <ManagerDetailPane>
                {selectedPost ? (
                    <article>
                        <ManagerDetailPaneHeader title={selectedPost.title} description={selectedPost.summary} />
                        <div className="flex flex-col gap-[2.4rem] p-[2.4rem]">
                            <div className="relative min-h-[24rem] overflow-hidden rounded-[0.8rem] bg-[var(--color-gray-100)]">
                                <PostThumbnail
                                    readinessKey={`manager-post-detail-thumbnail-${selectedPost.idx}`}
                                    seed={selectedPost.idx}
                                    src={selectedPost.thumbnail}
                                    alt={selectedPost.title}
                                    fill
                                    sizes="50vw"
                                    className="object-cover"
                                />
                            </div>
                            <ManagerDetailMetaGrid items={[
                                { label: "Category", value: selectedPost.category?.title ?? "미분류" },
                                { label: "Views", value: selectedPost.views ?? 0 },
                                { label: "Created", value: util.string.getCurrentDate(selectedPost.created_at, 4) },
                            ]} />
                            <div className="flex gap-[0.8rem]">
                                <UI.Button className="rounded-[0.6rem] border border-[var(--color-gray-300)] px-[1.2rem] py-[0.7rem]" onClick={() => pushToUrl(`/post/${selectedPost.idx}`)}>보기</UI.Button>
                                <UI.Button className="rounded-[0.6rem] border border-[var(--color-gray-300)] px-[1.2rem] py-[0.7rem]" onClick={() => pushToUrl(`/post/${selectedPost.idx}/modify`)}>수정</UI.Button>
                                <UI.Button className="rounded-[0.6rem] border border-[var(--color-red-200)] px-[1.2rem] py-[0.7rem] text-[var(--color-red-600)]" onClick={() => deletePostModal(selectedPost)}>삭제</UI.Button>
                            </div>
                        </div>
                    </article>
                ) : <ManagerEmptyState variant="no-item" />}
            </ManagerDetailPane>
        </div>
    );
};

export default PostManager;
