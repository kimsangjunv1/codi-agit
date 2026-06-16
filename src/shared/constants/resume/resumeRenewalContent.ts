import { resumeProfile } from "./resumeData";

export type RenewalProjectLinks = {
    demo?: string;
    github?: string;
    article?: string;
};

export type RenewalSkillHighlight = {
    id: string;
    title: string;
    description: string;
};

export type RenewalTocItem = {
    id: string;
    label: string;
};

export const renewalProfileDetails = {
    motivation: resumeProfile.motivation,
    birthYear: resumeProfile.birthYear,
    phone: resumeProfile.phone,
    military: resumeProfile.military,
    portfolio: resumeProfile.portfolio,
    service: resumeProfile.service,
    linkedin: "https://www.linkedin.com/in/kimsangjun-fe",
};

export const renewalSkillHighlights: RenewalSkillHighlight[] = [
    {
        id: "react-typescript",
        title: "React·Next.js & TypeScript 중심 프론트엔드 개발",
        description:
            "React·Next.js·TypeScript를 중심으로 SaaS·실시간 서비스를 개발해 왔습니다. CSR·SSR 모두 경험했으며, API 연동부터 프로덕션 배포까지 프론트엔드 서비스를 독립적으로 구성할 수 있습니다.",
    },
    {
        id: "api-realtime",
        title: "API & 실시간 연동",
        description:
            "REST API·WebSocket·JWT 인증을 실무에서 반복 사용했습니다. React Query로 서버 상태를 관리하고, API 응답 규격·에러 처리·캐싱 전략을 팀과 합의해 적용한 경험이 있습니다.",
    },
    {
        id: "performance",
        title: "성능 & UX 최적화",
        description:
            "불필요한 리렌더·번들 크기·네트워크 비용을 줄이는 데 집중해 왔습니다. Lighthouse·체감 지연·첫 인터랙션 등 측정 조건을 먼저 정리하고, lazy loading·코드 스플리팅·스켈레톤 UI로 개선해 왔습니다.",
    },
    {
        id: "quality",
        title: "품질 & 협업",
        description:
            "Playwright 기반 QA 자동화를 제안·도입하고, 코드리뷰·개발 프로세스 개선에 참여했습니다. 기능 구현뿐 아니라 팀 생산성과 배포 품질을 함께 높이는 방향으로 일해 왔습니다.",
    },
    {
        id: "state-architecture",
        title: "상태 관리 & 아키텍처",
        description:
            "React Query·Zustand로 서버·클라이언트 상태를 분리하고, FSD entities 레이어 패턴으로 도메인 로직을 구조화했습니다. Codi Agit 본 레포에서도 동일한 철학으로 유지보수 가능한 코드베이스를 지향합니다.",
    },
    {
        id: "production-ops",
        title: "결제 & 프로덕션 운영",
        description:
            "Toss Payments 연동, SEO·캐싱 설정 등 프로덕션 환경에서 필요한 프론트엔드 운영 경험이 있습니다. 사이드 프로젝트에서는 Supabase·NextAuth 기반 PoC도 진행 중입니다.",
    },
];

export const renewalProjectLinks: Record<string, RenewalProjectLinks> = {
    fandombox: {
        demo: "https://portfoliosj-react.netlify.app/",
        article: "https://portfoliosj-react.netlify.app/",
    },
    maze: {
        demo: "https://portfoliosj-react.netlify.app/",
    },
    stitchable: {
        github: "https://github.com/kimsangjunv1/stitchable",
    },
    keepupass: {
        github: resumeProfile.github,
    },
    "dev-team-process": {
        github: "https://github.com/kimsangjunv1/stitchable",
    },
    kqr: {},
    "imachine-ceo": {},
    "enjoysoft-hub": {},
    "agency-ceo": {},
};

export const renewalContactExtended = {
    phone: resumeProfile.phone,
    phoneHref: `tel:${resumeProfile.phone.replace(/-/g, "")}`,
    portfolio: resumeProfile.portfolio,
    service: resumeProfile.service,
    linkedin: renewalProfileDetails.linkedin,
    linkedinLabel: "linkedin.com/in/kimsangjun-fe",
};
