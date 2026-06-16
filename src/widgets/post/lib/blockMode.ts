import type { SectionContent } from "@/entities/post/model/post.type";

export type BlockMode = "main" | "sub";

export const resolveBlockMode = (block: SectionContent): BlockMode => {
    if (block.blockMode === "main" || block.blockMode === "sub") {
        return block.blockMode;
    }

    const hasHeading = Boolean(block.title?.trim() || block.subtitle?.trim());
    return hasHeading ? "main" : "sub";
};

export const isMainBlock = (block: SectionContent) => resolveBlockMode(block) === "main";
