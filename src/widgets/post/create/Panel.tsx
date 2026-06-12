"use client";

import { PostCreatePageProvider } from "./model/PostCreateContext";
import * as PostCreateLayer from "@/widgets/post/create/ui";

export default function Panel() {
    return (
        <PostCreatePageProvider>
            <PostCreateLayer.PostEditor />
            <PostCreateLayer.Modal />
        </PostCreatePageProvider>
    );
}
