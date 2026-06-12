"use client";

import { useEffect, useState } from "react";

import { useGetPostLatestListQuery } from "@/entities/post/api/post.query";
import { GetPostLatestListResponse } from "@/entities/post/model/post.type";

import { FeedEmpty, FeedError, FeedLoading } from "./FeedStatus";
import ArchiveSliderContent from "./ArchiveSliderContent";

type ArchiveSliderProps = {
    initialData: GetPostLatestListResponse;
};

const ArchiveSliderStatic = ({ initialData }: ArchiveSliderProps) => {
    const posts = initialData.result ?? [];

    if (initialData.resultCode === "ERROR" && posts.length === 0) {
        return <FeedError message={initialData.resultMessage} onRetry={() => undefined} />;
    }

    if (posts.length === 0) {
        return <FeedEmpty />;
    }

    return <ArchiveSliderContent posts={posts} />;
};

const ArchiveSliderWithQuery = ({ initialData }: ArchiveSliderProps) => {
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

const ArchiveSlider = ({ initialData }: ArchiveSliderProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <ArchiveSliderStatic initialData={initialData} />;
    }

    return <ArchiveSliderWithQuery initialData={initialData} />;
};

export default ArchiveSlider;
