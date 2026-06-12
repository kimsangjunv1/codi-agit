export const POST_NAV_ACTIONS = [
    {
        title: "공유하기",
        icon: "outlined-copy",
        action: "share" as const,
    },
    {
        title: "게시물 삭제하기",
        icon: "outlined-cross",
        action: "delete" as const,
    },
    {
        title: "좋아요",
        icon: "outlined-like",
        action: "like" as const,
    },
    {
        title: "수정하기",
        icon: "outlined-edit",
        action: "edit" as const,
    },
] as const;

export type PostNavAction = (typeof POST_NAV_ACTIONS)[number]["action"];
