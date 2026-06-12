"use client";

import { PostManagerPageProvider } from "./model/PostManagerContext";
import * as PostManagerLayer from "@/widgets/manager/post/ui";

export default function Panel() {
    return (
        <PostManagerPageProvider>
            <PostManagerLayer.PostManager />
            <PostManagerLayer.Modal />
        </PostManagerPageProvider>
    );
}
