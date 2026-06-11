import Main from "@/widgets/layout/Main";
import LoginView from "@/views/login/LoginView";

const Page = async () => {
    return (
        <Main id="login" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <LoginView />
        </Main>
    );
};

export default Page;
