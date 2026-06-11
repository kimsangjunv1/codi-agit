import Main from "@/widgets/layout/Main";
import LabView from "@/views/lab/LabView";

const Page = async () => {
    return (
        <Main id="lab" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <LabView />
        </Main>
    );
};

export default Page;
