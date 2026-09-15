import changelogData from "@/shared/lib/content/changelog.json";
import newsletterData from "@/shared/lib/content/newsletter.json";
import roadmapData from "@/shared/lib/content/roadmap.json";

export type ContentSection = {
    heading?: string;
    paragraphs?: string[];
    items?: string[];
};

export type NewsletterPost = {
    slug: string;
    issue: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readingTime: string;
    sections: ContentSection[];
};

export type RoadmapColumn = {
    id: string;
    label: string;
    description: string;
    items: {
        title: string;
        description: string;
        area: string;
        status: string;
    }[];
};

export type ChangelogType = "new-feature" | "improvement" | "bug-fix" | "documentation";

export type ChangelogEntry = {
    slug: string;
    title: string;
    summary: string;
    date: string;
    changeType: ChangelogType;
    products: string[];
    stage: string;
    selfHosted: boolean;
    sections: ContentSection[];
};

export const newsletterPosts = newsletterData as NewsletterPost[];
export const roadmapColumns = roadmapData as RoadmapColumn[];
export const changelogEntries = changelogData as ChangelogEntry[];

export const changelogTypeLabels: Record<ChangelogType, string> = {
    "new-feature": "New feature",
    improvement: "Improvement",
    "bug-fix": "Bug fix",
    documentation: "Documentation",
};

export function formatContentDate(date: string, includeYear = true) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        ...(includeYear ? { year: "numeric" } : {}),
        timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));
}
