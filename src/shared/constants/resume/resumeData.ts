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
        "프론트엔드 개발 경력 2년 1개월로, SaaS·실시간 서비스·레거시 마이그레이션을 경험했습니다. 엔조이소프트에서는 API 응답 규격·JWT 인증·QA 자동화를 제안하고 팀과 합의해 적용했으며, 성능·UX 개선은 측정 조건을 명확히 한 뒤 진행해 왔습니다. 귀사 프론트엔드 개발과 팀 생산성·품질 개선에 기여하고자 지원합니다.",
    introduction:
        "React·Next.js 기반 서비스 개발, API 연동, 저사양·번들 최적화에 강점이 있습니다. 팬덤박스에서는 중복 API 호출 정리와 스켈레톤 UI로 연타 구간 체감 지연을 줄였고, 메이즈 홈페이지에서는 lazy loading·코드 스플리팅으로 Lighthouse Mobile Performance 50점대 → 80점대로 개선했습니다.",
    mission:
        "React·Next.js 기반 서비스 개발, API 연동, 저사양·번들 최적화",
};

export const resumeTechStack = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "WebSocket",
    "REST API",
    "React Query",
    "Zustand",
    "SCSS",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
    "Matter.js",
    "Playwright",
    "JWT",
    "Toss Payments",
    "SEO",
];

