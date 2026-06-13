import type { ResumeProject } from "./resumeData";
import { resumeProfile, resumeProjects, resumeTechStack } from "./resumeData";

export type RenewalGalleryItem = {
    id: string;
    label: string;
    gradient: string;
};

export type RenewalProjectVisual = {
    category: string;
    gallery: RenewalGalleryItem[];
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

const MONO_GRADIENTS = [
    "linear-gradient(135deg, #111111 0%, #333333 100%)",
    "linear-gradient(135deg, #1a1a1a 0%, #444444 100%)",
    "linear-gradient(135deg, #222222 0%, #555555 100%)",
    "linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 100%)",
    "linear-gradient(135deg, #333333 0%, #666666 100%)",
    "linear-gradient(135deg, #1f1f1f 0%, #4a4a4a 100%)",
];

export const renewalHero = {
    category: "Portfolio",
    title: resumeProfile.name,
    subtitle: "프론트엔드 개발자",
    description: resumeProfile.mission,
    body: resumeProfile.introduction,
    role: "Frontend Developer",
    profileImage: "/images/picture/resume-profile.jpg",
};

export const renewalProjectVisuals: Record<string, RenewalProjectVisual> = {
    fandombox: {
        category: "Product",
        gallery: [
            { id: "fb-1", label: "게이미피케이션 UI", gradient: MONO_GRADIENTS[0] },
            { id: "fb-2", label: "등급 이펙트", gradient: MONO_GRADIENTS[1] },
            { id: "fb-3", label: "리워드 플로우", gradient: MONO_GRADIENTS[2] },
            { id: "fb-4", label: "API 최적화", gradient: MONO_GRADIENTS[3] },
            { id: "fb-5", label: "스켈레톤 UI", gradient: MONO_GRADIENTS[4] },
            { id: "fb-6", label: "모바일 뷰", gradient: MONO_GRADIENTS[5] },
        ],
    },
    maze: {
        category: "Corporate",
        gallery: [
            { id: "mz-1", label: "랜딩 히어로", gradient: MONO_GRADIENTS[0] },
            { id: "mz-2", label: "세부 페이지", gradient: MONO_GRADIENTS[1] },
            { id: "mz-3", label: "반응형 레이아웃", gradient: MONO_GRADIENTS[2] },
            { id: "mz-4", label: "성능 개선", gradient: MONO_GRADIENTS[3] },
        ],
    },
    "codi-agit": {
        category: "Personal Service",
        gallery: [
            { id: "ca-1", label: "홈 아카이브", gradient: MONO_GRADIENTS[0] },
            { id: "ca-2", label: "게시물 상세", gradient: MONO_GRADIENTS[1] },
            { id: "ca-3", label: "에디터", gradient: MONO_GRADIENTS[2] },
            { id: "ca-4", label: "관리자", gradient: MONO_GRADIENTS[3] },
            { id: "ca-5", label: "로그인", gradient: MONO_GRADIENTS[4] },
            { id: "ca-6", label: "모바일 메뉴", gradient: MONO_GRADIENTS[5] },
        ],
    },
    keepupass: {
        category: "Admin Dashboard",
        gallery: [
            { id: "kp-1", label: "대시보드", gradient: MONO_GRADIENTS[0] },
            { id: "kp-2", label: "회원 관리", gradient: MONO_GRADIENTS[1] },
            { id: "kp-3", label: "콘텐츠 CRUD", gradient: MONO_GRADIENTS[2] },
            { id: "kp-4", label: "폼 인터랙션", gradient: MONO_GRADIENTS[3] },
        ],
    },
};

export type RenewalProjectEntry = ResumeProject & RenewalProjectVisual;

export const renewalProjects: RenewalProjectEntry[] = resumeProjects.map((project) => ({
    ...project,
    ...renewalProjectVisuals[project.id],
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
    education: "세한대학교 (당진) 정보물류학과 졸업 · 2016.03 ~ 2022.02",
    activity: "이솔 스튜디오 창업 · 2019.10 ~ 2022.06",
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
    },
    resume: {
        label: "이력서 보러가기",
        headline: "VIEW RESUME",
        description: "말보다 숫자가 먼저 나가는 이력서 — 클릭 한 번이면 바로 열려요.",
        href: "/resume",
    },
};
