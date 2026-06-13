"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { RENEWAL_REVEAL_EASE, RENEWAL_VIEWPORT, renewalHero } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";

const ResumeRenewalHero = () => {
    return (
        <section className="w-full min-h-[80dvh] grid grid-cols-1 tablet:grid-cols-2 border-b border-[#e5e5e5]">
            <div className="flex items-center justify-center p-[4.8rem] tablet:p-[8rem] border-b tablet:border-b-0 tablet:border-r border-[#e5e5e5] bg-[#f4f4f2]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={RENEWAL_VIEWPORT}
                    transition={{ duration: 1.2, ease: RENEWAL_REVEAL_EASE }}
                    className="relative w-full max-w-[32rem] aspect-[4/5] overflow-hidden bg-[#e5e5e5]"
                >
                    <Image
                        src={renewalHero.profileImage}
                        alt={`${renewalHero.title} 프로필 사진`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 960px) 80vw, 32rem"
                        priority
                    />
                </motion.div>
            </div>

            <div className="flex flex-col justify-center p-[4.8rem] tablet:p-[8rem] bg-white">
                <p className="text-[1.2rem] text-[#aaa] mb-[4.8rem] text-right tracking-[0.15em] uppercase">lab</p>

                <ClippedRevealGroup className="flex flex-col gap-[2.4rem]">
                    <ClippedRevealText>
                        <p className="text-[1.3rem] text-[#888] tracking-wide">{renewalHero.category}</p>
                    </ClippedRevealText>

                    <ClippedRevealText>
                        <h2 className="text-[2.8rem] tablet:text-[3.6rem] font-bold text-[#111] leading-[1.25] tracking-[-0.02em]">
                            {renewalHero.description}
                        </h2>
                    </ClippedRevealText>

                    <ClippedRevealText>
                        <p className="text-[1.5rem] leading-[1.75] text-[#444]">{renewalHero.body}</p>
                    </ClippedRevealText>

                    <ClippedRevealText>
                        <div className="pt-[2.4rem]">
                            <p className="text-[1.3rem] text-[#888]">{renewalHero.role}</p>
                            <p className="text-[2.4rem] font-bold text-[#111] mt-[0.4rem]">{renewalHero.title}</p>
                        </div>
                    </ClippedRevealText>
                </ClippedRevealGroup>
            </div>
        </section>
    );
};

export default ResumeRenewalHero;
