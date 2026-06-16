import type { Metadata } from "next";
import Script from "next/script";

import { buildRenewalPersonJsonLd } from "@/shared/constants/resume/resumeRenewalData";
import { buildPageMetadata } from "@/shared/lib/seo/metadata";
import Main from "@/widgets/layout/Main";
import ResumeView from "@/views/resume/ResumeView";

export const metadata: Metadata = buildPageMetadata({
    title: "RESUME",
    description:
        "김상준 프론트엔드 개발자 포트폴리오 — 프로젝트별 성과, 케이스 스터디, 기술 의사결정, 라이브 데모 및 협업 경험",
    path: "/resume",
});

const Page = () => {
    const personJsonLd = buildRenewalPersonJsonLd();

    return (
        <>
            <Script
                id="resume-person-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
            />
            <Main id="resume" className={{ inner: "p-0", container: "" }}>
                <ResumeView />
            </Main>
        </>
    );
};

export default Page;
