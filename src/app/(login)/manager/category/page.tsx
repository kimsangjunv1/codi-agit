import Main from "@/widgets/layout/Main";
import CategoryManagerView from "@/views/manager/category/CategoryManagerView";

const Page = async () => {
    return (
        <Main id="manager-category" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <CategoryManagerView />
        </Main>
    );
};

export default Page;
