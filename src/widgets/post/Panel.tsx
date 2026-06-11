"use client";

import PageFrame from "@/widgets/layout/PageFrame";

import * as PostLayer from "@/widgets/post/ui";

type PostDetailPanelProps = {
    id: string;
};

export default function Panel({ id }: PostDetailPanelProps) {
    return (
        <PageFrame id="post-detail" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <PostLayer.PostDetail id={id} />
        </PageFrame>
    );
}
