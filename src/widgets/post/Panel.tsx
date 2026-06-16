"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { GetPostDetailResponse } from "@/entities/post/model/post.type";
import { AgitRoutes } from "@/shared/constants/entityKeys";

import { PostDetailPageProvider } from "./model/PostDetailContext";
import * as PostLayer from "@/widgets/post/ui";

type PostDetailPanelProps = {
    id: string;
    initialData: GetPostDetailResponse;
};

export default function Panel({ id, initialData }: PostDetailPanelProps) {
    const queryClient = useQueryClient();
    const postIdx = parseInt(id);

    useEffect(() => {
        if (initialData?.resultCode === "SUCCESS" && Number.isFinite(postIdx)) {
            queryClient.setQueryData([AgitRoutes.KEY_POST, "detail", postIdx], initialData);
        }
    }, [queryClient, initialData, postIdx]);

    return (
        <PostDetailPageProvider>
            <PostLayer.PostDetail id={id} initialData={initialData} />
            <PostLayer.Modal />
        </PostDetailPageProvider>
    );
}
