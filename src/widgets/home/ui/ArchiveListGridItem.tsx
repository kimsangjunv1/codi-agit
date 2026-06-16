"use client";

import { forwardRef } from "react";

import TransitionLink from "@/shared/ui/common/TransitionLink";
import { PostItem } from "@/entities/post/model/post.type";
import { motion } from "motion/react";

const archiveListItemTransition = {
    layout: { type: "spring" as const, stiffness: 500, damping: 40 },
    opacity: { duration: 0.2 },
    scale: { type: "spring" as const, mass: 0.1, stiffness: 100, damping: 10 },
};

type ArchiveListGridItemProps = {
    post: PostItem;
};

const ArchiveListGridItem = forwardRef<HTMLElement, ArchiveListGridItemProps>(function ArchiveListGridItem({ post }, ref) {
    return (
        <motion.section
            ref={ref}
            layout="position"
            className="relative w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={archiveListItemTransition}
        >
            <TransitionLink href={`/post/${post.idx}`} className="block w-full hover:scale-[1.04] transition-transform">
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-[calc(1.6rem*10)] h-[calc(1.6rem*13)] object-cover rounded-[1.6rem] shadow-[var(--shadow-normal)]"
                />
            </TransitionLink>
        </motion.section>
    );
});

export default ArchiveListGridItem;
