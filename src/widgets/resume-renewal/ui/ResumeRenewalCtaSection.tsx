"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { renewalCta, RENEWAL_REVEAL_EASE, RENEWAL_VIEWPORT } from "@/shared/constants/resume/resumeRenewalData";

const ResumeRenewalCtaSection = () => {
    const items = [renewalCta.mail, renewalCta.resume];

    return (
        <section className="w-full grid grid-rows-2 grid-cols-1">
            {items.map((item, index) => {
                const isMail = index === 0;
                const className = `relative flex flex-col justify-between min-h-[28rem] tablet:min-h-[36rem] p-[3.2rem] tablet:p-[6.4rem] border-b border-[#e5e5e5] overflow-hidden group transition-colors ${
                    isMail ? "bg-[#111111] text-white" : "bg-white text-[#111]"
                }`;

                const content = (
                    <>
                        <p className={`text-[1.4rem] tablet:text-[1.6rem] font-medium max-w-[40rem] leading-[1.6] ${isMail ? "text-white/70" : "text-[#666]"}`}>
                            {item.description}
                        </p>

                        <div className="flex items-end justify-between gap-[2.4rem] mt-[4.8rem]">
                            <p className={`text-[1.3rem] tablet:text-[1.4rem] font-bold tracking-[0.12em] uppercase ${isMail ? "text-white/50" : "text-[#999]"}`}>
                                {item.label}
                            </p>
                            <motion.p
                                className="text-[5.6rem] tablet:text-[10rem] font-bold leading-[0.9] tracking-[-0.04em] group-hover:translate-x-[0.8rem] transition-transform duration-500"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={RENEWAL_VIEWPORT}
                                transition={{ duration: 0.9, ease: RENEWAL_REVEAL_EASE }}
                            >
                                {item.headline}
                            </motion.p>
                        </div>
                    </>
                );

                if (item.href.startsWith("mailto:")) {
                    return (
                        <a key={item.headline} href={item.href} className={className}>
                            {content}
                        </a>
                    );
                }

                return (
                    <Link key={item.headline} href={item.href} className={className}>
                        {content}
                    </Link>
                );
            })}
        </section>
    );
};

export default ResumeRenewalCtaSection;
