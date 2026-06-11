import type { Block } from "@/entities/post/model/post.type";

const escapeHtml = (text: string) =>
    text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

export const blockContentToHtml = (content: string | Block[]): string => {
    if (typeof content === "string") {
        return content;
    }

    if (!Array.isArray(content) || content.length === 0) {
        return "";
    }

    return content
        .flatMap((block) =>
            block.children.map((child) => {
                const style = child.style;
                const styleAttr = [
                    style?.lineHeight ? `line-height:${style.lineHeight}` : "",
                    style?.fontSize ? `font-size:${style.fontSize}rem` : "",
                    style?.fontWeight ? `font-weight:${style.fontWeight}` : "",
                    style?.color ? `color:${style.color}` : "",
                    style?.textAlign ? `text-align:${style.textAlign}` : "",
                    style?.backgroundColor ? `background-color:${style.backgroundColor}` : "",
                ]
                    .filter(Boolean)
                    .join(";");

                const text = escapeHtml(child.value).replace(/\n/g, "<br>");
                return styleAttr ? `<p style="${styleAttr}">${text}</p>` : `<p>${text}</p>`;
            }),
        )
        .join("");
};
