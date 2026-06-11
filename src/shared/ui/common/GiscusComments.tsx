"use client";

import { useEffect, useRef } from "react";

type GiscusCommentsProps = {
    term: string;
    className?: string;
};

const GISCUS_SCRIPT_SRC = "https://giscus.app/client.js";

const isGiscusConfigured = () =>
    Boolean(
        process.env.NEXT_PUBLIC_GISCUS_REPO &&
        process.env.NEXT_PUBLIC_GISCUS_REPO_ID &&
        process.env.NEXT_PUBLIC_GISCUS_CATEGORY &&
        process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
    );

const GiscusComments = ({ term, className }: GiscusCommentsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isGiscusConfigured() || !containerRef.current) return;

        containerRef.current.innerHTML = "";

        const script = document.createElement("script");
        script.src = GISCUS_SCRIPT_SRC;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.setAttribute("data-repo", process.env.NEXT_PUBLIC_GISCUS_REPO!);
        script.setAttribute("data-repo-id", process.env.NEXT_PUBLIC_GISCUS_REPO_ID!);
        script.setAttribute("data-category", process.env.NEXT_PUBLIC_GISCUS_CATEGORY!);
        script.setAttribute("data-category-id", process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!);
        script.setAttribute("data-mapping", "specific");
        script.setAttribute("data-term", term);
        script.setAttribute("data-strict", "0");
        script.setAttribute("data-reactions-enabled", "1");
        script.setAttribute("data-emit-metadata", "0");
        script.setAttribute("data-input-position", "bottom");
        script.setAttribute("data-theme", "preferred_color_scheme");
        script.setAttribute("data-lang", "ko");
        script.setAttribute("data-loading", "lazy");

        containerRef.current.appendChild(script);
    }, [term]);

    if (!isGiscusConfigured()) return null;

    return (
        <section className={className}>
            <h3 className="text-[2.0rem] font-bold text-[var(--color-gray-1000)] mb-[2.4rem]">댓글</h3>
            <div ref={containerRef} className="giscus w-full" />
        </section>
    );
};

export default GiscusComments;
