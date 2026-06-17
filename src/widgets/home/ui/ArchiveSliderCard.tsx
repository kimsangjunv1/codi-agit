"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import { PostLatestItem } from "@/entities/post/model/post.type";
import TransitionAwareImage from "@/shared/ui/common/TransitionAwareImage";
import useNavigate from "@/shared/hooks/useNavigate";
import { util } from "@/shared/lib/util";
import Marquee from "@/shared/ui/layout/Marquee";

const MotionLink = motion.create(Link);

type ArchiveSliderCardProps = {
    post: PostLatestItem;
    index: number;
    cardRef: (element: HTMLElement | null) => void;
};

const isModifiedClick = (event: React.MouseEvent<HTMLAnchorElement>) => event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const ArchiveSliderCard = ({ post, index, cardRef }: ArchiveSliderCardProps) => {
    const router = useRouter();
    const { pushToUrl } = useNavigate();
    const postHref = `/post/${post.idx}`;

    return (
        <MotionLink
            href={postHref}
            date-idx={post.idx}
            ref={cardRef}
            className="item w-[36.0rem] relative flex shrink-0 flex-col gap-[1.2rem] overflow-hidden h-[30svh]"
            // className="item w-[36.0rem] relative flex shrink-0 flex-col gap-[1.2rem] overflow-hidden h-[30svh] rounded-[3.2rem] shadow-[var(--shadow-normal)]"
            initial={{
                opacity: 0,
                y: "100svh",
                filter: "blur(20px)",
            }}
            animate={{
                y: Math.sin(index * 0.8 + 6 * 0.5) * 90,
                opacity: 1,
                filter: "blur(0px)",
            }}
            transition={{
                delay: 0.1 * (index + 1),
                type: "spring",
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
            {/* <div className="absolute h-[30%] mask-[linear-gradient(0deg,_#000,_#000_2.5%,_#000_50%,_#0000)] bottom-0 left-0 w-full bg-[#00000000] backdrop-blur-[30px]" /> */}
            <div className="absolute top-[1.6rem] left-[1.6rem] w-full flex flex-col justify-start items-start">
                {/* {post.category?.title} ・ 2025.01.01 ・ 2달전 ・ {post.views} views ・ {post.likes ?? 0} likes */}
                {/* {util.string.getTimeAgo(post.created_at)} */}

                <p className="bg-black p-[0.4rem] text-white font-mono">{util.string.getCurrentFullTime(post.created_at)}</p>
                {/* {util.string.getTimeAgo(post.created_at)} */}
                <Marquee
                    content="NEW"
                    className={{ container: "bg-black gap-[1.2rem] p-[0.4rem]", marquee: "text-white gap-[1.2rem] font-mono" }}
                />
            </div>

            <div
                className="absolute bottom-[1.6rem] left-[1.6rem] w-full flex flex-col justify-start items-start"
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // transition={{
                //     type: "spring",
                //     mass: 0.1,
                //     stiffness: 100,
                //     damping: 10,
                // }}
            >
                <h5 className="bg-[#000000] text-white text-left mobile:text-[2.0rem] pc:text-[2.4rem] font-bold p-[0.4rem_0.4rem_0_0.4rem]">{post.title}</h5>
                <p className="bg-[#000000] text-[#ffffffd0] text-left font-semibold leading-[1.5] text-[#00000090] line-clamp-2 mobile:text-[1.6rem] tablet:text-[2.0rem] p-[0.8rem_0.4rem_0.4rem_0.4rem]">
                    &quot;{post.summary}&quot;
                </p>
                {/* <div className="p-[2.4rem] flex flex-col justify-center gap-[0.8rem] drop-shadow-[0_0_20px_#000]">
                    <div className="relative overflow-hidden">
                        <motion.h5
                            className="text-center text-white font-extrabold text-[calc(1svh+1.8rem)] leading-[1.5] whitespace-break-spaces"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
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
                </div> */}
            </div>
        </MotionLink>
    );
};

export default ArchiveSliderCard;
