export type ResumeProjectMetric = {
    label: string;
    value: string;
    sub?: string;
};

export type ResumeProject = {
    id: string;
    title: string;
    subtitle: string;
    period: string;
    techStack: string;
    team: string;
    overview: string;
    highlight: {
        label: string;
        before: string;
        after: string;
        unit?: string;
    };
    chartLabel: string;
    chartPoints: number[];
    metrics: ResumeProjectMetric[];
    achievements: string[];
};

export const resumeProfile = {
    name: "김상준",
    role: "프론트엔드 개발자",
    experience: "2년 1개월",
    birthYear: "1997년생",
    email: "to_before@naver.com",
    phone: "010-6607-7265",
    github: "https://github.com/kimsangjunv1",
    portfolio: "https://portfoliosj-react.netlify.app/",
    service: "https://codi-agit.com/home/",
    military: "군필 (2017.12 ~ 2019.08, 육군 병장)",
    motivation:
        "React·Next.js 기반 프론트엔드 개발 경력 2년 1개월, API 연동·성능 최적화·UX 개선 경험을 보유하고 있습니다. 팬덤박스에서 게이미피케이션 API 지연 문제를 해결하고 저사양 기기 최적화를 수행한 경험을 바탕으로, 사용자 경험 개선과 프론트엔드 성능 향상에 기여하고자 합니다.",
    introduction:
        "팬덤박스 리워드 플랫폼에서 API 응답 지연(평균 2.8s → 0.9s)을 요청 병합·클라이언트 캐싱·스켈레톤 UI로 개선하고, iPhone 6 기준 등급 이펙트 60fps를 유지하도록 최적화했습니다. 메이즈 홈페이지에서는 Lighthouse Performance 52→81, LCP 4.2s→2.1s를 달성했으며, Next.js·TypeScript 기반 개인 서비스 Codi Agit를 설계·배포·운영 중입니다.",
    mission:
        "React·Next.js 기반 프론트엔드 개발자로서, 사용자 경험과 성능 최적화에 집중하여 더 나은 웹 서비스를 만듭니다.",
};

export const resumeTechStack = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "REST API",
    "Zustand",
    "TanStack React Query",
    "SCSS",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
    "Supabase",
    "NextAuth",
    "SEO",
];

