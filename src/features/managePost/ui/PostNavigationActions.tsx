"use client";

import type { ReactNode } from "react";

import type { PostNavAction } from "@/features/managePost/lib/postNavigationActions";
import type { PostNavVisibility } from "@/features/managePost/lib/postPermissions";
import UI from "@/shared/ui/common/UIComponent";
import IconComponent from "@/shared/ui/common/IconComponent";
import { MaterialIcon } from "@/shared/ui/common/MaterialIcon";

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

const NavDivider = () => <div className="h-full w-[0.1rem] shrink-0 bg-[#ffffff40]" />;

const NavButton = ({ title, icon, onClick, disabled, className = "bg-[#000000c4] hover:bg-[var(--color-blue-500)]" }: NavButtonProps) => (
    <UI.Button
        type="button"
        disabled={disabled}
        className={`flex shrink-0 items-center justify-center gap-[0.8rem] px-[1.2rem] backdrop-blur-2xl transition-colors disabled:opacity-60 ${className}`}
        onClick={onClick}
    >
        {icon}
        <p className="whitespace-nowrap text-[1.8rem] text-white">{title}</p>
    </UI.Button>
);

const PostNavigationActions = ({
    showShare,
    showLike,
    showComments,
    showToc,
    showReading,
    showEdit,
    showDelete,
    likeCount,
    alreadyLiked,
    isDeletePending,
    onAction,
}: PostNavigationActionsProps) => {
    const isLiked = alreadyLiked ?? false;
    const likeLabel = likeCount > 0 ? `좋아요 ${likeCount}` : "좋아요";

    return (
        <>
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
        </>
    );
};

export default PostNavigationActions;
