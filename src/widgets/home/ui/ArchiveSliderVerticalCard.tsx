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

type ArchiveSliderVerticalCardProps = {
    post: PostLatestItem;
    index: number;
    pauseAnimations?: boolean;
    cardRef: (element: HTMLElement | null) => void;
};

const isModifiedClick = (event: React.MouseEvent<HTMLAnchorElement>) => event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const ArchiveSliderVerticalCard = ({ post, index, pauseAnimations = false, cardRef }: ArchiveSliderVerticalCardProps) => {
    const router = useRouter();
    const { pushToUrl } = useNavigate();
    const postHref = `/post/${post.idx}`;

    return (
        <MotionLink
            href={postHref}
            date-idx={post.idx}
            ref={cardRef}
            className="item w-[75dvw] relative flex shrink-0 flex-col gap-[1.2rem] overflow-hidden h-[30svh]"
            initial={{
                opacity: 0,
                x: "100dvw",
            }}
            animate={{
                x: Math.sin(index * 0.8 + 6 * 0.5) * 40,
                opacity: 1,
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
                readinessKey={`archive-slider-vertical-thumbnail-${post.idx}`}
                src={post.thumbnail}
                alt={post.title}
                className="object-cover h-full pointer-events-none"
            />
            <div className="absolute top-[1.6rem] left-[1.6rem] w-full flex flex-col justify-start items-start">
                {util.string.getTimeAgo(post.created_at)}
                <Marquee
                    content="NEW"
                    paused={pauseAnimations}
                    className={{ container: "bg-black gap-[1.2rem]", marquee: "text-white gap-[1.2rem]" }}
                />
            </div>

            <div className="absolute bottom-[1.6rem] left-[1.6rem] w-full flex flex-col justify-start items-start">
                <h5 className="bg-[#000000] text-white text-left text-[2.0rem] font-bold p-[0.4rem_0.4rem_0_0.4rem]">{post.title}</h5>
                <p className="bg-[#000000] text-[#ffffffd0] text-left font-semibold leading-[1.5] line-clamp-2 text-[1.6rem] p-[0.8rem_0.4rem_0.4rem_0.4rem]">&quot;{post.summary}&quot;</p>
            </div>
        </MotionLink>
    );
};

export default ArchiveSliderVerticalCard;
