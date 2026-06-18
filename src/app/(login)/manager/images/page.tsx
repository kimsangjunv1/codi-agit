import Main from "@/widgets/layout/Main";
import ImageManagerView from "@/views/manager/image/ImageManagerView";

const Page = async () => {
    return (
        <Main id="manager-images" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <ImageManagerView />
        </Main>
    );
};

export default Page;
