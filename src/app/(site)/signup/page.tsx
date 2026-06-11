import Main from "@/widgets/layout/Main";
import SignupView from "@/views/signup/SignupView";

const Page = async () => {
    return (
        <Main id="signup" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <SignupView />
        </Main>
    );
};

export default Page;
