"use client";

import PageFrame from "@/widgets/layout/PageFrame";

import * as CommentManagerLayer from "@/widgets/manager/comment/ui";

export default function Panel() {
    return (
        <PageFrame id="manager-comment" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <CommentManagerLayer.CommentManager />
        </PageFrame>
    );
}