export const resumeProjects: ResumeProject[] = [
    {
        id: "fandombox",
        title: "팬덤박스",
        subtitle: "연타형 게이미피케이션 유저 상품 당첨 플랫폼",
        period: "2023.12 ~ 2024.08",
        techStack: "React, JavaScript, SCSS, REST API, GSAP",
        team: "FE 1명 / BE 2명 / 디자인 1명",
        overview: "연타를 통해 게이미피케이션을 즐기고 상품에 당첨되는 팬 리워드 플랫폼",
        highlight: {
            label: "첫 인터랙션",
            before: "9",
            after: "3.5",
            unit: "s",
        },
        chartLabel: "First Interaction (Slow 3G)",
        chartPoints: [100, 88, 76, 62, 50, 42, 38, 36, 35],
        metrics: [
            { label: "API 응답", value: "1초 내외", sub: "2~3초 → 1초" },
            { label: "대상 기기", value: "iPhone 6", sub: "저사양" },
            { label: "참여 인력", value: "4명", sub: "FE·BE·디자인" },
        ],
        achievements: [
            "연타·당첨 플로우 설계 및 구현 — REST API 연동, 진행 상태·당첨·등급별 UI·이펙트 분기 처리",
            "연타 시 API 중복 호출로 응답 대기가 길어지던 문제 — debounce·요청 병합·스켈레톤 UI 적용, Chrome Network 기준 1회당 체감 응답 약 2~3초 → 1초 내외",
            "저사양 기기(iPhone 6) 초기 진입·이펙트 구간 프레임 드랍 — WebP·해상도별 에셋·스프라이트 분할·transform 기반 GPU 레이어 분리 적용, Slow 3G 기준 첫 인터랙션 가능 시점 약 8~10초 → 3~4초",
            "컴포넌트·컬러·타이포 정리로 UX/UI·브랜드 아이덴티티(BI) 일관성 확보",
        ],
    },
    {
        id: "maze",
        title: "메이즈 공식 홈페이지",
        subtitle: "기업 공식 랜딩·소개 사이트",
        period: "2023.12 ~ 2024.08",
        techStack: "React, JavaScript, SCSS, Framer Motion, Matter.js",
        team: "FE 1명 (단독)",
        overview: "주식회사 메이즈 공식 홈페이지",
        highlight: {
            label: "Lighthouse Performance",
            before: "52",
            after: "81",
        },
        chartLabel: "Mobile Performance Score",
        chartPoints: [52, 58, 64, 70, 74, 77, 79, 80, 81],
        metrics: [
            { label: "LCP", value: "2.1s", sub: "4.2s → 2.1s" },
            { label: "초기 JS", value: "280KB", sub: "gzip 420→280KB" },
            { label: "담당 범위", value: "100%", sub: "단독 FE" },
        ],
        achievements: [
            "React 프로젝트 셋업·랜딩·서브페이지 기획·디자인·구현 FE 단독 담당",
            "Framer Motion·Matter.js·동영상 에셋 도입 초기 Lighthouse Mobile Performance 50점대, LCP 4초대",
            "동영상 lazy loading·route/code splitting·Matter.js viewport 진입 후 초기화·미사용 chunk 제거 — Lighthouse Mobile(Chrome, Slow 4G) Performance 52 → 81, LCP 4.2s → 2.1s, 초기 JS gzip 약 420KB → 280KB",
            "시멘틱 HTML·title/description·OG 태그 정리로 SEO 기반 마련",
        ],
    },
    {
        id: "dev-team-process",
        title: "개발팀 협업·프로세스 개선 (제안·실무 적용)",
        subtitle: "FE·BE·QA",
        period: "2024.11 ~ 재직 중",
        techStack: "Playwright, JWT, Conventional Commits, Git",
        team: "개발팀 FE·BE, QA",
        overview:
            "팀장 공백·다프로젝트 병행으로 IDE·커밋·API·인증 방식이 제각각 — 협업 가이드 제안·문서화·PoC 작성",
        highlight: {
            label: "반복 QA",
            before: "1.5",
            after: "0.6",
            unit: "h",
        },
        chartLabel: "QA Regression Time",
        chartPoints: [100, 82, 68, 52, 42, 36, 32, 28, 24],
        metrics: [
            { label: "온보딩", value: "1~2시간", sub: "반나절 → 1~2시간" },
            { label: "QA", value: "30~40분", sub: "1~2시간 → 30~40분" },
            { label: "범위", value: "FE·BE·QA", sub: "협업 프로세스" },
        ],
        achievements: [
            "Git·IDE·Conventional Commits 가이드 문서화·템플릿 공유 — 신규 합류 후 개발환경·레포 구조 파악 반나절 → 1~2시간 (온보딩 체크리스트 기준)",
            "API 응답 키·depth 불일치 — BE와 협의해 resultCode · resultMsg · pagination · data 4키 초안 제안, 신규·리팩터 API부터 순차 적용",
            "프론트 단독 로그인·토큰 미관리 — accessToken · refreshToken(JWT) 갱신 플로우 FE PoC 작성 후 팀 리뷰·주요 서비스 단계 적용",
            "반복 QA 수동 클릭 — Playwright E2E 핵심 시나리오 3~5건 스크립트화, 스테이징 회귀 QA 약 1~2시간 → 30~40분",
            "화면 코멘트·Git Issue 연동 QA 도구 Stitchable 사이드 개발 (github.com/kimsangjunv1/stitchable, Private)",
        ],
    },
    {
        id: "keepupass",
        title: "키업패스 어드민",
        subtitle: "무인 관제 SaaS 플랫폼",
        period: "2024.11 ~ 재직 중",
        techStack: "React, TypeScript, WebSocket, SCSS, Framer Motion",
        team: "FE 2명 / BE 1명 / 디자인 1명",
        overview: "무인 공간 출입·관제를 위한 SaaS 어드민",
        highlight: {
            label: "JS 번들",
            before: "700",
            after: "400",
            unit: "KB",
        },
        chartLabel: "Bundle Size (gzip)",
        chartPoints: [100, 85, 72, 60, 52, 46, 42, 40, 38],
        metrics: [
            { label: "번들", value: "400KB", sub: "gzip 700→400KB" },
            { label: "실시간", value: "WebSocket", sub: "출입문 제어" },
            { label: "협업", value: "FE 2", sub: "BE·디자인" },
        ],
        achievements: [
            "WebSocket 기반 실시간 출입문 제어·출입 이력 화면 구현 — 재연결·로딩/에러 상태 UI 포함",
            "feature/domain 기준 폴더·컴포넌트 구조 정리 — 신규 FE 온보딩 시 화면·코드 파악 시간 단축",
            "미사용 라이브러리·dead code 제거·dynamic import 적용 — production JS gzip 약 700KB → 400KB (webpack-bundle-analyzer)",
            "어드민 CRUD·Framer Motion 기반 전환·피드백 UX 설계·구현",
        ],
    },
    {
        id: "kqr",
        title: "KQR",
        subtitle: "노래방 QR 출입·실시간 현황·충전/결제 시스템",
        period: "2024.11 ~ 재직 중",
        techStack: "React, TypeScript, REST API",
        team: "FE 1명 (단독) / BE 1명",
        overview: "노래방 QR 출입·실시간 현황 확인·충전/결제 연동 서비스",
        highlight: {
            label: "FE 담당",
            before: "0",
            after: "100",
            unit: "%",
        },
        chartLabel: "Feature Delivery",
        chartPoints: [20, 35, 50, 65, 78, 88, 94, 98, 100],
        metrics: [
            { label: "QR 플로우", value: "단독", sub: "설계·구축" },
            { label: "연동", value: "REST", sub: "결제·출입" },
            { label: "협업", value: "FE+BE", sub: "2인" },
        ],
        achievements: [
            "결제·충전 결과에 따른 출입 QR 생성·이용 플로우 프론트엔드 단독 설계·구축",
            "실시간 현황·충전/결제 화면 REST API 연동 및 상태별 UI 분기 처리",
            "팀 API 4키 표준(resultCode/resultMsg/pagination/data) 적용 — 백엔드와 스펙 통일 후 유지보수성 확보",
        ],
    },
    {
        id: "imachine-ceo",
        title: "아이머신 CEO",
        subtitle: "놀이방·자영업 매장 관리 SaaS",
        period: "2024.11 ~ 재직 중",
        techStack: "Next.js, TypeScript, React Query, Toss Payments",
        team: "FE 2명 / BE 1명",
        overview: "매장 운영·구독 플랜 관리 SaaS",
        highlight: {
            label: "목록 로드",
            before: "5",
            after: "1.5",
            unit: "min→s",
        },
        chartLabel: "List Load Time",
        chartPoints: [100, 75, 55, 35, 22, 14, 8, 5, 3],
        metrics: [
            { label: "결제", value: "Toss", sub: "구독 플랜" },
            { label: "마이그레이션", value: "Next.js", sub: "Classic ASP" },
            { label: "로드", value: "1~2초", sub: "수 분 → 1~2초" },
        ],
        achievements: [
            "구독 플랜별 권한·기능 제어 UI, 토스페이먼츠 연동 결제·플랜 변경 플로우 구현",
            "Classic ASP → Next.js 마이그레이션 — 페이지·API Route 단위 점진 이전",
            "목록 진입 시 FE API 연쇄 호출 구조 → React Query·페이지네이션·병렬 fetch로 정리, BE DB connection 이슈 해소와 함께 첫 목록 표시 체감 수 분 → 1~2초 (Network·사용자 체감)",
        ],
    },
    {
        id: "enjoysoft-hub",
        title: "엔조이소프트 HUB",
        subtitle: "사내 운영 관리 SaaS",
        period: "2024.11 ~ 재직 중",
        techStack: "Next.js, TypeScript, REST API",
        team: "FE 2명 / BE 1명",
        overview: "사내 서비스 API·운영 흐름 통합 관리 플랫폼",
        highlight: {
            label: "초기 로딩",
            before: "2",
            after: "2.5",
            unit: "min→s",
        },
        chartLabel: "Initial Load Time",
        chartPoints: [100, 78, 58, 40, 28, 18, 10, 6, 3],
        metrics: [
            { label: "마이그레이션", value: "Next.js", sub: "Classic ASP" },
            { label: "로드", value: "2~3초", sub: "30초~수 분 → 2~3초" },
            { label: "운영", value: "API", sub: "사내 통합" },
        ],
        achievements: [
            "사내 API·운영 플로우 관리 화면 설계·구현 — 운영 업무 표준화",
            "Classic ASP → Next.js 마이그레이션, 서버 상태 React Query로 통일",
            "대량 목록 조회 시 FE 호출 횟수·페이지 크기 조정·캐싱 적용 — 초기 로딩 체감 30초~수 분 → 2~3초 (스테이징, 동일 계정·데이터 기준)",
        ],
    },
    {
        id: "agency-ceo",
        title: "대리점 CEO",
        subtitle: "대리점 점주·플랜 관리 SaaS",
        period: "2024.11 ~ 재직 중",
        techStack: "Next.js, TypeScript, React Query, Zustand",
        team: "FE 2명 / BE 1명",
        overview: "대리점 점주 운영·플랜·대리결제 관리 플랫폼",
        highlight: {
            label: "일괄 처리",
            before: "8",
            after: "1.5",
            unit: "h",
        },
        chartLabel: "Bulk Task Time",
        chartPoints: [100, 82, 65, 48, 35, 25, 18, 12, 8],
        metrics: [
            { label: "자동화", value: "일괄 API", sub: "조건 필터" },
            { label: "상태", value: "Query", sub: "Query + Zustand" },
            { label: "단축", value: "1~2시간", sub: "반나절~1일 → 1~2시간" },
        ],
        achievements: [
            "점주 등록·플랜 가입·대리결제 UI 및 상태별 분기 처리",
            "담당자 수기 확인·일괄 처리 → 조건 필터·일괄 API 연동 UI로 자동화, 반나절~1일 → 1~2시간 (운영팀 피드백 기준)",
            "React Query(서버 상태)·Zustand(UI 상태) 분리, API 레이어 모듈화",
        ],
    },
];

