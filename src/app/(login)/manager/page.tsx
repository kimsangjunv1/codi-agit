import Main from "@/widgets/layout/Main";
import ManagerView from "@/views/manager/ManagerView";

const Page = async () => {
    return (
        <Main id="manager" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <ManagerView />
        </Main>
    );
};

export default Page;
