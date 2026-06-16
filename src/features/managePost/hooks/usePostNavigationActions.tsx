"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

import { useGetPostDetailQuery } from "@/entities/post/api/post.query";
import type { SectionContent } from "@/entities/post/model/post.type";
import {
    useDeletePostWithFeedback,
    useLikeIncrementWithFeedback,
    usePatchPostWithFeedback,
    useSetPostWithFeedback,
} from "@/features/managePost/hooks/usePostMutations";
import { preparePostPayloadForSave } from "@/features/managePost/lib/preparePostSave";
import { canManagePost, getVisiblePostNavActions } from "@/features/managePost/lib/postPermissions";
import { useCreatePostStore } from "@/shared/stores/useCreatePostStore";
import { useModalStore } from "@/shared/stores/useModalStore";
import { useToastStore } from "@/shared/stores/useToastStore";

type UsePostNavigationActionsParams = {
    postIdx: number;
    isView: boolean;
    isCreate: boolean;
    isEdit: boolean;
    pushToUrl: (url: string) => void;
};

export const usePostNavigationActions = ({
    postIdx,
    isView,
    isCreate,
    isEdit,
    pushToUrl,
}: UsePostNavigationActionsParams) => {
    const router = useRouter();
    const { data: session } = useSession();
    const { setToast } = useToastStore();
    const { setModal } = useModalStore();
    const { title, summary, thumbnail, category_idx, post_idx } = useCreatePostStore();

    const { data: postDetailData } = useGetPostDetailQuery(postIdx, undefined, {
        enabled: !!postIdx && isView,
    });

    const { mutateAsync: patchPostFetchAsync, isPending: isPatchPending } = usePatchPostWithFeedback();
    const { mutateAsync: setPostFetchAsync, isPending: isSetPending } = useSetPostWithFeedback();
    const { mutate: likeIncrementFetch } = useLikeIncrementWithFeedback();
    const { mutateAsync: deletePostFetchAsync, isPending: isDeletePending } = useDeletePostWithFeedback();

    const canManage = useMemo(
        () =>
            canManagePost({
                userId: session?.user?.id,
                userRole: session?.user?.role,
                postOwnerId: postDetailData?.result?.user_id,
            }),
        [postDetailData?.result?.user_id, session?.user?.id, session?.user?.role],
    );

    const isLoggedIn = !!session?.user?.id;

    const visibleActions = useMemo(
        () => getVisiblePostNavActions({ canManage, isLoggedIn }),
        [canManage, isLoggedIn],
    );

    const savePost = async (contents: SectionContent[][]) => {
        if (!title) {
            setToast({ msg: "제목을 입력해주세요", time: 2 });
            return;
        }

        if (!summary) {
            setToast({ msg: "요약을 입력해주세요", time: 2 });
            return;
        }

        if (!thumbnail) {
            setToast({ msg: "썸네일을 선택해주세요", time: 2 });
            return;
        }

        try {
            const payload = await preparePostPayloadForSave({
                title,
                summary,
                thumbnail,
                category_idx,
                contents,
            });

            if (isCreate) {
                await setPostFetchAsync(payload);
            } else if (isEdit) {
                await patchPostFetchAsync({ data: payload, idx: post_idx });
            }
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "저장 중 오류가 발생했습니다.";
            setToast({ msg: message, time: 2 });
        }
    };

    const openDeletePostModal = () => {
        const postTitle = postDetailData?.result?.title;

        setModal({
            type: "CHECK",
            title: "게시물을 삭제할까요?",
            content: (
                <article className="flex flex-col gap-[1.2rem]">
                    <p className="text-[var(--color-gray-600)]">삭제 대상: {postTitle}</p>
                    <p className="text-[1.2rem] text-[var(--color-gray-500)]">
                        연결된 댓글과 조회 기록도 함께 삭제됩니다.
                    </p>
                </article>
            ),
            cancel: { text: "취소" },
            confirm: {
                text: "삭제하기",
                onClick: async () => {
                    await deletePostFetchAsync({ idx: postIdx });
                    router.refresh();
                    pushToUrl("/");
                },
            },
            isOpen: true,
        });
    };

    const handleNavAction = (action: (typeof visibleActions)[number]["action"]) => {
        if (action === "like") {
            if (!session?.user?.id) {
                setToast({ msg: "로그인이 필요합니다", time: 2 });
                return;
            }

            likeIncrementFetch({ postId: postIdx, userId: session.user.id });
            return;
        }

        if (action === "edit") {
            pushToUrl(`/post/${post_idx}/modify`);
            return;
        }

        if (action === "delete") {
            openDeletePostModal();
        }
    };

    return {
        postTitle: postDetailData?.result?.title,
        alreadyLiked: postDetailData?.result?.alreadyLiked,
        visibleActions,
        isPatchPending,
        isSetPending,
        isDeletePending,
        isSavePending: isPatchPending || isSetPending,
        savePost,
        handleNavAction,
    };
};
