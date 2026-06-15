import type { ResumeProject } from "./resumeData";
import { resumeExperiences, resumeProfile, resumeProjects, resumeSideProject, resumeTechStack } from "./resumeData";
import {
    renewalBuiltWith,
    renewalCaseStudies,
    renewalCollaboration,
    renewalContactExtended,
    renewalDeepDiveCaseStudy,
    renewalEducation,
    renewalGalleryByProject,
    renewalHeroSecondary,
    renewalHeroStats,
    renewalProfileDetails,
    renewalProjectSliders,
    renewalProjectLinks,
    renewalSkillCategories,
    renewalSkillHighlights,
    renewalTocItems,
    type RenewalCaseStudy,
    type RenewalGalleryItem,
    type RenewalProjectLinks,
    type RenewalProjectVisual,
    type RenewalSliderItem,
} from "./resumeRenewalContent";

export type {
    RenewalCaseStudy,
    RenewalCollaborationItem,
    RenewalDecision,
    RenewalGalleryItem,
    RenewalGalleryLinkType,
    RenewalProjectLinks,
    RenewalSkillCategory,
    RenewalSkillHighlight,
    RenewalSkillItem,
    RenewalSliderItem,
    RenewalTocItem,
} from "./resumeRenewalContent";

export {
    renewalBuiltWith,
    renewalCaseStudies,
    renewalCollaboration,
    renewalContactExtended,
    renewalDeepDiveCaseStudy,
    renewalEducation,
    renewalGalleryByProject,
    renewalHeroSecondary,
    renewalHeroStats,
    renewalProfileDetails,
    renewalProjectSliders,
    renewalProjectLinks,
    renewalSkillCategories,
    renewalSkillHighlights,
    renewalTocItems,
};

export const RENEWAL_REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export const RENEWAL_VIEWPORT = {
    once: false,
    margin: "-10%",
    amount: 0.2,
} as const;

export const RENEWAL_GALLERY_VIEWPORT = {
    once: false,
    margin: "-5%",
    amount: 0.15,
} as const;

