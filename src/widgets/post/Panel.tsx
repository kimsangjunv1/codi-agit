"use client";

import { PostDetailPageProvider } from "./model/PostDetailContext";
import * as PostLayer from "@/widgets/post/ui";

type PostDetailPanelProps = {
    id: string;
};

export default function Panel({ id }: PostDetailPanelProps) {
    return (
        <PostDetailPageProvider>
            <PostLayer.PostDetail id={id} />
            <PostLayer.Modal />
        </PostDetailPageProvider>
    );
}
