"use client";

import { motion } from "motion/react";

import { PostLatestItem } from "@/entities/post/model/post.type";

type ArchiveSliderCardProps = {
    post: PostLatestItem;
    index: number;
    cardRef: (element: HTMLElement | null) => void;
    onSelect: (idx: number) => void;
};

const ArchiveSliderCard = ({ post, index, cardRef, onSelect }: ArchiveSliderCardProps) => {
    return (
        <motion.section
            date-idx={post.idx}
            ref={cardRef}
            className="item w-[36.0rem] relative flex shrink-0 flex-col gap-[1.2rem] overflow-hidden h-[30dvh] rounded-[3.2rem] shadow-[var(--shadow-normal)]"
            initial={{
                opacity: 0,
                y: "100dvh",
                filter: "blur(20px)",
            }}
            animate={{
                y: Math.sin(index * 0.8 + 6 * 0.5) * 90,
                opacity: 1,
                filter: "blur(0px)",
            }}
            exit={{
                opacity: 0,
                filter: "blur(20px)",
            }}
            transition={{
                delay: 0.1 * (index + 1),
                type: "spring",
                stiffness: 100,
                damping: 15,
            }}
            onClick={() => onSelect(post.idx)}
        >
            <img src={post.thumbnail} alt={post.title} className="object-cover h-full pointer-events-none" />
            <div className="absolute h-[30%] mask-[linear-gradient(0deg,_#000,_#000_2.5%,_#000_50%,_#0000)] bottom-0 left-0 w-full bg-[#00000000] backdrop-blur-[30px]" />
            <motion.div
                className="absolute bottom-0 left-[50%] bg-[linear-gradient(0deg,#00000000_0%,#00000000)] transform translate-x-[-50%] w-full flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    type: "spring",
                    mass: 0.1,
                    stiffness: 100,
                    damping: 10,
                }}
            >
                <div className="p-[2.4rem] flex flex-col justify-center gap-[0.8rem]">
                    <div className="relative overflow-hidden">
                        <motion.h5
                            className="text-center text-white font-extrabold text-[calc(1dvh+1.8rem)] leading-[1.5] whitespace-break-spaces"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                                delay: 0.2,
                                type: "spring",
                                mass: 0.1,
                                stiffness: 100,
                                damping: 10,
                            }}
                        >
                            {post.title}
                        </motion.h5>
                    </div>

                    <div className="relative overflow-hidden">
                        <motion.p
                            className="text-center text-[#ffffff99] text-[1.4rem] font-bold whitespace-break-spaces"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                                delay: 0.3,
                                type: "spring",
                                mass: 0.1,
                                stiffness: 100,
                                damping: 10,
                            }}
                        >
                            {post.category?.title} ・ 2025.01.01 ・ 2달전 ・ {post.views} views ・ {post.likes ?? 0} likes
                        </motion.p>
                    </div>

                    <div className="relative overflow-hidden">
                        <motion.p
                            className="text-center text-[#ffffff99] text-[1.4rem] leading-[1.5] font-bold whitespace-break-spaces"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                                delay: 0.4,
                                type: "spring",
                                mass: 0.1,
                                stiffness: 100,
                                damping: 10,
                            }}
                        >
                            {post.summary}
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default ArchiveSliderCard;
