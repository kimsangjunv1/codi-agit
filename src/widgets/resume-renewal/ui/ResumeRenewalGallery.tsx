"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import type { RenewalGalleryItem } from "@/shared/constants/resume/resumeRenewalData";
import { RENEWAL_GALLERY_VIEWPORT } from "@/shared/constants/resume/resumeRenewalData";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import ClippedRevealText from "./ClippedRevealText";
import { R } from "./renewalStyles";

type ResumeRenewalGalleryProps = {
    items: RenewalGalleryItem[];
};

const GalleryImage = ({ item }: { item: RenewalGalleryItem }) => {
    const reducedMotion = useReducedMotion();
    const MotionDiv = reducedMotion ? "div" : motion.div;
    const motionProps = reducedMotion
        ? {}
        : {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: RENEWAL_GALLERY_VIEWPORT,
              transition: { duration: 0.6 },
          };

    const image = (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eee]">
            <Image src={item.imageSrc} alt={item.label} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
        </div>
    );

    const caption = (
        <div className="mt-[1rem]">
            <p className="text-[1.4rem] font-medium text-black">{item.label}</p>
            <p className={`${R.meta} mt-[0.4rem] line-clamp-2`}>{item.description}</p>
            {item.href && item.linkLabel && <span className={`${R.link} mt-[0.6rem] inline-block`}>{item.linkLabel}</span>}
        </div>
    );

    const content = (
        <>
            {image}
            {caption}
        </>
    );

    return (
        <MotionDiv {...motionProps}>
            {item.href ? (
                item.href.startsWith("http") ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                        {content}
                    </a>
                ) : (
                    <Link href={item.href} className="block">
                        {content}
                    </Link>
                )
            ) : (
                <div>{content}</div>
            )}
        </MotionDiv>
    );
};

const ResumeRenewalGallery = ({ items }: ResumeRenewalGalleryProps) => {
    const colCount = items.length <= 4 ? 2 : 3;

    return (
        <section className={R.divider}>
            <div className={R.split}>
                <div className="hidden tablet:block" aria-hidden />
                <div className={`${R.right} !py-[4rem] tablet:!py-[6rem]`}>
                    <ClippedRevealText>
                        <p className={R.label}>Related Contents</p>
                        <p className={`${R.bodyMuted} mt-[1rem]`}>스크린샷·데모·GitHub·아티클</p>
                    </ClippedRevealText>
                </div>
            </div>

            <div className={R.split}>
                <div className="hidden tablet:block" aria-hidden />
                <div className={`${R.right} !pt-0 !pb-[6rem] tablet:!pb-[10rem]`}>
                    <div className="grid gap-[2.4rem]" style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}>
                        {items.map((item) => (
                            <GalleryImage key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResumeRenewalGallery;
