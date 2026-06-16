"use client";

import { forwardRef } from "react";

import TransitionLink from "@/shared/ui/common/TransitionLink";
import TransitionAwareImage from "@/shared/ui/common/TransitionAwareImage";
import { PostItem } from "@/entities/post/model/post.type";
import { util } from "@/shared/lib/util";
import { motion } from "motion/react";

const getCategoryClassName = (categoryIdx: number) => {
    if (categoryIdx === 1) return "text-[var(--color-brand-500)]";
    if (categoryIdx === 2) return "text-[var(--color-blue-500)]";
    return "text-[var(--color-pink-500)]";
};

const archiveListItemTransition = {
    layout: { type: "spring" as const, stiffness: 500, damping: 40 },
    opacity: { duration: 0.2 },
    scale: { type: "spring" as const, mass: 0.1, stiffness: 100, damping: 10 },
};

type ArchiveListDefaultItemProps = {
    post: PostItem;
};

const ArchiveListDefaultItem = forwardRef<HTMLElement, ArchiveListDefaultItemProps>(function ArchiveListDefaultItem({ post }, ref) {
    return (
        <motion.section
            ref={ref}
            layout="position"
            className="max-w-[var(--size-tablet)] mx-auto relative w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={archiveListItemTransition}
        >
            <TransitionLink
                href={`/post/${post.idx}`}
                className="flex justify-start items-center gap-[1.6rem] hover:scale-[1.04] transition-transform px-[1.2rem]"
            >
                <TransitionAwareImage
                    readinessKey={`archive-list-thumbnail-${post.idx}`}
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-[calc(1.6rem*6)] h-[calc(1.6rem*9)] object-cover rounded-[1.6rem] shadow-[var(--shadow-normal)]"
                />

                <div className="flex flex-col gap-[0.8rem] flex-1">
                    <p className={`text-left font-extrabold ${getCategoryClassName(post.category_idx)}`}>{post.category?.title}</p>
                    <h5 className="text-left text-[2.0rem] font-extrabold mobile:text-[1.8rem] tablet:text-[2.2rem]">{post.title}</h5>
                    <p className="text-left font-semibold leading-[1.5] text-[#00000090] line-clamp-2 mobile:text-[1.4rem] tablet:text-[1.8rem]">{post.summary}</p>
                    <h5 className="text-left text-[1.4rem] font-bold text-[#00000090]">
                        {util.string.getCurrentDate(post.created_at)} ・ {post.likes ?? 0} likes
                    </h5>
                </div>
            </TransitionLink>
        </motion.section>
    );
});

export default ArchiveListDefaultItem;
