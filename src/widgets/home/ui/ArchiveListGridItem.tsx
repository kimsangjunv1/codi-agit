"use client";

import { motion } from "motion/react";

import UI from "@/shared/ui/common/UIComponent";
import { PostItem } from "@/entities/post/model/post.type";

type ArchiveListGridItemProps = {
    post: PostItem;
    onSelect: (idx: number) => void;
};

const ArchiveListGridItem = ({ post, onSelect }: ArchiveListGridItemProps) => {
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
            <UI.Button className="w-full hover:scale-[1.04] transition-transform" onClick={() => onSelect(post.idx)}>
                <motion.img
                    layout="position"
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-[calc(1.6rem*10)] h-[calc(1.6rem*13)] object-cover rounded-[1.6rem] shadow-[var(--shadow-normal)]"
                />
            </UI.Button>
        </motion.section>
    );
};

export default ArchiveListGridItem;
