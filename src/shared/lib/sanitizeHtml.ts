import DOMPurify from "isomorphic-dompurify";

import type { SectionContent } from "@/entities/post/model/post.type";

const SANITIZE_OPTIONS = {
    ALLOWED_TAGS: [
        "p",
        "br",
        "strong",
        "em",
        "u",
        "s",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "a",
        "img",
        "blockquote",
        "code",
        "pre",
        "span",
        "mark",
        "hr",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "class", "style", "target", "rel"],
};

export const sanitizeHtml = (dirty: string): string => DOMPurify.sanitize(dirty, SANITIZE_OPTIONS);

export const sanitizePostContents = (contents: SectionContent[][] | undefined): SectionContent[][] => {
    if (!contents) return [];

    return contents.map((row) =>
        row.map((block) => {
            if (typeof block.content !== "string") {
                return block;
            }

            return {
                ...block,
                content: sanitizeHtml(block.content),
            };
        }),
    );
};