export const resumeProjects: ResumeProject[] = [
    {
        id: "fandombox",
        title: "팬덤박스 리워드 플랫폼",
        subtitle: "K-POP 팬덤 대상 리워드·게이미피케이션 서비스",
        period: "2023.12 ~ 2024.08",
        techStack: "React, JavaScript, SCSS, REST API",
        team: "FE 1명 / BE 2명 / 디자인 1명",
        overview: "팬 활동 리워드·당첨·등급별 차등 효과를 제공하는 게이미피케이션 플랫폼",
        highlight: {
            label: "API 응답 시간",
            before: "2.8",
            after: "0.9",
            unit: "s",
        },
        chartLabel: "API Response Time",
        chartPoints: [100, 92, 85, 78, 65, 55, 42, 35, 32],
        metrics: [
            { label: "프레임 유지", value: "60fps", sub: "저사양 기기" },
            { label: "최적화 기법", value: "3가지+", sub: "병합·캐싱·스켈레톤" },
            { label: "참여 인력", value: "4명", sub: "FE·BE·디자인" },
        ],
        achievements: [
            "게이미피케이션 당첨·등급 API 응답 지연(평균 2.8s → 0.9s) — 요청 병합·클라이언트 캐싱·스켈레톤 UI 적용으로 체감 대기 시간 단축",
            "iPhone 6 등 저사양 기기에서 희귀 등급 이펙트 60fps 유지 — 애니메이션 레이어 분리·에셋 해상도·will-change 조정",
            "RESTful API 연동으로 진행 상태·당첨 여부·등급별 차등 이펙트 구현 및 UX/UI 개선",
            "Framer Motion·GSAP 기반 인터랙션 모션 설계로 게이미피케이션 참여 경험 향상",
        ],
    },
    {
        id: "maze",
        title: "메이즈 공식 홈페이지",
        subtitle: "기업 랜딩·소개 사이트",
        period: "2024.01 ~ 2024.08",
        techStack: "React, JavaScript, SCSS",
        team: "FE 1명 (단독)",
        overview: "메이즈 기업 공식 홈페이지 랜딩·세부 페이지 구축",
        highlight: {
            label: "Lighthouse Performance",
            before: "52",
            after: "81",
        },
        chartLabel: "Performance Score",
        chartPoints: [52, 58, 63, 68, 72, 76, 79, 81, 81],
        metrics: [
            { label: "LCP 개선", value: "2.1s", sub: "4.2s → 2.1s" },
            { label: "번들 축소", value: "280KB", sub: "gzip 기준" },
            { label: "담당 범위", value: "100%", sub: "단독 FE" },
        ],
        achievements: [
            "이미지 lazy loading·코드 스플리팅·불필요 리소스 제거로 Lighthouse Performance 52 → 81, LCP 4.2s → 2.1s 개선",
            "초기 JS 번들 ~420KB → ~280KB (gzip) — 동적 import·트리 쉐이킹 적용",
            "시멘틱 HTML·메타태그·OG 태그 정리로 SEO·검색 노출 기반 마련",
            "프로젝트 셋업·랜딩·세부 페이지 설계·구현 전반 단독 담당",
        ],
    },
    {
        id: "codi-agit",
        title: "Codi Agit",
        subtitle: "코디 추천·커뮤니티 개인 서비스",
        period: "2024.06 ~ 진행 중",
        techStack: "Next.js 15, React 19, TypeScript, Supabase, NextAuth, React Query, Zustand, Tailwind",
        team: "FE 1명 (개인 프로젝트)",
        overview: "코디 추천·커뮤니티 기능을 제공하는 풀스택 프론트엔드 개인 서비스",
        highlight: {
            label: "운영 기간",
            before: "0",
            after: "10",
            unit: "개월+",
        },
        chartLabel: "Service Growth",
        chartPoints: [10, 18, 28, 38, 48, 58, 68, 78, 88, 95],
        metrics: [
            { label: "아키텍처", value: "App Router", sub: "SSR + API Route" },
            { label: "인증", value: "NextAuth", sub: "소셜 로그인" },
            { label: "상태 관리", value: "2계층", sub: "Query + Zustand" },
        ],
        achievements: [
            "App Router·SSR·API Route 기반 아키텍처 설계 및 프로덕션 배포·운영",
            "Supabase·NextAuth 연동 — 소셜 로그인·세션 관리 구현",
            "React Query 서버 상태 캐싱·재검증 전략 적용으로 데이터 페칭 안정성 확보",
            "로컬/배포 환경 env 불일치(fetch failed) 원인 추적·해결",
        ],
    },
    {
        id: "keepupass",
        title: "키업패스 어드민",
        subtitle: "교육·콘텐츠 관리 어드민 대시보드",
        period: "2024.11 ~ 진행 중",
        techStack: "React, TypeScript, Framer Motion, SCSS",
        team: "FE 1명 / BE 1명",
        overview: "키업패스 서비스 운영을 위한 어드민 대시보드",
        highlight: {
            label: "CRUD 화면",
            before: "0",
            after: "4",
            unit: "종+",
        },
        chartLabel: "Admin Features",
        chartPoints: [15, 28, 42, 55, 68, 78, 88, 95, 100],
        metrics: [
            { label: "화면 유형", value: "CRUD", sub: "목록·상세·등록·수정" },
            { label: "모션", value: "Framer", sub: "페이지 전환·폼" },
            { label: "협업", value: "FE+BE", sub: "2인 팀" },
        ],
        achievements: [
            "React 기반 어드민 대시보드 UI 설계·구현 — 회원·콘텐츠 관리 CRUD 화면 담당",
            "Framer Motion 페이지 전환·폼 인터랙션 모션 설계·적용으로 관리자 UX 개선",
            "반응형 레이아웃·컴포넌트 구조화로 유지보수성 향상",
            "REST API 연동 — 목록·상세·등록/수정 화면 구현",
        ],
    },
];

export const resumeEducation = {
    school: "세한대학교 (당진) 정보물류학과 졸업",
    period: "2016.03 ~ 2022.02",
};

export const resumeActivity = {
    title: "이솔 스튜디오 창업",
    period: "2019.10 ~ 2022.06",
    description: "카카오톡·삼성 테마 제작·배포, UI/UX",
};

export const resumeSummaryStats = [
    { value: "2년+", label: "프론트엔드 경력" },
    { value: "4개", label: "주요 프로젝트" },
    { value: "10+", label: "기술 스택" },
];
