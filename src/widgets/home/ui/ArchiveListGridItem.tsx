"use client";

import TransitionLink from "@/shared/ui/common/TransitionLink";
import { motion } from "motion/react";

import { PostItem } from "@/entities/post/model/post.type";

type ArchiveListGridItemProps = {
    post: PostItem;
};

const ArchiveListGridItem = ({ post }: ArchiveListGridItemProps) => {
    return (
        <motion.section
            layout
            className="relative w-full"
            initial={{ opacity: 0, transform: "scale(0.8)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0, transform: "scale(0.8)" }}
            transition={{
                type: "spring",
                mass: 0.1,
                stiffness: 100,
                damping: 10,
            }}
        >
            <TransitionLink href={`/post/${post.idx}`} className="block w-full hover:scale-[1.04] transition-transform">
                <motion.img
                    layout="position"
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-[calc(1.6rem*10)] h-[calc(1.6rem*13)] object-cover rounded-[1.6rem] shadow-[var(--shadow-normal)]"
                />
            </TransitionLink>
        </motion.section>
    );
};

export default ArchiveListGridItem;
