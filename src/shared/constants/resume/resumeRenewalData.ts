import type { ResumeProject } from "./resumeData";
import { resumeExperiences, resumeProfile, resumeProjects, resumeSideProject, resumeTechStack } from "./resumeData";
import {
    renewalContactExtended,
    renewalProfileDetails,
    renewalProjectLinks,
    renewalSkillHighlights,
    type RenewalProjectLinks,
    type RenewalSkillHighlight,
    type RenewalTocItem,
} from "./resumeRenewalContent";

export type { RenewalProjectLinks, RenewalSkillHighlight, RenewalTocItem } from "./resumeRenewalContent";

export { renewalContactExtended, renewalProfileDetails, renewalProjectLinks, renewalSkillHighlights };

export const RENEWAL_REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export const RENEWAL_VIEWPORT = {
    once: false,
    margin: "-10%",
    amount: 0.2,
} as const;

export const renewalHero = {
    category: "HELLO",
    title: resumeProfile.name,
    subtitle: resumeProfile.role,
    greeting: `안녕하세요,\n프론트엔드 개발자 ${resumeProfile.name}입니다.`,
    intro: [
        "2년 7개월 동안 React·Next.js 기반 SaaS, 게이미피케이션 서비스, 레거시 마이그레이션과 디자인 시스템을 경험했습니다.",
        "팬덤박스의 일일 이용자 수를 120명에서 350명으로 높이고, 엔조이소프트 HUB의 최대 25분 로딩을 119ms까지 단축했습니다.",
        "사용자 경험과 동료의 개발 경험을 함께 살피며, 측정 가능한 제품 성과와 유지보수 가능한 구조를 만드는 데 집중합니다.",
    ],
    role: "Frontend Developer",
    profileImage: "/images/picture/resume-profile.png",
    quickLinks: [
        { label: "Live Demo", href: resumeProfile.service, external: true },
        { label: "GitHub", href: resumeProfile.github, external: true },
        { label: "Email", href: `mailto:${resumeProfile.email}`, external: false },
    ],
};

const EMPLOYMENT_CATEGORY: Record<"full-time" | "client", string> = {
    "full-time": "working at",
    client: "Client Work",
};

const SIDE_PROJECT_CATEGORY = "Personal Project";

const EXPERIENCE_TOC_LABELS: Record<string, string> = {
    enjoysoft: "Enjoysoft",
    "maze-company": "Maze",
};

export type RenewalSectionEntry = Pick<
    ResumeProject,
    "id" | "title" | "subtitle" | "period" | "techStack" | "team" | "overview" | "achievements"
> & {
    category: string;
    logo?: string;
    links: RenewalProjectLinks;
};

export const renewalProjectVisuals: Record<string, { category: string; logo?: string }> = {
    fandombox: { category: "Product" },
    maze: { category: "Corporate" },
    stitchable: { category: "Open Source" },
    keepupass: { category: "SaaS Admin" },
    "dev-team-process": { category: "Team Lead" },
    kqr: { category: "SaaS" },
    "imachine-ceo": { category: "SaaS" },
    "enjoysoft-hub": { category: "Internal SaaS" },
    "agency-ceo": { category: "SaaS" },
};

function getProjectById(projectId: string): ResumeProject {
    const project = resumeProjects.find((item) => item.id === projectId);
    if (!project) {
        throw new Error(`Unknown resume project: ${projectId}`);
    }
    return project;
}

function mergeProjectLinks(projectIds: string[]): RenewalProjectLinks {
    return projectIds.reduce<RenewalProjectLinks>((acc, projectId) => {
        const links = renewalProjectLinks[projectId] ?? {};
        return {
            demo: acc.demo ?? links.demo,
            github: acc.github ?? links.github,
            article: acc.article ?? links.article,
        };
    }, {});
}

function mergeTechStack(projectIds: string[]): string {
    const stacks = projectIds.map((projectId) => getProjectById(projectId).techStack);
    return [...new Set(stacks.join(", ").split(", ").map((item) => item.trim()))].join(", ");
}

