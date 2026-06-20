"use client";

import { useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import type { PostNavAction } from "@/features/managePost/lib/postNavigationActions";
import type { PostNavVisibility } from "@/features/managePost/lib/postPermissions";
import UI from "@/shared/ui/common/UIComponent";
import IconComponent from "@/shared/ui/common/IconComponent";
import { MaterialIcon } from "@/shared/ui/common/MaterialIcon";
import { getPostRouteFlags } from "../lib/postRoute";
import useNavigate from "@/shared/hooks/useNavigate";
import { usePostNavigationActions } from "../hooks/usePostNavigationActions";
import { useParams } from "next/navigation";
import { useScrollProgressBar } from "@/shared/hooks/useScrollProgress";

type PostNavigationActionsProps = PostNavVisibility & {
    likeCount: number;
    alreadyLiked?: boolean;
    isDeletePending: boolean;
    onAction: (action: PostNavAction) => void;
};

type NavButtonProps = {
    title: string;
    icon: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
};
const springTransition = {
    type: "spring" as const,
    mass: 0.1,
    stiffness: 100,
    damping: 10,
};

const NavDivider = () => <div className="h-full w-[0.1rem] shrink-0 bg-[#ffffff40]" />;

const NavButton = ({ title, icon, onClick, disabled, className = "bg-[#000000c4] hover:bg-[var(--color-blue-500)]" }: NavButtonProps) => (
    <UI.Button
        type="button"
        disabled={disabled}
        className={`flex shrink-0 items-center justify-center gap-[0.8rem] px-[1.2rem] backdrop-blur-2xl transition-colors disabled:opacity-60 ${className}`}
        onClick={onClick}
    >
        {icon}
        {/* <p className="whitespace-nowrap text-[1.8rem] text-white">{title}</p> */}
    </UI.Button>
);

const PostNavigationActions = ({ showShare, showLike, showComments, showToc, showReading, showEdit, showDelete, likeCount, alreadyLiked, isDeletePending, onAction }: PostNavigationActionsProps) => {
    const params = useParams();
    const postIdx = parseInt(params?.id as string);
    const progressBarRef = useRef<HTMLDivElement>(null);
    useScrollProgressBar(progressBarRef);

    const { currentPathName, pushToUrl } = useNavigate();
    const isLiked = alreadyLiked ?? false;
    const likeLabel = likeCount > 0 ? `좋아요 ${likeCount}` : "좋아요";

    const { IS_ROUTE_POST, IS_ROUTE_POST_VIEW, IS_ROUTE_POST_EDIT, IS_ROUTE_POST_CREATE } = getPostRouteFlags(currentPathName);
    const { postTitle, isSavePending, savePost } = usePostNavigationActions({
        postIdx,
        isView: IS_ROUTE_POST_VIEW,
        isCreate: IS_ROUTE_POST_CREATE,
        isEdit: IS_ROUTE_POST_EDIT,
        pushToUrl,
    });
    return (
        <>
            {IS_ROUTE_POST_VIEW && (
                <section className="flex-1 flex items-center pl-[1.2rem]">
                    <h2 className="mobile:text-[1.8rem] pc:text-[2.4rem] leading-[1.5] font-bold text-white">{postTitle}</h2>
                    {/* <h2 className="mobile:text-[1.4rem] pc:text-[1.8rem] leading-[1.5] font-bold text-white">{postTitle}</h2> */}
                </section>
            )}

            <section className="flex overflow-auto flex-1">
                {showShare ? (
                    <NavButton
                        title="공유하기"
                        icon={
                            <IconComponent
                                type="outlined-copy"
                                alt="공유하기"
                                width={24}
                                height={24}
                                className="invert-100"
                            />
                        }
                        onClick={() => onAction("share")}
                    />
                ) : null}

                {showShare && (showLike || showComments || showToc || showReading || showEdit || showDelete) ? <NavDivider /> : null}

                {showLike ? (
                    <NavButton
                        title={likeLabel}
                        className={isLiked ? "bg-[#00ff61]" : "bg-[#000000c4] hover:bg-[var(--color-blue-500)]"}
                        icon={
                            <IconComponent
                                type="outlined-like"
                                alt="좋아요"
                                width={24}
                                height={24}
                                className={isLiked ? "" : "invert-100"}
                            />
                        }
                        onClick={() => onAction("like")}
                    />
                ) : null}

                {showLike && (showComments || showToc || showReading || showEdit || showDelete) ? <NavDivider /> : null}

                {showComments ? (
                    <NavButton
                        title="댓글"
                        icon={
                            <MaterialIcon
                                name="chat_bubble_outline"
                                size={24}
                                className="text-white"
                            />
                        }
                        onClick={() => onAction("comments")}
                    />
                ) : null}

                {showComments && (showToc || showReading || showEdit || showDelete) ? <NavDivider /> : null}

                {showToc ? (
                    <NavButton
                        title="목차"
                        icon={
                            <MaterialIcon
                                name="format_list_bulleted"
                                size={24}
                                className="text-white"
                            />
                        }
                        onClick={() => onAction("toc")}
                    />
                ) : null}

                {showToc && (showReading || showEdit || showDelete) ? <NavDivider /> : null}

                {showReading ? (
                    <NavButton
                        title="읽기 설정"
                        icon={
                            <MaterialIcon
                                name="text_fields"
                                size={24}
                                className="text-white"
                            />
                        }
                        onClick={() => onAction("reading")}
                    />
                ) : null}

                {showReading && (showEdit || showDelete) ? <NavDivider /> : null}

                {showEdit ? (
                    <NavButton
                        title="수정하기"
                        icon={
                            <IconComponent
                                type="outlined-edit"
                                alt="수정하기"
                                width={24}
                                height={24}
                                className="invert-100"
                            />
                        }
                        onClick={() => onAction("edit")}
                    />
                ) : null}

                {showEdit && showDelete ? <NavDivider /> : null}

                {showDelete ? (
                    <NavButton
                        title="게시물 삭제하기"
                        disabled={isDeletePending}
                        className="bg-[var(--color-pink-500)] hover:bg-[var(--color-pink-500)]"
                        icon={
                            <IconComponent
                                type="outlined-cross"
                                alt="게시물 삭제하기"
                                width={24}
                                height={24}
                                className="invert-100"
                            />
                        }
                        onClick={() => onAction("delete")}
                    />
                ) : null}
            </section>
        </>
    );
};

export default PostNavigationActions;
