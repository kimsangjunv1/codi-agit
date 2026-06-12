"use client";

import { PostModifyPageProvider } from "./model/PostModifyContext";
import * as PostModifyLayer from "@/widgets/post/modify/ui";

type PostModifyPanelProps = {
    id: string;
};

export default function Panel({ id }: PostModifyPanelProps) {
    return (
        <PostModifyPageProvider>
            <PostModifyLayer.PostEditor id={id} />
            <PostModifyLayer.Modal />
        </PostModifyPageProvider>
    );
}
