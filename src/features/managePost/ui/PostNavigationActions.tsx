"use client";

import UI from "@/shared/ui/common/UIComponent";
import IconComponent from "@/shared/ui/common/IconComponent";

import type { POST_NAV_ACTIONS } from "@/features/managePost/lib/postNavigationActions";

type PostNavActionItem = (typeof POST_NAV_ACTIONS)[number];

type PostNavigationActionsProps = {
    actions: readonly PostNavActionItem[];
    alreadyLiked?: boolean;
    isDeletePending: boolean;
    onAction: (action: (typeof POST_NAV_ACTIONS)[number]["action"]) => void;
};

const PostNavigationActions = ({ actions, alreadyLiked, isDeletePending, onAction }: PostNavigationActionsProps) => (
    <>
        {actions.map((item) => {
            const isLiked = item.action === "like" && alreadyLiked;
            const isDelete = item.action === "delete";

            return (
                <UI.Button
                    key={item.action}
                    type="button"
                    disabled={isDelete && isDeletePending}
                    className={`flex justify-center items-center transition-colors rounded-full gap-[0.8rem] w-[5.6rem] h-[5.6rem] disabled:opacity-60 backdrop-blur-2xl ${
                        isLiked ? "bg-[#00ff61]" : isDelete ? "bg-[#000000c4] hover:bg-[var(--color-pink-500)]" : "bg-[#000000c4] hover:bg-[var(--color-blue-500)]"
                    }`}
                    onClick={() => onAction(item.action)}
                >
                    <IconComponent
                        type={item.icon}
                        alt={item.title}
                        width={24}
                        height={24}
                        className={isLiked ? "" : "invert-100"}
                    />
                </UI.Button>
            );
        })}
    </>
);

export default PostNavigationActions;
