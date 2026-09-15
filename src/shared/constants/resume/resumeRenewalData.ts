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
        "2년 7개월간 React·Next.js 기반 프론트엔드 개발을 담당하며, 결제·정산 시스템과 대규모 백오피스의 신규 구축 및 레거시 전환을 주도해 왔습니다.",
        "약 8,000건 규모의 데이터 조회 병목과 고빈도 인터랙션의 API 호출·렌더링 성능을 개선하고, API 에러 로깅·알림 체계로 운영 안정성을 높였습니다.",
        "사용자에게 보이는 화면뿐 아니라, 제품을 함께 만드는 사람들의 개발·협업 경험까지 개선하는 프론트엔드 개발자를 지향합니다.",
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
    fivepixels: { category: "Open Source" },
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
        "Laravel의 MVC 및 서버 사이드 렌더링 구조를 유지하면서, Blade 템플릿과 프론트엔드 리소스를 페이지·기능·도메인·공통 UI 단위로 분리하는 FSD 설계",
        "팬덤박스 프론트엔드 개발과 UI/UX 기획을 100% 담당하고, ES6 Class 기반 연타·희귀도·이펙트 제어 로직 구축",
        "파티클 연출과 브랜드 UI 개편으로 일일 이용자 수 120명 → 350명, 190% 이상 증가",
        "연타 진행률, 클릭 수, 희귀도 판단 및 상응하는 이펙트 제어 로직을 하나의 Class로 캡슐화하여 상태 및 액션 관리 최적화",
    ],
    enjoysoft: [
        "Classic ASP·PHP 서비스를 Next.js·Optional FSD로 마이그레이션 하여 작업 경험을 일관되게 통일",
        "Slack을 통해 에러 알림 시스템을 구축하여 일일 오류 문의 24건 → 10건 이하, 처리 기간 최대 2일 → 1일 이내로 개선",
        "사내 디자인 시스템을 구축하고 UI 수정·교체 공수 7일 이상 → 2일로 약 70% 단축",
        "화면상에 피드백을 남길 수 있는 전용 툴을 제작하여 개발과 QA 부서간의 의사소통 어려움 해소",
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
    notion: "https://app.notion.com/p/3d4a7d54d69680e59c30d5f43f0e8e45?source=copy_link",
    notionLabel: "노션"
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
    ...renewalExperiences.map((experience) => ({
        id: getRenewalExperienceAnchorId(experience.id),
        label: EXPERIENCE_TOC_LABELS[experience.id] ?? experience.title,
    })),
    { id: "renewal-projects", label: "Projects" },
    { id: "renewal-skills", label: "Skills" },
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