const EXPERIENCE_ACHIEVEMENTS: Record<string, string[]> = {
    "maze-company": [
        "팬덤박스 프론트엔드 개발과 UI/UX 기획을 100% 담당하고, ES6 Class 기반 연타·희귀도·이펙트 제어 로직 구축",
        "Laravel View를 Optional FSD 구조로 모듈화하고 SCSS 규격을 정립해 백엔드와의 작업 영역 충돌 및 반복 논의 비용 절감",
        "연타 메커니즘·등급별 파티클 연출과 브랜드 UI 개편으로 일일 이용자 수 120명 → 350명, 190% 이상 증가",
        "메이즈 홈페이지 lazy loading·코드 스플리팅 적용 — Lighthouse Mobile Performance 52 → 81, LCP 4.2s → 2.1s",
    ],
    enjoysoft: [
        "Classic ASP·PHP 서비스를 Next.js·Optional FSD로 전환하고, HUB의 최대 25분 페이지 로딩을 119ms로 단축",
        "아이머신 CEO에 Slack 오류 추적·서버 중심 결제 흐름을 구축해 일일 오류 문의 24건 → 10건 이하, 처리 기간 최대 2일 → 1일 이내로 개선",
        "대리점 셀프오피스를 구축해 본사 운영 문의 31건 → 3~4건, 대리점 처리 기간 1~2주 → 1일 이내로 단축",
        "키업패스의 500줄 이상 컴포넌트를 Optional FSD로 분리하고 관제 UX를 재설계해 기능 수정 공수 3일 → 1일 이내로 단축",
        "8배수 토큰·네임스페이스 컴포넌트·Storybook·Vitest 기반 EDS를 구축해 UI 수정·교체 공수 7일 이상 → 2일로 약 70% 단축",
    ],
};

function buildExperienceAchievements(experienceId: string): string[] {
    const achievements = EXPERIENCE_ACHIEVEMENTS[experienceId];
    if (!achievements) {
        throw new Error(`Unknown resume experience achievements: ${experienceId}`);
    }
    return achievements;
}

function buildExperienceEntry(experienceId: string): RenewalSectionEntry {
    const experience = resumeExperiences.find((item) => item.id === experienceId);
    if (!experience) {
        throw new Error(`Unknown resume experience: ${experienceId}`);
    }

    return {
        id: experience.id,
        title: experience.title,
        subtitle: experience.role,
        period: experience.period,
        techStack: mergeTechStack(experience.projectIds),
        team: experience.team,
        overview: experience.overview,
        achievements: buildExperienceAchievements(experience.id),
        category: EMPLOYMENT_CATEGORY[experience.employmentType],
        links: mergeProjectLinks(experience.projectIds),
    };
}

function buildProjectSectionEntry(project: ResumeProject, categoryOverride?: string): RenewalSectionEntry {
    const visual = renewalProjectVisuals[project.id] ?? { category: "Product" };

    return {
        id: project.id,
        title: project.title,
        subtitle: project.subtitle,
        period: project.period,
        techStack: project.techStack,
        team: project.team,
        overview: project.overview,
        achievements: project.achievements,
        category: categoryOverride ?? visual.category,
        logo: visual.logo,
        links: renewalProjectLinks[project.id] ?? {},
    };
}

export const renewalExperiences: RenewalSectionEntry[] = resumeExperiences.map((experience) =>
    buildExperienceEntry(experience.id),
);

export const renewalSideProject: RenewalSectionEntry = buildProjectSectionEntry(resumeSideProject, SIDE_PROJECT_CATEGORY);

export const renewalContact = {
    email: resumeProfile.email,
    github: resumeProfile.github,
    githubLabel: "github.com/kimsangjunv1",
    quote: '"사용자 경험과 동료의 개발 경험을 함께 개선합니다."',
};

export function getRenewalExperienceAnchorId(experienceId: string) {
    return `renewal-experience-${experienceId}`;
}

export function getRenewalSideProjectAnchorId(projectId: string) {
    return `renewal-side-project-${projectId}`;
}

/** 실제 렌더링 섹션과 동기화된 TOC — 경력·사이드 프로젝트는 데이터에서 자동 생성 */
export const renewalTocItems: RenewalTocItem[] = [
    { id: "renewal-about", label: "About" },
    { id: "renewal-skills", label: "Skills" },
    ...renewalExperiences.map((experience) => ({
        id: getRenewalExperienceAnchorId(experience.id),
        label: EXPERIENCE_TOC_LABELS[experience.id] ?? experience.title,
    })),
    {
        id: getRenewalSideProjectAnchorId(renewalSideProject.id),
        label: "Side Project",
    },
];

export function buildRenewalPersonJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: resumeProfile.name,
        jobTitle: resumeProfile.role,
        email: resumeProfile.email,
        url: resumeProfile.service,
        sameAs: [resumeProfile.github, renewalProfileDetails.linkedin, resumeProfile.portfolio],
        knowsAbout: resumeTechStack,
        description: resumeProfile.introduction,
    };
}
