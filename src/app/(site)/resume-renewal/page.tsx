import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/lib/seo/metadata";
import Main from "@/widgets/layout/Main";
import ResumeRenewalView from "@/views/resume-renewal/ResumeRenewalView";

export const metadata: Metadata = buildPageMetadata({
    title: "RESUME RENEWAL",
    description: "김상준 프론트엔드 개발자 포트폴리오 — 프로젝트별 성과와 관련 콘텐츠",
    path: "/resume-renewal",
});

const Page = () => {
    return (
        <Main id="resume-renewal" className={{ inner: "p-0", container: "" }}>
            <ResumeRenewalView />
        </Main>
    );
};

export default Page;
