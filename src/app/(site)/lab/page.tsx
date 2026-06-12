import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/lib/seo/metadata";
import Main from "@/widgets/layout/Main";
import LabView from "@/views/lab/LabView";

export const metadata: Metadata = buildPageMetadata({
    title: "LAB",
    description: "프론트엔드 실험과 프로토타입 모음",
    path: "/lab",
});

const Page = async () => {
    return (
        <Main id="lab" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <LabView />
        </Main>
    );
};

export default Page;
