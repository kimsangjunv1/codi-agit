"use client";

import { useGetPostLatestListQuery } from "@/entities/post/api/post.query";
import { GetPostLatestListResponse } from "@/entities/post/model/post.type";

import { FeedEmpty, FeedError, FeedLoading } from "./FeedStatus";
import ArchiveSliderContent from "./ArchiveSliderContent";

type ArchiveSliderProps = {
    initialData: GetPostLatestListResponse;
};

const ArchiveSlider = ({ initialData }: ArchiveSliderProps) => {
    const { data, isLoading, isError, error, refetch } = useGetPostLatestListQuery(initialData);
    const posts = data?.result ?? [];

    if (isLoading && posts.length === 0) {
        return <FeedLoading className="h-screen" />;
    }

    if (isError) {
        return <FeedError message={error?.message} onRetry={() => refetch()} />;
    }

    if (data?.resultCode === "ERROR") {
        return <FeedError message={data.resultMessage} onRetry={() => refetch()} />;
    }

    if (posts.length === 0) {
        return <FeedEmpty />;
    }

    return <ArchiveSliderContent posts={posts} />;
};

export default ArchiveSlider;
