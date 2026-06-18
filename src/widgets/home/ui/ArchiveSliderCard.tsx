"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import { PostLatestItem } from "@/entities/post/model/post.type";
import PostThumbnail from "@/shared/ui/common/PostThumbnail";
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
            }}
            animate={{
                y: Math.sin(index * 0.8 + 6 * 0.5) * 90,
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
            <PostThumbnail
                readinessKey={`archive-slider-thumbnail-${post.idx}`}
                seed={post.idx}
                src={post.thumbnail}
                alt={post.title}
                className="object-cover h-full pointer-events-none"
            />

            <div className="absolute top-0 left-0 w-full flex flex-col justify-start items-start">
                <p className="bg-white p-[0.4rem] text-black font-mono">{util.string.getCurrentFullTime(post.created_at)}</p>

                <Marquee
                    content="NEW"
                    className={{ container: "bg-white gap-[1.2rem] p-[0.4rem]", marquee: "text-black gap-[1.2rem] font-mono" }}
                />
            </div>

            <div className="absolute bottom-[1.6rem] left-[1.6rem] w-full flex flex-col justify-start items-start">
                <h5 className="bg-[#000000] text-white text-left mobile:text-[1.4rem] pc:text-[1.8rem] font-semibold p-[0.4rem_0.4rem_0_0.4rem]">{post.title}</h5>
                <p className="bg-[#000000] text-[#ffffff] text-left font-bold leading-[1.5] line-clamp-2 mobile:text-[1.6rem] tablet:text-[2.0rem] p-[0.8rem_0.4rem_0.4rem_0.4rem]">
                    &quot;{post.summary}&quot;
                </p>
            </div>
        </MotionLink>
    );
};

export default ArchiveSliderCard;
