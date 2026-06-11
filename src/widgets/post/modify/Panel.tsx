"use client";

import { PostModifyEditor } from "@/features/managePost";
import PageFrame from "@/widgets/layout/PageFrame";

type PostModifyPanelProps = {
    id: string;
};

export default function Panel({ id }: PostModifyPanelProps) {
    return (
        <PageFrame
            id="post-modify"
            className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}
        >
            <PostModifyEditor id={id} />
        </PageFrame>
    );
}
