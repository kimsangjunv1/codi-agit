import Main from "@/widgets/layout/Main";
import CommentManagerView from "@/views/manager/comment/CommentManagerView";

const Page = async () => {
    return (
        <Main id="manager-comment" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <CommentManagerView />
        </Main>
    );
};

export default Page;
