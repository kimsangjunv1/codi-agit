import { resumeActivity, resumeEducation, resumeProfile } from "./resumeData";

export type RenewalSliderItem = {
    title: string;
    image: string;
};

export type RenewalProjectVisual = {
    category: string;
    sliderItems: RenewalSliderItem[];
    /** 프로젝트 소개 섹션 왼쪽 로고 (최대 128×128) */
    logo?: string;
};

export type RenewalGalleryLinkType = "demo" | "github" | "article" | "screenshot" | "internal";

export type RenewalGalleryItem = {
    id: string;
    label: string;
    description: string;
    imageSrc: string;
    href?: string;
    linkType: RenewalGalleryLinkType;
    linkLabel?: string;
};

export type RenewalDecision = {
    title: string;
    chosen: string;
    alternative: string;
    reason: string;
};

export type RenewalArchitectureLayer = {
    name: string;
    description: string;
};

export type RenewalCaseStudy = {
    problem: string;
    approach: string;
    result: string;
    learned: string;
    myRole: string[];
    teamRole: string[];
    decisions: RenewalDecision[];
    architecture?: {
        title: string;
        layers: RenewalArchitectureLayer[];
    };
};

export type RenewalProjectLinks = {
    demo?: string;
    github?: string;
    article?: string;
};

export type RenewalSkillItem = {
    name: string;
};

