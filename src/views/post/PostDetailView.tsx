import { ComponentProps } from "react";

import { PostDetailPanel } from "@/widgets/post";

type PostDetailViewProps = ComponentProps<typeof PostDetailPanel>;

export default function PostDetailView(props: PostDetailViewProps) {
    return <PostDetailPanel {...props} />;
}
