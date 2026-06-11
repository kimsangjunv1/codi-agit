"use client";

import { CommentManagerPageProvider } from "./model/CommentManagerContext";
import * as CommentManagerLayer from "@/widgets/manager/comment/ui";

export default function Panel() {
    return (
        <CommentManagerPageProvider>
            <CommentManagerLayer.CommentManager />
            <CommentManagerLayer.Modal />
        </CommentManagerPageProvider>
    );
}
