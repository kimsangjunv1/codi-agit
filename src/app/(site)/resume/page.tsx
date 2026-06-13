import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/lib/seo/metadata";
import Main from "@/widgets/layout/Main";
import ResumeView from "@/views/resume/ResumeView";

export const metadata: Metadata = buildPageMetadata({
    title: "RESUME",
    description: "김상준 프론트엔드 개발자 이력서 — React·Next.js 기반 프로젝트 경험과 성과",
    path: "/resume",
});

const Page = () => {
    return (
        <Main id="resume" className={{ inner: "p-0", container: "" }}>
            <ResumeView />
        </Main>
    );
};

export default Page;