/** /resume Side Project 전용 (PDF 이력서 경력 섹션에는 미포함) */
export const resumeSideProject: ResumeProject = {
    id: "stitchable",
    title: "Stitchable",
    subtitle: "Figma식 화면 피드백 → Git Issue QA 협업 라이브러리",
    period: "2026.05.20 ~ 진행 중",
    techStack: "React, TypeScript",
    team: "FE 1명 (개인 프로젝트 · 오픈소스)",
    overview:
        "화면상 잘못된 부분에 Figma처럼 코멘트를 남기고, QA와 논의한 뒤 Git Issue로 승급하는 협업 체계를 React 오픈소스 라이브러리로 구상·개발 중입니다. 외부 피드백을 받고 주변 개발자에게 긍정적·진취적인 방향을 보여주기 위해 오픈소스로 공개할 예정입니다.",
    highlight: {
        label: "개발 기간",
        before: "0",
        after: "1",
        unit: "개월",
    },
    chartLabel: "Library Progress",
    chartPoints: [15, 28, 42, 55, 68, 78, 85, 90, 93, 95],
    metrics: [
        { label: "형태", value: "React", sub: "오픈소스 라이브러리" },
        { label: "협업", value: "Comment", sub: "→ Issue 승급" },
        { label: "목표", value: "OSS", sub: "커뮤니티 기여" },
    ],
    achievements: [
        "Figma식 화면 코멘트 UX — 잘못된 UI 위치에 피드백을 앵커링하는 인터랙션 설계",
        "QA 논의 → Git Issue 승급 플로우 — 피드백·토론·이슈화까지 이어지는 협업 체계 구상",
        "오픈소스 공개 목표 — 외부 의견 수렴 및 개발자 커뮤니티에 긍정적·진취적 방향 제시",
    ],
};

