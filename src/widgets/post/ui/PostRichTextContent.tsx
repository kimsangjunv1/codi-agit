"use client";

import { useMemo } from "react";

import { extractCodeFromContent, highlightCodeWithHljs } from "@/shared/lib/codeHighlight";
import { sanitizeHtml } from "@/shared/lib/sanitizeHtml";
import CodeBlockPanel from "@/shared/ui/common/CodeBlockPanel";
import { SNIPPET_CODE_BLOCK_TAG } from "@/shared/ui/common/richText/extensions/snippetCodeBlock";

type RichTextPart = { type: "html"; content: string } | { type: "snippet"; content: string; language: string };

export const parsePostRichTextHtml = (html: string): RichTextPart[] => {
    if (!html.trim()) {
        return [];
    }

    if (typeof document === "undefined") {
        return [{ type: "html", content: html }];
    }

    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    const parts: RichTextPart[] = [];

    wrapper.childNodes.forEach((node) => {
        if (node instanceof HTMLElement && node.classList.contains(SNIPPET_CODE_BLOCK_TAG)) {
            const { language, code } = extractCodeFromContent(node.innerHTML);
            parts.push({
                type: "snippet",
                content: code,
                language,
            });
            return;
        }

        if (node instanceof HTMLElement) {
            parts.push({ type: "html", content: node.outerHTML });
            return;
        }

        if (node.textContent?.trim()) {
            parts.push({ type: "html", content: node.textContent });
        }
    });

    return parts.length > 0 ? parts : [{ type: "html", content: html }];
};

type PostRichTextContentProps = {
    html: string;
    className?: string;
    onParagraphClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const SnippetBlockView = ({ content, language }: { content: string; language: string }) => {
    const panelContent = useMemo(() => `<pre class="code-block hljs"><code class="language-${language}">${content}</code></pre>`, [content, language]);
    const highlightedHtml = useMemo(() => sanitizeHtml(`<pre class="code-block hljs"><code>${highlightCodeWithHljs(content, language)}</code></pre>`), [content, language]);

    return (
        <CodeBlockPanel
            content={panelContent}
            variant="compact"
            showFormat={false}
            bodyClassName="py-[0.8rem]"
        >
            <div
                className="code-block-view select-text"
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
        </CodeBlockPanel>
    );
};

const PostRichTextContent = ({ html, className, onParagraphClick }: PostRichTextContentProps) => {
    const parts = useMemo(() => parsePostRichTextHtml(html), [html]);

    return (
        <section
            className={className}
            onClick={onParagraphClick}
        >
            {parts.map((part, index) => {
                if (part.type === "snippet") {
                    return (
                        <SnippetBlockView
                            key={`snippet-${index}`}
                            content={part.content}
                            language={part.language}
                        />
                    );
                }

                return (
                    <div
                        key={`html-${index}`}
                        dangerouslySetInnerHTML={{ __html: part.content }}
                    />
                );
            })}
        </section>
    );
};

export default PostRichTextContent;
