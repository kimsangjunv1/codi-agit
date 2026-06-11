import Main from "@/widgets/layout/Main";
import HomeView from "@/views/home/HomeView";
import { getPostLatestListServerFetch } from "@/entities/post/api/post.api";
import { GetPostLatestListResponse } from "@/entities/post/model/post.type";
import { buildPagination } from "@/shared/lib/utils/apiResponse";

export const revalidate = 300;

const createFallbackData = (): GetPostLatestListResponse => ({
    result: [],
    pagination: buildPagination({ page: 1, pageSize: 10, totalCount: 0 }),
    resultCode: "ERROR",
    resultMessage: "조회실패",
});

const Page = async () => {
    let initialData = createFallbackData();

    try {
        initialData = await getPostLatestListServerFetch();
    } catch (err: unknown) {
        console.error("SSR fetch error:", err);
    }

    return (
        <Main id="home" className={{ inner: "min-h-[100dvh]", container: "" }}>
            <HomeView initialData={initialData} />
        </Main>
    );
};

export default Page;
