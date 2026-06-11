"use client";

import { PostCreateEditor } from "@/features/managePost";
import PageFrame from "@/widgets/layout/PageFrame";

export default function Panel() {
    return (
        <PageFrame
            id="post-create"
            className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}
        >
            <PostCreateEditor />
        </PageFrame>
    );
}
