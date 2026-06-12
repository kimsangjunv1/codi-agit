import Main from "@/widgets/layout/Main";
import InvitationManagerView from "@/views/manager/invitation/InvitationManagerView";

const Page = async () => {
    return (
        <Main id="manager-invitation" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <InvitationManagerView />
        </Main>
    );
};

export default Page;
