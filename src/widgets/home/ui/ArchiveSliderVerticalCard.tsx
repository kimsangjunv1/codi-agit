"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { PostLatestItem } from "@/entities/post/model/post.type";
import TransitionAwareImage from "@/shared/ui/common/TransitionAwareImage";
import Marquee from "@/shared/ui/layout/Marquee";
import { util } from "@/shared/lib/util";

const MotionLink = motion.create(Link);

type ArchiveSliderVerticalCardProps = {
    post: PostLatestItem;
};

const ArchiveSliderVerticalCard = ({ post }: ArchiveSliderVerticalCardProps) => {
    const cardRef = useRef<HTMLAnchorElement | null>(null);
    const postHref = `/post/${post.idx}`;
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center", "end start"],
    });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

    return (
        <MotionLink
            ref={cardRef}
            href={postHref}
            data-idx={post.idx}
            aria-label={post.title}
            className="block h-[30svh] w-[80dvw] shrink-0 origin-center will-change-transform"
            // className="block h-[30svh] w-[calc(100dvw-(1.6rem*6))] shrink-0 origin-center will-change-transform"
            // className="block h-[30svh] w-[75dvw] shrink-0 origin-center will-change-transform"
            style={{ scale }}
        >
            <TransitionAwareImage
                readinessKey={`archive-slider-thumbnail-${post.idx}`}
                src={post.thumbnail}
                alt={post.title}
                className="object-cover h-full w-full pointer-events-none"
            />

            <div className="absolute top-[1.6rem] left-[1.6rem] w-full flex flex-col justify-start items-start">
                <p className="bg-black p-[0.4rem] text-white font-mono">{util.string.getCurrentFullTime(post.created_at)}</p>

                <Marquee
                    content="NEW"
                    className={{ container: "bg-black gap-[1.2rem] p-[0.4rem]", marquee: "text-white gap-[1.2rem] font-mono" }}
                />
            </div>

            <div className="absolute bottom-[1.6rem] left-[1.6rem] w-full flex flex-col justify-start items-start">
                <h5 className="bg-[#000000] text-white text-left mobile:text-[1.4rem] pc:text-[1.8rem] font-semibold p-[0.4rem_0.4rem_0_0.4rem]">{post.title}</h5>
                <p className="bg-[#000000] text-[#39ff28] text-left font-bold leading-[1.5] line-clamp-2 mobile:text-[1.6rem] tablet:text-[2.0rem] p-[0.8rem_0.4rem_0.4rem_0.4rem]">
                    &quot;{post.summary}&quot;
                </p>
            </div>
        </MotionLink>
    );
};

export default ArchiveSliderVerticalCard;
