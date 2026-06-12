import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/shared/lib/siteUrl";
import { getPostSitemapEntries } from "@/shared/lib/seo/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = getSiteUrl();
    const posts = await getPostSitemapEntries();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${siteUrl}/lab`,
            changeFrequency: "weekly",
            priority: 0.7,
        },
    ];

    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${siteUrl}/post/${post.idx}`,
        lastModified: post.created_at,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [...staticRoutes, ...postRoutes];
}
