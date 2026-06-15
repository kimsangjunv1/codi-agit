const SKILL_ICON_BASE = "/images/icon/common";

export const resumeSkillIconMap: Record<string, string> = {
    React: `${SKILL_ICON_BASE}/ico-common-react.svg`,
    "Next.js": `${SKILL_ICON_BASE}/ico-common-nextjs.svg`,
    TypeScript: `${SKILL_ICON_BASE}/ico-common-typescript.svg`,
    JavaScript: `${SKILL_ICON_BASE}/ico-common-javascript.svg`,
    "REST API": `${SKILL_ICON_BASE}/ico-common-rest-api.svg`,
    Zustand: `${SKILL_ICON_BASE}/ico-common-zustand.svg`,
    "React Query": `${SKILL_ICON_BASE}/ico-common-tanstack-query.svg`,
    "TanStack React Query": `${SKILL_ICON_BASE}/ico-common-tanstack-query.svg`,
    SCSS: `${SKILL_ICON_BASE}/ico-common-scss.svg`,
    "Tailwind CSS": `${SKILL_ICON_BASE}/ico-common-tailwindcss.svg`,
    GSAP: `${SKILL_ICON_BASE}/ico-common-gsap.svg`,
    "Framer Motion": `${SKILL_ICON_BASE}/ico-common-framer-motion.svg`,
    Supabase: `${SKILL_ICON_BASE}/ico-common-supabase.svg`,
    NextAuth: `${SKILL_ICON_BASE}/ico-common-nextauth.svg`,
    SEO: `${SKILL_ICON_BASE}/ico-common-seo.svg`,
};

export const getResumeSkillIcon = (name: string, fallback: string) => resumeSkillIconMap[name] ?? fallback;
