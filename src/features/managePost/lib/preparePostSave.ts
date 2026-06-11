import { uploadPostImageFetch } from "@/entities/post/api/post.image.api";
import type { SectionContent } from "@/entities/post/model/post.type";
import type { Row } from "@/widgets/post/model/useEditorBlockStore";
import { usePostDraftImageStore } from "@/shared/stores/usePostDraftImageStore";

const replaceUrlInHtml = (html: string, replaceMap: Map<string, string>) => {
    let next = html;

    replaceMap.forEach((remoteUrl, localUrl) => {
        next = next.split(localUrl).join(remoteUrl);
    });

    return next;
};

const replaceRowUrls = (rows: Row[], replaceMap: Map<string, string>): Row[] =>
    rows.map((row) =>
        row.map((block) => {
            const nextBlock: SectionContent = { ...block };

            if (typeof nextBlock.content === "string") {
                nextBlock.content = replaceUrlInHtml(nextBlock.content, replaceMap);
            }

            if (nextBlock.imageUrl) {
                nextBlock.imageUrl = replaceMap.get(nextBlock.imageUrl) ?? nextBlock.imageUrl;
            }

            return nextBlock;
        }),
    );

export const preparePostPayloadForSave = async ({
    title,
    summary,
    thumbnail,
    category_idx,
    contents,
}: {
    title: string;
    summary: string;
    thumbnail: string;
    category_idx: number;
    contents: Row[];
}) => {
    const { images } = usePostDraftImageStore.getState();
    const replaceMap = new Map<string, string>();

    for (const image of images) {
        if (!image.file) continue;

        const uploadedUrl = await uploadPostImageFetch(image.file);
        replaceMap.set(image.previewUrl, uploadedUrl);
    }

    return {
        title,
        summary,
        thumbnail: replaceMap.get(thumbnail) ?? thumbnail,
        category_idx,
        contents: replaceRowUrls(contents, replaceMap),
    };
};

export const collectImagesFromPost = (thumbnail: string, contents: SectionContent[][]) => {
    const urls = new Set<string>();

    if (thumbnail) urls.add(thumbnail);

    contents.forEach((row) => {
        row.forEach((block) => {
            if (block.imageUrl) urls.add(block.imageUrl);

            if (typeof block.content === "string") {
                const matches = block.content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
                for (const match of matches) {
                    if (match[1]) urls.add(match[1]);
                }
            }
        });
    });

    return Array.from(urls).filter((url) => url && url !== "/");
};
