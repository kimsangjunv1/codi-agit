"use client";

import { motion } from "motion/react";

import UI from "@/shared/ui/common/UIComponent";
import { util } from "@/shared/lib/util";
import { PostItem } from "@/entities/post/model/post.type";

type ArchiveListDefaultItemProps = {
    post: PostItem;
    onSelect: (idx: number) => void;
};

const getCategoryClassName = (categoryIdx: number) => {
    if (categoryIdx === 1) return "text-[var(--color-brand-500)]";
    if (categoryIdx === 2) return "text-[var(--color-blue-500)]";
    return "text-[var(--color-pink-500)]";
};

const ArchiveListDefaultItem = ({ post, onSelect }: ArchiveListDefaultItemProps) => {
    return (
        <motion.section
            layout
            className="max-w-[var(--size-tablet)] mx-auto relative w-full"
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
            <UI.Button
                className="flex justify-start items-center gap-[1.6rem] hover:scale-[1.04] transition-transform px-[1.2rem]"
                onClick={() => onSelect(post.idx)}
            >
                <motion.img
                    layout="position"
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-[calc(1.6rem*6)] h-[calc(1.6rem*9)] object-cover rounded-[1.6rem] shadow-[var(--shadow-normal)]"
                />

                <div className="flex flex-col gap-[0.8rem] flex-1">
                    <p className={`text-left font-extrabold ${getCategoryClassName(post.category_idx)}`}>{post.category?.title}</p>
                    <h5 className="text-left text-[2.0rem] font-extrabold mobile:text-[1.8rem] tablet:text-[2.2rem]">{post.title}</h5>
                    <p className="text-left font-semibold leading-[1.5] text-[#00000090] line-clamp-2 mobile:text-[1.4rem] tablet:text-[1.8rem]">
                        {post.summary}
                    </p>
                    <h5 className="text-left text-[1.4rem] font-bold text-[#00000090]">
                        {util.string.getCurrentDate(post.created_at)} ・ {post.likes ?? 0} likes
                    </h5>
                </div>
            </UI.Button>
        </motion.section>
    );
};

export default ArchiveListDefaultItem;
