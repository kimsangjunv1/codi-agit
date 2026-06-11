import Main from "@/widgets/layout/Main";
import PostDetailView from "@/views/post/PostDetailView";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return (
        <Main id="post-detail" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <PostDetailView id={id} />
        </Main>
    );
};

export default Page;
