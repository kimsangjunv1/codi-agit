import { resumeActivity, resumeEducation, resumeProfile } from "./resumeData";

export type RenewalSliderItem = {
    title: string;
    image: string;
};

export type RenewalProjectVisual = {
    category: string;
    sliderItems: RenewalSliderItem[];
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

export type RenewalSkillCategory = {
    id: "core" | "production" | "exploring";
    label: string;
    description: string;
    items: RenewalSkillItem[];
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

/** 프로젝트 소개 섹션 StudioSlider용 — image 경로만 교체하면 됩니다 */
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
    "codi-agit": [
        { title: "홈 화면", image: THUMB("11") },
        { title: "코디 추천", image: THUMB("12") },
        { title: "커뮤니티", image: THUMB("13") },
    ],
    keepupass: [
        { title: "대시보드", image: THUMB("03") },
        { title: "관리 UI", image: THUMB("04") },
        { title: "데이터 뷰", image: THUMB("05") },
    ],
};

export const renewalTocItems: RenewalTocItem[] = [
    { id: "renewal-about", label: "About" },
    { id: "renewal-skills", label: "Skills" },
    { id: "renewal-project-fandombox", label: "Fandombox" },
    { id: "renewal-project-maze", label: "Maze" },
    { id: "renewal-project-codi-agit", label: "Codi Agit" },
    { id: "renewal-project-keepupass", label: "Keepupass" },
    { id: "renewal-collaboration", label: "Collaboration" },
    { id: "renewal-education", label: "Education" },
    { id: "renewal-built-with", label: "Built With" },
    { id: "renewal-contact", label: "Contact" },
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

export const renewalSkillCategories: RenewalSkillCategory[] = [
    {
        id: "core",
        label: "Core",
        description: "프로덕션에서 반복적으로 사용하며, 아키텍처·성능·UX 의사결정의 중심이 되는 스택입니다.",
        items: [
            { name: "React" },
            { name: "Next.js" },
            { name: "TypeScript" },
            { name: "TanStack React Query" },
        ],
    },
    {
        id: "production",
        label: "Used in Production",
        description: "실무·사이드 프로젝트에서 배포까지 경험한 기술입니다.",
        items: [
            { name: "REST API" },
            { name: "Zustand" },
            { name: "Framer Motion" },
            { name: "SCSS / Tailwind" },
            { name: "Supabase" },
            { name: "NextAuth" },
            { name: "SEO" },
        ],
    },
    {
        id: "exploring",
        label: "Exploring",
        description: "프로덕션 도입을 검토하거나 PoC 단계에서 학습 중인 영역입니다.",
        items: [
            { name: "Vitest" },
            { name: "Playwright" },
            { name: "Web Vitals" },
        ],
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
    "codi-agit": {
        demo: resumeProfile.service,
        github: resumeProfile.github,
        article: `${resumeProfile.service}home/`,
    },
    keepupass: {
        github: resumeProfile.github,
    },
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
    "codi-agit": [
        {
            id: "ca-1",
            label: "홈 아카이브",
            description: "코디·게시물 카드 그리드와 필터",
            imageSrc: THUMB("11"),
            href: resumeProfile.service,
            linkType: "demo",
            linkLabel: "Live Demo",
        },
        {
            id: "ca-2",
            label: "게시물 상세",
            description: "TipTap 에디터 렌더·댓글(Giscus)",
            imageSrc: THUMB("12"),
            href: `${resumeProfile.service}home/`,
            linkType: "internal",
            linkLabel: "서비스 이동",
        },
        {
            id: "ca-3",
            label: "에디터",
            description: "리치 텍스트·이미지 업로드·XSS sanitize",
            imageSrc: THUMB("13"),
            linkType: "screenshot",
        },
        {
            id: "ca-4",
            label: "관리자",
            description: "배너·회원·콘텐츠 관리 화면",
            imageSrc: THUMB("14"),
            linkType: "screenshot",
        },
        {
            id: "ca-5",
            label: "로그인",
            description: "NextAuth 소셜 로그인·세션 흐름",
            imageSrc: THUMB("01"),
            linkType: "screenshot",
        },
        {
            id: "ca-6",
            label: "아키텍처",
            description: "FSD + App Router 레이어 구조",
            imageSrc: THUMB("02"),
            href: resumeProfile.github,
            linkType: "github",
            linkLabel: "GitHub",
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
            "게이미피케이션 당첨·등급 API 평균 응답 2.8초로, 당첨 확인·등급 이펙트 구간에서 이탈과 CS 문의가 증가했습니다. 저사양(iPhone 6)에서는 등급 이펙트가 30fps 이하로 떨어져 브랜드 경험이 훼손되었습니다.",
        approach:
            "Network 탭·사용자 플로우를 기준으로 중복 요청 구간을 식별한 뒤, 동일 세션 내 병합 가능한 API를 batch 처리하고 React Query 수준의 클라이언트 캐시 TTL을 등급별로 분리했습니다. 로딩 구간에는 스켈레톤 UI를 적용해 체감 대기를 줄였고, 이펙트는 레이어 분리·webp·will-change·requestAnimationFrame 스로틀링으로 프레임을 안정화했습니다.",
        result:
            "API 평균 응답 2.8s → 0.9s, 저사양 기기 등급 이펙트 60fps 유지. 당첨 확인 구간 이탈률이 체감상 감소했고, BE 팀과 병합 API 스펙을 공유해 후속 기능에도 재사용했습니다.",
        learned:
            "초기에는 debounce만 적용했으나 UX 지연이 남아 request merge + cache 조합으로 전환했습니다. 다음에는 서버 prefetch와 Suspense boundary를 함께 설계해 TTFB와 체감 로딩을 분리 측정하겠습니다.",
        myRole: [
            "게이미피케이션 UI·인터랙션 전담",
            "API 병목 분석 및 FE 캐싱·스켈레톤 전략 제안",
            "저사양 기기 성능 프로파일링·이펙트 최적화",
            "BE와 병합 API 스펙 협의 및 QA",
        ],
        teamRole: [
            "BE: REST API·당첨 로직·병합 엔드포인트 구현",
            "디자인: 등급별 비주얼·모션 가이드",
        ],
        decisions: [
            {
                title: "API 지연 대응",
                chosen: "요청 병합 + 클라이언트 캐시",
                alternative: "debounce / polling",
                reason: "당첨 직후 연속 호출 패턴에서 debounce는 체감 지연이 남고, polling은 트래픽 부담이 컸습니다.",
            },
            {
                title: "로딩 UX",
                chosen: "구간별 스켈레톤 UI",
                alternative: "전역 스피너",
                reason: "레이아웃 시프트를 줄이고 등급 카드 구조를 유지해 이탈을 낮췄습니다.",
            },
        ],
    },
    maze: {
        problem:
            "메이즈 공식 홈페이지 초기 Lighthouse Performance 52, LCP 4.2s로 모바일 유입 랜딩에서 첫인상·SEO 모두 취약했습니다. FE 단독 담당으로 일정 내 성능·접근성·검색 대응을 동시에 맞춰야 했습니다.",
        approach:
            "번들 분석으로 hero 이하 섹션을 dynamic import, 이미지 lazy loading·responsive srcset, 불필요 폰트·아이콘 제거를 진행했습니다. 시멘틱 HTML·heading hierarchy·meta/OG 태그를 페이지별로 정리하고, Core Web Vitals를 Chrome DevTools + Lighthouse CI 스냅샷으로 추적했습니다.",
        result:
            "Performance 52 → 81, LCP 4.2s → 2.1s, gzip JS 번들 ~420KB → ~280KB. 검색·SNS 공유용 메타가 정리되어 마케팅팀 공유 시 미리보기 품질이 개선되었습니다.",
        learned:
            "이미지 최적화만으로는 LCP 한계가 있어 above-the-fold 리소스 우선순위를 재배치했습니다. 추후 Next.js Image + CDN을 도입한다면 AVIF 포맷까지 확장할 계획입니다.",
        myRole: [
            "프로젝트 셋업·랜딩·세부 페이지 FE 100% 담당",
            "성능·SEO·접근성 개선 및 측정 리포트 작성",
            "반응형 레이아웃·SCSS 아키텍처 설계",
        ],
        teamRole: ["클라이언트(메이즈): 콘텐츠·브랜드 가이드 제공"],
        decisions: [
            {
                title: "번들 축소",
                chosen: "route-level code splitting",
                alternative: "single bundle + tree-shaking만",
                reason: "랜딩 방문 비중이 높아 초기 JS 최소화가 LCP에 직접 영향을 줬습니다.",
            },
            {
                title: "스타일링",
                chosen: "SCSS module + BEM 혼합",
                alternative: "CSS-in-JS",
                reason: "런타임 비용 없이 디자이너 handoff 속도와 유지보수성을 맞췄습니다.",
            },
        ],
    },
    "codi-agit": {
        problem:
            "개인 서비스로 코디 추천·커뮤니티를 운영하면서, 인증·DB·에디터·관리자·배포까지 end-to-end 책임이 필요했습니다. 로컬/배포 env 불일치로 fetch failed가 반복 발생해 SSR 신뢰성이 떨어졌습니다.",
        approach:
            "App Router + FSD 혼합 구조(app → views → widgets → entities)로 라우트 조립과 도메인 데이터를 분리했습니다. Supabase RLS·NextAuth 세션·React Query 캐시 전략을 레이어별로 정리하고, TipTap 에디터·XSS sanitize·API Route 권한 검증을 추가했습니다. env 검증 스크립트와 .env.example로 배포 실패를 줄였습니다.",
        result:
            "10개월+ 프로덕션 운영, 소셜 로그인·게시·관리자·SEO·CI(lint/build/test) 파이프라인 구축. env 이슈 재발 방지 및 RLS 기반 권한 모델 정립.",
        learned:
            "초기엔 widgets에 API가 흩어졌으나 entities 레이어로 수렴해 변경 비용이 줄었습니다. E2E(Playwright)는 핵심 auth·post flow부터 단계적으로 확장 중입니다.",
        myRole: [
            "아키텍처·UI·API Route·배포·운영 전담",
            "Supabase schema·RLS·NextAuth 연동",
            "성능·SEO·보안(XSS·권한) 개선",
        ],
        teamRole: ["1인 프로젝트 — 디자인·기획·개발·DevOps"],
        decisions: [
            {
                title: "상태 관리",
                chosen: "React Query(서버) + Zustand(UI)",
                alternative: "Redux 단일 스토어",
                reason: "서버 캐시와 UI 상태 lifecycle이 달라 계층 분리가 유지보수에 유리했습니다.",
            },
            {
                title: "폴더 구조",
                chosen: "FSD + 라우트 중심 widgets",
                alternative: "pages/components flat",
                reason: "라우트별 Panel 조립과 entities 재사용을 동시에 만족했습니다.",
            },
        ],
        architecture: {
            title: "Codi Agit — App Router + FSD 레이어",
            layers: [
                { name: "app", description: "Server Component page.tsx — metadata·cookies·Main 래핑" },
                { name: "views", description: "라우트 ↔ widgets Panel 중계 (얇은 레이어)" },
                { name: "widgets", description: "Panel + ui 섹션 조립, 라우트 전용 UI 상태" },
                { name: "features", description: "기능 로직·PageProvider·컨텍스트" },
                { name: "entities", description: "도메인 api / query / type — Supabase·배너·포스트" },
                { name: "shared", description: "공통 UI·lib·hooks·constants" },
            ],
        },
    },
    keepupass: {
        problem:
            "교육 서비스 어드민에서 회원·콘텐츠 CRUD 화면이 필요했으나, BE API 스펙 변경과 폼 UX 요구가 잦아 재사용 가능한 테이블·폼 패턴이 필요했습니다.",
        approach:
            "목록·상세·등록·수정 4종 CRUD 템플릿을 컴포넌트화하고, Framer Motion으로 페이지 전환·validation feedback을 통일했습니다. BE와 OpenAPI 수준의 필드 계약을 Notion으로 공유하고, 에러 코드별 토스트 메시지를 매핑했습니다.",
        result:
            "4종+ CRUD 화면 납품, 폼·테이블 패턴 재사용으로 후속 화면 리드타임 단축. 관리자 피드백 반영해 키보드 포커스·aria-label 보완.",
        learned:
            "어드민은 화면 수보다 edge case(빈 목록·권한 없음·네트워크 실패) 처리가 체감 품질을 좌우합니다. 다음 프로젝트에서는 React Hook Form + Zod로 폼 스키마를 API 타입과 동기화하겠습니다.",
        myRole: [
            "어드민 UI·CRUD 화면 FE 전담",
            "Framer Motion 인터랙션·반응형 레이아웃",
            "BE API 연동·에러 UX",
        ],
        teamRole: ["BE 1명: REST API·인증"],
        decisions: [
            {
                title: "CRUD 구조",
                chosen: "List / Detail / Form 공통 레이아웃",
                alternative: "페이지별 독립 구현",
                reason: "필드만 바꿔 재사용 가능해 2인 팀 일정을 맞췄습니다.",
            },
            {
                title: "모션",
                chosen: "Framer Motion layout animation",
                alternative: "CSS transition only",
                reason: "폼 단계 전환·리스트 reorder 피드백을 일관되게 제공했습니다.",
            },
        ],
    },
};

export const renewalCollaboration = {
    headline: "협업 방식 & 성장",
    intro: "FE 1명으로 시작하는 프로젝트가 많았습니다. 스펙 불확실성을 줄이기 위해 문서·측정·리뷰 가능한 단위로 일을 쪼개 협업합니다.",
    items: [
        {
            title: "BE · API 협업",
            description:
                "Network 탭·재현 스텝을 첨부해 이슈를 공유하고, 병합 API·필드 nullable 등 FE 관점 스펙을 PR/Notion에 남깁니다. 팬덤박스·키업패스에서 API 계약 문서화 경험이 있습니다.",
            tags: ["REST", "스펙 협의", "에러 코드 매핑"],
        },
        {
            title: "디자인 handoff",
            description:
                "Figma spacing·타이포 토큰을 SCSS/Tailwind 변수로 매핑하고, hover·loading·empty state까지 QA 체크리스트로 넘깁니다. 이솔 스튜디오 창업 시 카카오톡·삼성 테마 UI/UX 제작 경험을 바탕으로 디자이너 언어에 익숙합니다.",
            tags: ["Figma", "UI QA", "테마 제작"],
        },
        {
            title: "코드 품질 · 문서화",
            description:
                "Codi Agit에서 lint/build/test CI, .env.example, 페이즈별 optimization roadmap으로 onboarding 비용을 줄였습니다. PR 단위로 ‘왜’를 README·커밋 메시지에 남기는 것을 습관화했습니다.",
            tags: ["CI", "TypeScript", "리팩터링"],
        },
        {
            title: "성장 · 학습",
            description:
                "비전공(정보물류) → 독학 React → 실무 2년+. 사이드 프로젝트로 Next.js 15·Supabase·Auth를 직접 운영하며 full-stack FE 역량을 확장 중입니다. 모르는 영역은 공식 문서·프로파일링 도구로 먼저 가설을 세운 뒤 팀에 공유합니다.",
            tags: ["자기주도", "프로덕션 운영", "Web Vitals"],
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
        "지금 보고 계신 /resume-renewal 페이지 자체가 Next.js 15·Motion·Tailwind·FSD 구조의 라이브 샘플입니다. prefers-reduced-motion을 존중하고, 섹션 앵커·JSON-LD·시맨틱 마크업을 적용했습니다.",
    stack: [
        "Next.js 15 App Router",
        "React 19",
        "TypeScript",
        "Motion (Framer Motion)",
        "Tailwind CSS",
        "FSD + Route widgets",
    ],
    metrics: [
        { label: "Lighthouse Performance", value: "94", sub: "desktop · lab" },
        { label: "LCP", value: "1.8s", sub: "hero image priority" },
        { label: "Accessibility", value: "96", sub: "semantic + aria" },
        { label: "SEO", value: "100", sub: "metadata + JSON-LD" },
    ] satisfies RenewalBuiltWithMetric[],
    practices: [
        "ClippedRevealText — 오른쪽 텍스트 clip reveal, reduced motion 대응",
        "sticky TOC — 긴 스크롤 프로젝트 내비",
        "entities 레이어 패턴 — Codi Agit 본 레포와 동일 철학",
    ],
};

export const renewalContactExtended = {
    phone: resumeProfile.phone,
    phoneHref: `tel:${resumeProfile.phone.replace(/-/g, "")}`,
    portfolio: resumeProfile.portfolio,
    service: resumeProfile.service,
    linkedin: renewalProfileDetails.linkedin,
    linkedinLabel: "linkedin.com/in/kimsangjun-fe",
};
