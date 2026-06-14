import type { ResumeProject } from "./resumeData";
import { resumeProfile, resumeProjects, resumeTechStack } from "./resumeData";
import {
    renewalBuiltWith,
    renewalCaseStudies,
    renewalCollaboration,
    renewalContactExtended,
    renewalEducation,
    renewalGalleryByProject,
    renewalProfileDetails,
    renewalProjectLinks,
    renewalSkillCategories,
    renewalTocItems,
    type RenewalGalleryItem,
    type RenewalProjectVisual,
} from "./resumeRenewalContent";

export type {
    RenewalCaseStudy,
    RenewalCollaborationItem,
    RenewalDecision,
    RenewalGalleryItem,
    RenewalGalleryLinkType,
    RenewalProjectLinks,
    RenewalSkillCategory,
    RenewalSkillItem,
    RenewalTocItem,
} from "./resumeRenewalContent";

export {
    renewalBuiltWith,
    renewalCaseStudies,
    renewalCollaboration,
    renewalContactExtended,
    renewalEducation,
    renewalGalleryByProject,
    renewalProfileDetails,
    renewalProjectLinks,
    renewalSkillCategories,
    renewalTocItems,
};

export const RENEWAL_REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export const RENEWAL_VIEWPORT = {
    once: false,
    margin: "-10%",
} as const;

export const RENEWAL_GALLERY_VIEWPORT = {
    once: false,
    margin: "-5%",
} as const;

export const renewalHero = {
    category: "Portfolio",
    title: resumeProfile.name,
    subtitle: "프론트엔드 개발자",
    description: resumeProfile.mission,
    body: resumeProfile.introduction,
    role: "Frontend Developer",
    profileImage: "/images/picture/resume-profile.jpg",
    quickLinks: [
        { label: "Live Demo", href: resumeProfile.service, external: true },
        { label: "GitHub", href: resumeProfile.github, external: true },
        { label: "Email", href: `mailto:${resumeProfile.email}`, external: false },
    ],
};

export type RenewalProjectEntry = ResumeProject &
    RenewalProjectVisual & {
        gallery: RenewalGalleryItem[];
        links: (typeof renewalProjectLinks)[string];
        caseStudy: (typeof renewalCaseStudies)[string];
    };

export const renewalProjectVisuals: Record<string, RenewalProjectVisual> = {
    fandombox: { category: "Product" },
    maze: { category: "Corporate" },
    "codi-agit": { category: "Personal Service" },
    keepupass: { category: "Admin Dashboard" },
};

export const renewalProjects: RenewalProjectEntry[] = resumeProjects.map((project) => ({
    ...project,
    category: renewalProjectVisuals[project.id].category,
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
        suffix: "",
        description: `React·Next.js·TypeScript 등 ${resumeTechStack.length}개의 기술 스택을 활용해 프로젝트를 진행했습니다.`,
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
    resume: {
        label: "상세 이력서",
        headline: "VIEW RESUME",
        description: "숫자·프로젝트·학력이 정리된 /resume — 브라우저 인쇄(Ctrl+P)로 PDF 저장 가능.",
        href: "/resume",
        external: false,
    },
};

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
