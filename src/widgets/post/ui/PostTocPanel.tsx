"use client";

import { useMemo } from "react";

import type { SectionContent } from "@/entities/post/model/post.type";
import { buildPostToc } from "@/widgets/post/lib/postToc";
import { useBlockStore } from "@/widgets/post/model/useEditorBlockStore";
import PostTocNav from "@/widgets/post/ui/PostTocNav";

type PostTocPanelProps = {
    contents?: SectionContent[][];
};

const PostTocPanel = ({ contents }: PostTocPanelProps) => {
    const rows = useBlockStore((state) => state.rows);
    const items = useMemo(() => buildPostToc(contents ?? rows), [contents, rows]);

    return <PostTocNav items={items} />;
};

export default PostTocPanel;