export const renewalHero = {
    category: "HELLO",
    title: resumeProfile.name,
    subtitle: resumeProfile.role,
    greeting: `안녕하세요,\n프론트엔드 개발자 ${resumeProfile.name}입니다.`,
    intro: [
        "SaaS·실시간 서비스·레거시 마이그레이션을 경험해 왔습니다. 비즈니스 가치에 맞춰 빠르게 반복하고, 일정 안에서 완성도 있는 결과물을 내는 데 집중해 왔습니다.",
        "성능·UX 개선은 체감 지연·Lighthouse·첫 인터랙션 등 측정 조건을 먼저 정리하고, 그 기준으로 개선해 왔습니다.",
        "API 응답 규격·JWT 인증·Playwright QA 자동화를 제안하고 팀과 합의해 적용한 경험이 있습니다. 프론트엔드 구현뿐 아니라 팀 생산성과 품질 개선에도 기여하고자 합니다.",
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

export type RenewalSectionEntry = Pick<
    ResumeProject,
    "id" | "title" | "subtitle" | "period" | "techStack" | "team" | "overview" | "achievements"
> &
    Partial<Pick<ResumeProject, "highlight" | "chartLabel" | "chartPoints" | "metrics">> &
    RenewalProjectVisual & {
        gallery: RenewalGalleryItem[];
        links: RenewalProjectLinks;
        caseStudy?: RenewalCaseStudy;
    };

export type RenewalProjectEntry = RenewalSectionEntry & {
    caseStudy: RenewalCaseStudy;
};

export const renewalProjectVisuals: Record<string, RenewalProjectVisual> = {
    fandombox: { category: "Product", sliderItems: renewalProjectSliders.fandombox },
    maze: { category: "Corporate", sliderItems: renewalProjectSliders.maze },
    stitchable: { category: "Open Source", sliderItems: renewalProjectSliders.stitchable },
    keepupass: { category: "SaaS Admin", sliderItems: renewalProjectSliders.keepupass },
    "dev-team-process": { category: "Team Lead", sliderItems: renewalProjectSliders["dev-team-process"] },
    kqr: { category: "SaaS", sliderItems: renewalProjectSliders.kqr },
    "imachine-ceo": { category: "SaaS", sliderItems: renewalProjectSliders["imachine-ceo"] },
    "enjoysoft-hub": { category: "Internal SaaS", sliderItems: renewalProjectSliders["enjoysoft-hub"] },
    "agency-ceo": { category: "SaaS", sliderItems: renewalProjectSliders["agency-ceo"] },
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

function mergeSliderItems(projectIds: string[], maxItems = 3): RenewalSliderItem[] {
    const items = projectIds.flatMap((projectId) => renewalProjectSliders[projectId] ?? []);
    return items.slice(0, maxItems);
}

function mergeTechStack(projectIds: string[]): string {
    const stacks = projectIds.map((projectId) => getProjectById(projectId).techStack);
    return [...new Set(stacks.join(", ").split(", ").map((item) => item.trim()))].join(", ");
}

const EXPERIENCE_ACHIEVEMENTS: Record<string, string[]> = {
    "maze-company": [
        "팬덤박스(연타형 게이미피케이션 유저 상품 당첨 플랫폼)와 메이즈 공식 홈페이지 프론트엔드 단독 담당",
        "연타·당첨 플로우 설계 및 REST API 연동 — 진행 상태·당첨·등급별 UI·이펙트 분기 처리",
        "연타 시 API 중복 호출 정리 + 스켈레톤 UI 적용 — Chrome Network 기준 체감 응답 2~3초 → 1초 내외",
        "저사양(iPhone 6) WebP·스프라이트·GPU 레이어 최적화 — Slow 3G 첫 인터랙션 8~10초 → 3~4초",
        "메이즈 홈페이지 lazy loading·코드 스플리팅 적용 — Lighthouse Mobile Performance 52 → 81, LCP 4.2s → 2.1s",
    ],
    enjoysoft: [
        "키업패스·KQR·아이머신 CEO·엔조이소프트 HUB·대리점 CEO 등 B2B SaaS 프론트엔드 개발 담당",
        "개발팀 협업·API·인증·QA 프로세스 개선 제안·문서화·PoC 작성 및 팀 적용",
        "Classic ASP → Next.js 마이그레이션, WebSocket 기반 실시간 출입·관제 UI 구현",
        "API 4키 표준·JWT 갱신·Playwright QA 자동화 — 온보딩 반나절 → 1~2시간, 회귀 QA 1~2시간 → 30~40분",
        "연쇄 API·대량 목록 호출 정리 — 초기 로딩 체감 30초~수 분 → 2~3초",
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
        sliderItems: mergeSliderItems(experience.projectIds),
        gallery: experience.projectIds.flatMap((projectId) => renewalGalleryByProject[projectId] ?? []),
        links: mergeProjectLinks(experience.projectIds),
    };
}

function buildProjectSectionEntry(project: ResumeProject, categoryOverride?: string): RenewalSectionEntry {
    const visual = renewalProjectVisuals[project.id] ?? { category: "Product", sliderItems: [] };

    return {
        ...project,
        ...visual,
        category: categoryOverride ?? visual.category,
        gallery: renewalGalleryByProject[project.id] ?? [],
        links: renewalProjectLinks[project.id] ?? {},
    };
}

function buildProjectSectionEntryById(projectId: string, categoryOverride?: string): RenewalSectionEntry {
    const project = projectId === "stitchable" ? resumeSideProject : getProjectById(projectId);
    return buildProjectSectionEntry(project, categoryOverride);
}

export const renewalExperiences: RenewalSectionEntry[] = resumeExperiences.map((experience) =>
    buildExperienceEntry(experience.id),
);

export const renewalDeepDiveProject: RenewalSectionEntry = {
    ...buildProjectSectionEntryById("fandombox"),
    caseStudy: renewalDeepDiveCaseStudy,
};

export const renewalSideProject: RenewalSectionEntry = buildProjectSectionEntry(resumeSideProject, SIDE_PROJECT_CATEGORY);

/** @deprecated Experience/Side Project 구조로 대체됨. Deep Dive 등 legacy 참조용 */
export const renewalProjects: RenewalProjectEntry[] = resumeProjects
    .filter((project) => renewalCaseStudies[project.id])
    .map((project) => ({
        ...project,
        ...renewalProjectVisuals[project.id],
        gallery: renewalGalleryByProject[project.id] ?? [],
        links: renewalProjectLinks[project.id] ?? {},
        caseStudy: renewalCaseStudies[project.id],
    }));

export const renewalSkillStats = {
    experience: {
        label: "경력",
        value: "2",
        suffix: "+",
        description: `프론트엔드 개발 실무 경력 ${resumeProfile.experience}을 보유하고 있습니다.`,
    },
    skills: {
        label: "skills",
        value: String(resumeTechStack.length),
        suffix: "+",
        description: "실무 프로젝트에서 검증한 역량입니다.",
        items: resumeTechStack,
    },
};

export const renewalFooter = {
    education: `${renewalEducation.education.title} · ${renewalEducation.education.period}`,
    activity: `${renewalEducation.activity.title} · ${renewalEducation.activity.period}`,
};

export const renewalContact = {
    email: resumeProfile.email,
    github: resumeProfile.github,
    githubLabel: "github.com/kimsangjunv1",
    quote: '"저를 필요로 하는 기업과 함께 다양하고 재미난 일들을 벌이고 싶습니다."',
};

export const renewalCta = {
    mail: {
        label: "메일 보내기",
        headline: "SEND MAIL",
        description: "지금 바로, 메일내보세요! — 한 통이면 다음 프로젝트의 시작일이 정해질지도 몰라요.",
        href: `mailto:${resumeProfile.email}`,
        external: false,
    },
    demo: {
        label: "라이브 데모",
        headline: "LIVE DEMO",
        description: "Codi Agit — App Router·Auth·Supabase가 돌아가는 실서비스를 직접 확인하세요.",
        href: resumeProfile.service,
        external: true,
    },
    github: {
        label: "GitHub",
        headline: "VIEW CODE",
        description: "아키텍처·CI·최적화 커밋 히스토리 — 코드로 말합니다.",
        href: resumeProfile.github,
        external: true,
    },
};

export function getRenewalExperienceAnchorId(experienceId: string) {
    return `renewal-experience-${experienceId}`;
}

export function getRenewalDeepDiveAnchorId() {
    return "renewal-deep-dive";
}

export function getRenewalSideProjectAnchorId(projectId: string) {
    return `renewal-side-project-${projectId}`;
}

/** @deprecated renewalExperiences / renewalSideProject 앵커 사용 */
export function getRenewalProjectAnchorId(projectId: string) {
    return `renewal-project-${projectId}`;
}

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
