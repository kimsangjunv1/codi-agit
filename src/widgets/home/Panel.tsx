"use client";

import { GetPostLatestListResponseType } from "@/entities/post/model/post.type";
import PageFrame from "@/widgets/layout/PageFrame";

import * as HomeLayer from "@/widgets/home/ui";

type HomePanelProps = {
    initialData: GetPostLatestListResponseType;
};

export default function Panel({ initialData }: HomePanelProps) {
    return (
        <PageFrame id="home" className={{ inner: "min-h-[100dvh]", container: "" }}>
            <HomeLayer.ArchiveFeed initialData={initialData} />
        </PageFrame>
    );
}
