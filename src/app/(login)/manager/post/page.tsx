import Main from "@/widgets/layout/Main";
import PostManagerView from "@/views/manager/post/PostManagerView";

const Page = async () => {
    return (
        <Main id="manager-post" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <PostManagerView />
        </Main>
    );
};

export default Page;
