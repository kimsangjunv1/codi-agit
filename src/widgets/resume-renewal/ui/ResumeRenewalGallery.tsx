"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import type { RenewalGalleryItem } from "@/shared/constants/resume/resumeRenewalData";
import { RENEWAL_GALLERY_VIEWPORT } from "@/shared/constants/resume/resumeRenewalData";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import RenewalRightBlocks from "./RenewalRightBlocks";
import { R } from "./renewalStyles";

type ResumeRenewalGalleryProps = {
    items: RenewalGalleryItem[];
};

const GalleryImage = ({ item }: { item: RenewalGalleryItem }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, RENEWAL_GALLERY_VIEWPORT);
    const reducedMotion = useReducedMotion();
    const visible = reducedMotion || isInView;

    const content = (
        <>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                <Image src={item.imageSrc} alt={item.label} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
            </div>
            <div className="mt-[1rem]">
                <p className="text-[1.6rem] font-medium text-[#000000]">{item.label}</p>
                <p className={`${R.meta} mt-[0.4rem] line-clamp-2`}>{item.description}</p>
                {item.href && item.linkLabel && <span className={`${R.link} mt-[0.6rem] inline-block`}>{item.linkLabel}</span>}
            </div>
        </>
    );

    return (
        <motion.div
            ref={ref}
            initial={false}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
        >
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
        </motion.div>
    );
};

const ResumeRenewalGallery = ({ items }: ResumeRenewalGalleryProps) => {
    const colCount = items.length <= 4 ? 2 : 3;

    return (
        <section className={`${R.root} ${R.divider}`}>
            <div className={R.split}>
                <div className="hidden tablet:block" aria-hidden />
                <div className={R.right}>
                    <RenewalRightBlocks
                        label={<p className={R.label}>Related Contents</p>}
                        headline={<p className={R.keyline}>프로젝트 실물 근거</p>}
                        description={<p className={R.bodyMuted}>스크린샷·데모·GitHub·아티클 링크</p>}
                        details={
                            <div className="grid gap-[2.4rem]" style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}>
                                {items.map((item) => (
                                    <GalleryImage key={item.id} item={item} />
                                ))}
                            </div>
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default ResumeRenewalGallery;
