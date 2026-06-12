import { notFound } from "next/navigation";

import { getPostDetailServerFetch } from "@/entities/post/api/post.api";
import { GetPostDetailResponse } from "@/entities/post/model/post.type";
import { singleItemPagination } from "@/shared/lib/utils/apiResponse";
import Main from "@/widgets/layout/Main";
import PostDetailView from "@/views/post/PostDetailView";

// POST_DETAIL_REVALIDATE_SECONDS 와 동일하게 유지
export const revalidate = 300;

const createFallbackData = (): GetPostDetailResponse => ({
    result: {
        id: "",
        idx: 0,
        user_id: null,
        title: "",
        thumbnail: "",
        contents: [],
        category_idx: 0,
        created_at: "",
        summary: "",
        views: 0,
        likes: 0,
    },
    pagination: singleItemPagination(),
    resultCode: "ERROR",
    resultMessage: "조회실패",
});

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const postIdx = Number(id);

    if (!Number.isFinite(postIdx) || postIdx <= 0) {
        notFound();
    }

    let initialData = createFallbackData();

    try {
        initialData = await getPostDetailServerFetch(postIdx);

        if (initialData.resultCode === "NOT_FOUND") {
            notFound();
        }
    } catch (err: unknown) {
        console.error("SSR fetch error:", err);
    }

    return (
        <Main id="post-detail" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <PostDetailView id={id} initialData={initialData} />
        </Main>
    );
};

export default Page;
