"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import { PostLatestItem } from "@/entities/post/model/post.type";
import { useLightMotion } from "@/shared/hooks/useLightMotion";
import TransitionAwareImage from "@/shared/ui/common/TransitionAwareImage";
import useNavigate from "@/shared/hooks/useNavigate";

const MotionLink = motion.create(Link);

type ArchiveSliderCardProps = {
    post: PostLatestItem;
    index: number;
};

const isModifiedClick = (event: React.MouseEvent<HTMLAnchorElement>) => event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const ArchiveSliderCard = ({ post, index }: ArchiveSliderCardProps) => {
    const router = useRouter();
    const { pushToUrl } = useNavigate();
    const lightMotion = useLightMotion();
    const postHref = `/post/${post.idx}`;

    return (
        <MotionLink
            href={postHref}
            date-idx={post.idx}
            className="item w-[36.0rem] relative flex shrink-0 flex-col gap-[1.2rem] overflow-hidden h-[50svh]"
            initial={{
                opacity: 0,
                y: lightMotion ? 0 : "100svh",
                filter: lightMotion ? "blur(0px)" : "blur(20px)",
            }}
            animate={{
                y: lightMotion ? 0 : Math.sin(index * 0.8 + 6 * 0.5) * 90,
                opacity: 1,
                filter: "blur(0px)",
            }}
            transition={{
                delay: lightMotion ? 0 : 0.1 * (index + 1),
                type: lightMotion ? "tween" : "spring",
                duration: lightMotion ? 0.35 : undefined,
                stiffness: 100,
                damping: 15,
            }}
            onMouseEnter={() => router.prefetch(postHref)}
            onClick={(event) => {
                if (event.defaultPrevented || isModifiedClick(event)) return;

                event.preventDefault();
                pushToUrl(postHref);
            }}
        >
            <TransitionAwareImage
                readinessKey={`archive-slider-thumbnail-${post.idx}`}
                src={post.thumbnail}
                alt={post.title}
                className="object-cover h-full pointer-events-none"
            />
            <div className="absolute h-[30%] mask-[linear-gradient(0deg,_#000,_#000_2.5%,_#000_50%,_#0000)] bottom-0 left-0 w-full bg-[linear-gradient(0deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0)_100%)] mobile:bg-[linear-gradient(0deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0)_100%)] pc:backdrop-blur-[30px]" />
            <motion.div
                className="absolute bottom-0 left-[50%] bg-[linear-gradient(0deg,#00000000_0%,#00000000)] transform translate-x-[-50%] w-full flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    type: lightMotion ? "tween" : "spring",
                    duration: lightMotion ? 0.25 : undefined,
                    mass: 0.1,
                    stiffness: 100,
                    damping: 10,
                }}
            >
                <div className="p-[2.4rem] flex flex-col justify-center gap-[0.8rem] drop-shadow-[0_0_20px_#000]">
                    <div className="relative overflow-hidden">
                        <motion.h5
                            className="text-center text-white font-extrabold text-[calc(1svh+1.8rem)] leading-[1.5] whitespace-break-spaces"
                            initial={{ opacity: 0, y: lightMotion ? 0 : -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: lightMotion ? 0 : 0.2,
                                type: lightMotion ? "tween" : "spring",
                                duration: lightMotion ? 0.25 : undefined,
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
                            initial={{ opacity: 0, y: lightMotion ? 0 : -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: lightMotion ? 0 : 0.3,
                                type: lightMotion ? "tween" : "spring",
                                duration: lightMotion ? 0.25 : undefined,
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
                            initial={{ opacity: 0, y: lightMotion ? 0 : -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: lightMotion ? 0 : 0.4,
                                type: lightMotion ? "tween" : "spring",
                                duration: lightMotion ? 0.25 : undefined,
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
        </MotionLink>
    );
};

export default ArchiveSliderCard;