export type ResumeExperience = {
    id: string;
    /** 회사명 */
    title: string;
    employmentType: "full-time" | "client";
    period: string;
    role: string;
    team: string;
    overview: string;
    projectIds: string[];
};

/** 이력서와 동일한 경력 단위 (회사) */
export const resumeExperiences: ResumeExperience[] = [
    {
        id: "enjoysoft",
        title: "㈜엔조이소프트",
        employmentType: "full-time",
        period: "2024.11 ~ 재직 중",
        role: "프론트엔드 개발자",
        team: "FE 2명",
        overview:
            "개발팀 협업·API·인증·QA 프로세스 개선을 제안·적용하고, 무인 관제 SaaS·QR·매장·대리점 관리 등 B2B 프론트엔드를 수행 중입니다.",
        projectIds: ["dev-team-process", "keepupass", "kqr", "imachine-ceo", "enjoysoft-hub", "agency-ceo"],
    },
    {
        id: "maze-company",
        title: "주식회사 메이즈",
        employmentType: "full-time",
        period: "2023.12 ~ 2024.08",
        role: "프론트엔드 개발자",
        team: "FE 1명",
        overview:
            "연타형 게이미피케이션 팬 리워드 플랫폼(팬덤박스)과 기업 공식 홈페이지 프론트엔드를 담당했습니다.",
        projectIds: ["fandombox", "maze"],
    },
];
