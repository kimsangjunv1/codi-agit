"use client";

import PageFrame from "@/widgets/layout/PageFrame";

import * as PostManagerLayer from "@/widgets/manager/post/ui";

export default function Panel() {
    return (
        <PageFrame id="manager-post" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <PostManagerLayer.PostManager />
        </PageFrame>
    );
}
