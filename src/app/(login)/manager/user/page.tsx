import Main from "@/widgets/layout/Main";
import UserManagerView from "@/views/manager/user/UserManagerView";

const Page = async () => {
    return (
        <Main id="manager-user" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <UserManagerView />
        </Main>
    );
};

export default Page;
