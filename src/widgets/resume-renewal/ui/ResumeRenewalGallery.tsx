"use client";

import { motion } from "motion/react";

import type { RenewalGalleryItem } from "@/shared/constants/resume/resumeRenewalData";
import { RENEWAL_GALLERY_VIEWPORT, RENEWAL_REVEAL_EASE } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";

type ResumeRenewalGalleryProps = {
    items: RenewalGalleryItem[];
};

const ResumeRenewalGallery = ({ items }: ResumeRenewalGalleryProps) => {
    const colCount = items.length <= 4 ? 2 : 3;

    return (
        <div className="w-full border-t border-[#e5e5e5] bg-[#fafafa]">
            <div className="py-[4.8rem]">
                <ClippedRevealGroup>
                    <ClippedRevealText>
                        <h3 className="text-[1.2rem] font-bold tracking-[0.2em] uppercase text-[#111] mb-[3.2rem]">
                            Related Contents
                        </h3>
                    </ClippedRevealText>
                </ClippedRevealGroup>

                <div
                    className="grid"
                    style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={RENEWAL_GALLERY_VIEWPORT}
                            transition={{
                                duration: 0.8,
                                ease: RENEWAL_REVEAL_EASE,
                                delay: index * 0.08,
                            }}
                            className="relative aspect-[16/10] overflow-hidden group"
                        >
                            <div
                                className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
                                style={{ background: item.gradient }}
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-[1.6rem] bg-gradient-to-t from-black/60 to-transparent">
                                <p className="text-[1.2rem] text-white font-medium">{item.label}</p>
                            </div>
                            <div className="absolute top-[1.2rem] right-[1.2rem] w-[0.8rem] h-[0.8rem] rounded-full bg-[#111]" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResumeRenewalGallery;
