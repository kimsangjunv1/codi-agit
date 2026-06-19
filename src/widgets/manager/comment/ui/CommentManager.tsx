"use client";

import { useGetCommentManagerListQuery } from "@/entities/comment/api/comment.query";
import type { CommentManagerItem } from "@/entities/comment/model/comment.type";
import useNavigate from "@/shared/hooks/useNavigate";
import { util } from "@/shared/lib/util";
import { useModalStore } from "@/shared/stores/useModalStore";
import UI from "@/shared/ui/common/UIComponent";
import { useDeleteCommentWithToast } from "@/widgets/manager/comment/hooks/useCommentMutations";
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

const CommentManager = () => {
    const { pushToUrl } = useNavigate();
    const { setModal } = useModalStore();
    const { data, isLoading, isError, error, refetch } = useGetCommentManagerListQuery();
    const { mutate: deleteComment } = useDeleteCommentWithToast();
    const { selectedItem, setSelectedItem } = useManagerSelection();
    const list = data?.result ?? [];
    const selectedComment = list.find((item) => String(item.idx) === selectedItem);

    const deleteCommentModal = (item: CommentManagerItem) =>
        setModal({
            type: "CHECK",
            title: "댓글을 삭제할까요?",
            content: <p className="text-[var(--color-gray-600)]">{item.author}: {item.msg}</p>,
            cancel: { text: "취소" },
            confirm: { text: "삭제하기", onClick: () => deleteComment({ idx: item.idx }) },
            isOpen: true,
        });

    return (
        <div className="contents">
            <ManagerListPane>
                <ManagerListPaneHeader title="댓글 관리" count={list.length} description="등록된 댓글을 조회·삭제합니다." />
                <div className="p-[1.2rem]">
                    {isLoading ? <ManagerListSkeleton /> : isError || data?.resultCode === "ERROR" ? (
                        <ManagerListError message={isError ? error?.message : data?.resultMessage} onRetry={() => refetch()} />
                    ) : list.length === 0 ? <ManagerEmptyState variant="no-list" title="등록된 댓글이 없습니다" /> : (
                        <section className="flex flex-col gap-[0.8rem]">
                            {list.map((item) => (
                                <ManagerListItemCard key={item.idx} isSelected={selectedItem === String(item.idx)} onClick={() => setSelectedItem(item.idx)}>
                                    <div className="flex items-center gap-[0.8rem]">
                                        <p className="text-[1.3rem] font-semibold">{item.author}</p>
                                        {item.is_admin && <span className="rounded-full bg-[var(--color-brand-100)] px-[0.6rem] py-[0.1rem] text-[1rem] text-[var(--color-brand-700)]">관리자</span>}
                                    </div>
                                    <p className="mt-[0.6rem] truncate text-[1.2rem] text-[var(--color-gray-700)]">{item.msg}</p>
                                    <p className="mt-[0.4rem] truncate text-[1.1rem] text-[var(--color-gray-500)]">{item.posts?.title ?? "연결 게시물"} · {util.string.getCurrentDate(item.created_at)}</p>
                                </ManagerListItemCard>
                            ))}
                        </section>
                    )}
                </div>
            </ManagerListPane>
            <ManagerDetailPane>
                {selectedComment ? (
                    <article>
                        <ManagerDetailPaneHeader title={selectedComment.author} description={selectedComment.posts?.title} />
                        <div className="flex flex-col gap-[2.4rem] p-[2.4rem]">
                            <p className="whitespace-pre-wrap break-words border-y border-[var(--color-gray-300)] py-[2.4rem] text-[1.5rem] leading-[1.8] text-[var(--color-gray-800)]">{selectedComment.msg}</p>
                            <ManagerDetailMetaGrid items={[
                                { label: "Author", value: selectedComment.author },
                                { label: "Role", value: selectedComment.is_admin ? "관리자" : "일반" },
                                { label: "Post", value: selectedComment.posts?.title ?? selectedComment.post_id },
                                { label: "Created", value: util.string.getCurrentDate(selectedComment.created_at, 4) },
                            ]} />
                            <div className="flex gap-[0.8rem]">
                                <UI.Button className="rounded-[0.6rem] border border-[var(--color-gray-300)] px-[1.2rem] py-[0.7rem]" onClick={() => pushToUrl(`/post/${selectedComment.post_id}`)}>게시물 이동</UI.Button>
                                <UI.Button className="rounded-[0.6rem] border border-[var(--color-red-200)] px-[1.2rem] py-[0.7rem] text-[var(--color-red-600)]" onClick={() => deleteCommentModal(selectedComment)}>삭제</UI.Button>
                            </div>
                        </div>
                    </article>
                ) : <ManagerEmptyState variant="no-item" />}
            </ManagerDetailPane>
        </div>
    );
};

export default CommentManager;