/** @deprecated renewalSkillHighlights로 대체됨 */
export type RenewalSkillCategory = {
    id: "core" | "production" | "exploring";
    label: string;
    description: string;
    items: RenewalSkillItem[];
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

export type RenewalCollaborationItem = {
    title: string;
    description: string;
    tags: string[];
};

export type RenewalBuiltWithMetric = {
    label: string;
    value: string;
    sub?: string;
};

const THUMB = (n: string) => `/images/picture/img-dummy-thumbnail-${n}.png`;

/**
 * TODO: 실제 스크린샷으로 교체
 * - fandombox: 01~03 (게이미피케이션 UI, 등급 이펙트, 리워드 플로우)
 * - keepupass/kqr/imachine/hub/agency: TODO 스크린샷
 * - maze: 07~09 (랜딩, 세부 페이지, 반응형)
 * - stitchable: 11~13 (화면 코멘트, Issue 승급, 협업 플로우)
 */
export const renewalProjectSliders: Record<string, RenewalSliderItem[]> = {
    fandombox: [
        { title: "게이미피케이션 UI", image: THUMB("01") },
        { title: "등급 이펙트", image: THUMB("02") },
        { title: "리워드 플로우", image: THUMB("03") },
    ],
    maze: [
        { title: "랜딩 페이지", image: THUMB("07") },
        { title: "세부 페이지", image: THUMB("08") },
        { title: "반응형 UI", image: THUMB("09") },
    ],
    stitchable: [
        { title: "화면 코멘트", image: THUMB("11") },
        { title: "Issue 승급", image: THUMB("12") },
        { title: "QA 협업 플로우", image: THUMB("13") },
    ],
    keepupass: [
        { title: "실시간 관제", image: THUMB("03") },
        { title: "출입 관리", image: THUMB("04") },
        { title: "어드민 UI", image: THUMB("05") },
    ],
    "dev-team-process": [
        { title: "협업 표준", image: THUMB("01") },
        { title: "Playwright QA", image: THUMB("02") },
        { title: "API 4키 표준", image: THUMB("03") },
    ],
    kqr: [
        { title: "QR 출입", image: THUMB("06") },
        { title: "결제 플로우", image: THUMB("07") },
        { title: "실시간 현황", image: THUMB("08") },
    ],
    "imachine-ceo": [
        { title: "구독 플랜", image: THUMB("09") },
        { title: "토스 결제", image: THUMB("10") },
        { title: "매장 관리", image: THUMB("11") },
    ],
    "enjoysoft-hub": [
        { title: "운영 대시보드", image: THUMB("12") },
        { title: "API 관리", image: THUMB("13") },
        { title: "서비스 연동", image: THUMB("14") },
    ],
    "agency-ceo": [
        { title: "점주 등록", image: THUMB("01") },
        { title: "대리결제", image: THUMB("02") },
        { title: "플랜 관리", image: THUMB("03") },
    ],
};

export const renewalTocItems: RenewalTocItem[] = [
    { id: "renewal-about", label: "About" },
    { id: "renewal-skills", label: "Skills" },
    { id: "renewal-collaboration", label: "Collaboration" },
    { id: "renewal-experience-enjoysoft", label: "Enjoysoft" },
    { id: "renewal-experience-maze-company", label: "Maze" },
    { id: "renewal-deep-dive", label: "Deep Dive" },
    { id: "renewal-side-project-stitchable", label: "Side Project" },
];

export const renewalProfileDetails = {
    motivation: resumeProfile.motivation,
    birthYear: resumeProfile.birthYear,
    phone: resumeProfile.phone,
    military: resumeProfile.military,
    portfolio: resumeProfile.portfolio,
    service: resumeProfile.service,
    linkedin: "https://www.linkedin.com/in/kimsangjun-fe",
};

/** @deprecated renewalSkillHighlights로 대체됨 */
export const renewalSkillCategories: RenewalSkillCategory[] = [
    {
        id: "core",
        label: "Core",
        description: "SaaS·실시간 서비스에서 프로덕션 배포까지 반복 사용한 핵심 스택입니다.",
        items: [
            { name: "React" },
            { name: "Next.js" },
            { name: "TypeScript" },
            { name: "React Query" },
        ],
    },
    {
        id: "production",
        label: "Used in Production",
        description: "정규직 실무에서 API·WebSocket·결제·배포까지 경험한 기술입니다.",
        items: [
            { name: "WebSocket" },
            { name: "REST API" },
            { name: "JWT" },
            { name: "Playwright" },
            { name: "Zustand" },
            { name: "Framer Motion" },
            { name: "Toss Payments" },
            { name: "SCSS / Tailwind" },
        ],
    },
    {
        id: "exploring",
        label: "Exploring",
        description: "사이드 프로젝트·PoC 단계에서 학습·운영 중인 영역입니다.",
        items: [
            { name: "Supabase" },
            { name: "NextAuth" },
            { name: "Vitest" },
            { name: "Matter.js" },
        ],
    },
];

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

export const renewalGalleryByProject: Record<string, RenewalGalleryItem[]> = {
    fandombox: [
        {
            id: "fb-1",
            label: "게이미피케이션 UI",
            description: "등급별 차등 이펙트와 리워드 플로우를 한 화면에서 확인",
            imageSrc: THUMB("01"),
            href: "https://portfoliosj-react.netlify.app/",
            linkType: "demo",
            linkLabel: "데모 보기",
        },
        {
            id: "fb-2",
            label: "등급 이펙트",
            description: "저사양 기기 60fps 유지를 위한 레이어·에셋 최적화",
            imageSrc: THUMB("02"),
            linkType: "screenshot",
        },
        {
            id: "fb-3",
            label: "리워드 플로우",
            description: "당첨·진행 상태 API 연동 UX",
            imageSrc: THUMB("03"),
            linkType: "screenshot",
        },
        {
            id: "fb-4",
            label: "API 최적화",
            description: "요청 병합·클라이언트 캐싱 적용 전후 비교",
            imageSrc: THUMB("04"),
            linkType: "article",
            linkLabel: "최적화 정리",
        },
        {
            id: "fb-5",
            label: "스켈레톤 UI",
            description: "체감 대기 시간 단축을 위한 로딩 패턴",
            imageSrc: THUMB("05"),
            linkType: "screenshot",
        },
        {
            id: "fb-6",
            label: "모바일 뷰",
            description: "iPhone 6 기준 인터랙션·터치 영역 검증",
            imageSrc: THUMB("06"),
            linkType: "screenshot",
        },
    ],
    maze: [
        {
            id: "mz-1",
            label: "랜딩 히어로",
            description: "기업 브랜드 톤에 맞춘 히어로·스크롤 내비",
            imageSrc: THUMB("07"),
            href: "https://portfoliosj-react.netlify.app/",
            linkType: "demo",
            linkLabel: "사이트 보기",
        },
        {
            id: "mz-2",
            label: "세부 페이지",
            description: "서브 페이지 공통 레이아웃·타이포 시스템",
            imageSrc: THUMB("08"),
            linkType: "screenshot",
        },
        {
            id: "mz-3",
            label: "반응형 레이아웃",
            description: "tablet·mobile 브레이크포인트 그리드",
            imageSrc: THUMB("09"),
            linkType: "screenshot",
        },
        {
            id: "mz-4",
            label: "성능 개선",
            description: "Lighthouse 52→81, LCP 4.2s→2.1s 측정 캡처",
            imageSrc: THUMB("10"),
            linkType: "article",
            linkLabel: "성과 지표",
        },
    ],
    stitchable: [
        {
            id: "st-1",
            label: "화면 코멘트",
            description: "Figma식 UI 피드백 앵커링·코멘트 UI",
            imageSrc: THUMB("11"),
            linkType: "screenshot",
        },
        {
            id: "st-2",
            label: "Issue 승급",
            description: "QA 논의 후 Git Issue로 전환하는 플로우",
            imageSrc: THUMB("12"),
            href: "https://github.com/kimsangjunv1/stitchable",
            linkType: "github",
            linkLabel: "GitHub",
        },
        {
            id: "st-3",
            label: "협업 체계",
            description: "피드백·토론·이슈화가 이어지는 QA 협업 구조",
            imageSrc: THUMB("13"),
            linkType: "screenshot",
        },
        {
            id: "st-4",
            label: "라이브러리 API",
            description: "React 컴포넌트·훅 기반 embed 설계",
            imageSrc: THUMB("14"),
            linkType: "screenshot",
        },
    ],
    keepupass: [
        {
            id: "kp-1",
            label: "대시보드",
            description: "KPI·최근 활동 요약 어드민 홈",
            imageSrc: THUMB("03"),
            linkType: "screenshot",
        },
        {
            id: "kp-2",
            label: "회원 관리",
            description: "목록·검색·상세 CRUD",
            imageSrc: THUMB("04"),
            linkType: "screenshot",
        },
        {
            id: "kp-3",
            label: "콘텐츠 CRUD",
            description: "등록·수정 폼·유효성 검사",
            imageSrc: THUMB("05"),
            linkType: "screenshot",
        },
        {
            id: "kp-4",
            label: "폼 인터랙션",
            description: "Framer Motion 기반 전환·피드백",
            imageSrc: THUMB("06"),
            href: resumeProfile.github,
            linkType: "github",
            linkLabel: "코드 참고",
        },
    ],
};

export const renewalCaseStudies: Record<string, RenewalCaseStudy> = {
    fandombox: {
        problem:
            "연타형 게이미피케이션에서 API 중복 호출로 체감 응답이 2~3초까지 지연되고, iPhone 6·Slow 3G 환경에서 첫 인터랙션까지 8~10초가 소요되었습니다.",
        approach:
            "debounce·요청 병합·스켈레톤 UI로 API 체감 지연을 줄였습니다. WebP·해상도별 에셋·스프라이트 분할·transform 기반 GPU 레이어 분리로 저사양 프레임을 안정화했습니다.",
        result:
            "Chrome Network 기준 1회당 체감 응답 약 2~3초 → 1초 내외, Slow 3G 첫 인터랙션 8~10초 → 3~4초. BI 일관성을 유지한 채 게이미피케이션 참여 경험을 강화했습니다.",
        learned:
            "에셋·API 병목을 동시에 프로파일링하고, 측정 조건(Slow 3G·Network 탭)을 먼저 정리해야 저사양에서도 브랜드 경험을 유지할 수 있습니다.",
        myRole: [
            "연타·당첨 플로우 설계·구현 및 REST API 연동",
            "API 중복 호출 분석·debounce·요청 병합·스켈레톤 UI 적용",
            "저사양 성능 프로파일링·WebP·스프라이트·GPU 레이어 최적화",
        ],
        teamRole: [
            "BE: REST API·당첨 로직",
            "디자인: 등급별 비주얼·모션 가이드",
        ],
        decisions: [
            {
                title: "저사양 성능",
                chosen: "스프라이트 분할 + GPU CSS",
                alternative: "에셋 단순 축소",
                reason: "브랜드 모션 품질을 유지하면서 초기 로드·프레임을 동시에 개선할 수 있었습니다.",
            },
        ],
    },
    maze: {
        problem:
            "Framer Motion·Matter.js·동영상 에셋 도입 초기 Lighthouse Mobile Performance 50점대, LCP 4초대로 FE 단독 담당으로 성능·SEO를 동시에 맞춰야 했습니다.",
        approach:
            "동영상 lazy loading·route/code splitting·Matter.js viewport 진입 후 초기화·미사용 chunk 제거를 진행했습니다. 시멘틱 HTML·title/description·OG 태그를 정리하고 Lighthouse로 개선을 추적했습니다.",
        result:
            "Lighthouse Mobile(Chrome, Slow 4G) Performance 52 → 81, LCP 4.2s → 2.1s, 초기 JS gzip 약 420KB → 280KB.",
        learned:
            "인터랙션 품질과 성능은 트레이드오프가 아니라 초기화 시점·리소스 분리 설계로 동시에 달성 가능합니다.",
        myRole: [
            "프로젝트 셋업·랜딩·세부 페이지 FE 100% 담당",
            "Framer Motion·Matter.js 인터랙션·성능 최적화",
            "시멘틱 HTML·SEO 메타 구조화",
        ],
        teamRole: ["주식회사 메이즈: 콘텐츠·브랜드 가이드"],
        decisions: [
            {
                title: "Matter.js 로딩",
                chosen: "지연 초기화 + code splitting",
                alternative: "초기 번들 포함",
                reason: "above-the-fold LCP에 영향을 주지 않으면서 물리 인터랙션을 유지했습니다.",
            },
        ],
    },
    stitchable: {
        problem:
            "QA 과정에서 화면 피드백을 스크린샷·메신저로 주고받다 보니 맥락이 흩어지고, 논의 후 이슈화까지 수동으로 이어지는 비용이 컸습니다.",
        approach:
            "Figma처럼 화면 위에 코멘트를 앵커링하고, QA와 논의한 뒤 Git Issue로 승급하는 React 오픈소스 라이브러리를 설계·개발 중입니다. embed 가능한 컴포넌트·훅 API와 Issue 연동 플로우를 중심으로 구조화했습니다.",
        result:
            "화면 코멘트 UX·Issue 승급 플로우 프로토타입 구현, GitHub Private 레포에서 사내 QA 연동 PoC 진행 중. 오픈소스 공개를 통해 외부 피드백·커뮤니티 기여를 목표로 합니다.",
        learned:
            "협업 도구는 기능만이 아니라 피드백→논의→이슈화까지의 흐름이 자연스러워야 팀이 실제로 씁니다. 라이브러리 형태로 embed하면 기존 프로젝트에 낮은 진입 장벽으로 도입할 수 있습니다.",
        myRole: [
            "라이브러리 아키텍처·React 컴포넌트·API 설계·구현",
            "화면 코멘트 UX·Issue 승급 플로우 설계",
            "오픈소스 공개·커뮤니티 기여 방향 기획",
        ],
        teamRole: ["1인 프로젝트 — 기획·설계·개발"],
        decisions: [
            {
                title: "배포 형태",
                chosen: "React 오픈소스 라이브러리",
                alternative: "SaaS 웹 서비스",
                reason: "기존 프로젝트에 embed 가능하고, 외부 개발자 피드백·기여를 받기 용이했습니다.",
            },
            {
                title: "Issue 연동",
                chosen: "논의 후 Git Issue 승급",
                alternative: "코멘트만 저장",
                reason: "QA 피드백이 실제 개발 백로그로 이어지도록 협업 루프를 닫을 수 있었습니다.",
            },
        ],
    },
    keepupass: {
        problem:
            "무인 관제 SaaS 어드민에서 WebSocket 실시간 제어·CRUD·모션이 필요했으나, JS 번들 700KB(gzip)·폴더 구조 혼재로 협업 비용이 컸습니다.",
        approach:
            "WebSocket 출입 제어 화면을 구축하고, feature/domain 기준 폴더·컴포넌트 구조를 정리했습니다. dead code 제거·dynamic import·번들 분석으로 gzip 400KB까지 축소, Framer Motion UX를 통일했습니다.",
        result:
            "JS gzip 700KB → 400KB, 실시간 출입 관제·CRUD 화면 납품. 구조 정리 후 신규 FE 온보딩·코드 파악 시간 단축.",
        learned:
            "팀 표준 없이 개별 최적화만으로는 온보딩·유지보수 비용이 누적됩니다. 구조 정리와 전사 프로세스를 함께 설계해야 합니다.",
        myRole: [
            "WebSocket 실시간 출입·관제 UI 구축",
            "폴더 구조 정리·번들 최적화",
            "어드민 CRUD·Framer Motion UX",
        ],
        teamRole: ["BE: REST·WebSocket API", "디자인: 어드민 UI"],
        decisions: [
            {
                title: "협업 구조",
                chosen: "팀 표준 반영 후 폴더·컴포넌트 정리",
                alternative: "프로젝트별 독립 구조",
                reason: "전사 API·커밋 표준과 맞춰 신규 인력이 빠르게 기여할 수 있게 했습니다.",
            },
        ],
    },
    "dev-team-process": {
        problem:
            "팀장 공백·다프로젝트 병행으로 IDE·커밋·API·인증·QA 방식이 제각각이었고, 온보딩·맥락 파악·반복 QA에 과도한 시간이 소요되었습니다.",
        approach:
            "Git·IDE·Conventional Commits 가이드 문서화, API 4키 표준 초안 제안, JWT 갱신 플로우 FE PoC, Playwright E2E, Stitchable QA 도구를 순차 제안·팀 합의 후 적용했습니다.",
        result:
            "온보딩 반나절 → 1~2시간, 반복 QA 1~2시간 → 30~40분. API·인증·협업 프로세스 표준화.",
        learned:
            "기술 표준은 문서만으로는 정착되지 않습니다. BE·QA와 함께 제안·PoC·피드백 루프를 돌려야 합니다.",
        myRole: [
            "협업 가이드 제안·문서화·PoC 작성",
            "API 4키·JWT·Playwright E2E 제안·적용",
            "Stitchable QA 협업 도구 사이드 개발",
        ],
        teamRole: ["BE: API 표준 협의", "QA: Playwright·Stitchable 연동"],
        decisions: [
            {
                title: "API 응답",
                chosen: "resultCode · resultMsg · pagination · data",
                alternative: "프로젝트별 자유 형식",
                reason: "FE·BE 간 파싱·에러 처리 패턴을 통일해 유지보수성을 높였습니다.",
            },
        ],
    },
};

/** Deep Dive 1건 — 팬덤박스 성능·API 개선 (Case Study 섹션 전용, 축소본) */
export const renewalDeepDiveCaseStudy: RenewalCaseStudy = {
    problem:
        "연타형 게이미피케이션에서 API 중복 호출로 체감 응답 2~3초, Slow 3G 첫 인터랙션 8~10초로 UX·이탈이 증가했습니다.",
    approach:
        "debounce·요청 병합·스켈레톤 UI 적용, WebP·스프라이트 분할·GPU 레이어 분리로 저사양 프레임 안정화.",
    result: "체감 응답 2~3초 → 1초 내외, Slow 3G 첫 인터랙션 8~10초 → 3~4초.",
    learned:
        "에셋·API 병목을 동시에 프로파일링해야 저사양에서도 브랜드 경험을 유지할 수 있습니다.",
    myRole: [
        "연타·당첨 플로우 구축·API 지연 분석",
        "스프라이트·GPU CSS 저사양 최적화",
    ],
    teamRole: ["BE: REST·당첨 로직", "디자인: 모션 가이드"],
    decisions: [
        {
            title: "저사양 성능",
            chosen: "스프라이트 분할 + GPU CSS",
            alternative: "에셋 단순 축소",
            reason: "모션 품질을 유지하면서 초기 로드·프레임을 동시에 개선.",
        },
    ],
};

export const renewalCollaboration = {
    headline: "협업 방식",
    intro: "엔조이소프트에서 개발팀 FE·BE·QA 협업·API·인증·QA 자동화 프로세스를 제안하고, 재현 가능한 단위로 문서화합니다.",
    items: [
        {
            title: "팀 프로세스 · 협업 개선 (제안·실무 적용)",
            description:
                "Conventional Commits·API 4키(resultCode/resultMsg/pagination/data)·JWT·Playwright E2E를 팀과 합의 후 적용. 온보딩 반나절 → 1~2시간, 반복 QA 1~2시간 → 30~40분.",
            tags: ["협업 제안", "Playwright", "JWT"],
        },
        {
            title: "BE · API 협업",
            description:
                "Network 탭·재현 스텝을 첨부해 이슈를 공유하고, API 네이밍·응답 depth·pagination 등 FE 관점 스펙을 PR/Notion에 남깁니다. KQR·SaaS 마이그레이션에서 API 4키 표준 적용 경험이 있습니다.",
            tags: ["REST", "WebSocket", "스펙 협의"],
        },
    ] satisfies RenewalCollaborationItem[],
};

export const renewalEducation = {
    education: {
        title: resumeEducation.school,
        period: resumeEducation.period,
        bullets: [
            "비전공이지만 UI/UX·웹 개발을 병행하며 졸업",
            "졸업 후 React·JavaScript 집중 학습 → 프론트엔드 전환",
        ],
    },
    activity: {
        title: resumeActivity.title,
        period: resumeActivity.period,
        description: resumeActivity.description,
        bullets: [
            "카카오톡·삼성 갤럭시 테마 제작·배포 — 픽셀 단위 UI 구현 경험",
            "소규모 팀 운영·일정·클라이언트 커뮤니케이션",
        ],
    },
};

export const renewalBuiltWith = {
    headline: "This page is the portfolio",
    description:
        "/resume 페이지 자체가 Next.js 15·Motion·Tailwind·FSD 구조의 라이브 샘플입니다.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Motion", "Tailwind CSS", "FSD"],
    metrics: [
        { label: "Lighthouse Performance", value: "94", sub: "desktop · lab" },
        { label: "SEO", value: "100", sub: "metadata + JSON-LD" },
    ] satisfies RenewalBuiltWithMetric[],
    practices: [
        "sticky TOC · 섹션 앵커 · prefers-reduced-motion",
        "entities 레이어 패턴 — Codi Agit 본 레포와 동일 철학",
    ],
};

export const renewalHeroStats = [
    { value: "2년 1개월", label: "프론트엔드 경력" },
    { value: "8+", label: "프로덕션 프로젝트" },
];

/** @deprecated renewalHeroStats로 대체됨 */
export const renewalHeroSecondary = {
    label: "About",
    headlineSuffix: resumeProfile.name,
    description:
        "React·Next.js 기반 서비스 개발, API 연동, 저사양·번들 최적화에 강점이 있습니다. 프론트엔드 실무 경력 2년 1개월.",
    stats: renewalHeroStats,
};

export const renewalContactExtended = {
    phone: resumeProfile.phone,
    phoneHref: `tel:${resumeProfile.phone.replace(/-/g, "")}`,
    portfolio: resumeProfile.portfolio,
    service: resumeProfile.service,
    linkedin: renewalProfileDetails.linkedin,
    linkedinLabel: "linkedin.com/in/kimsangjun-fe",
};
