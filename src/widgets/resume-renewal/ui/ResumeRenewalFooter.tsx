"use client";

import { motion } from "motion/react";

import { renewalContact, RENEWAL_REVEAL_EASE, RENEWAL_VIEWPORT } from "@/shared/constants/resume/resumeRenewalData";

const ResumeRenewalFooter = () => {
    return (
        <footer className="relative left-1/2 w-screen -translate-x-1/2 bg-[#111111] overflow-hidden">
            <motion.a
                href={`mailto:${renewalContact.email}`}
                className="block w-full px-[2.4rem] tablet:px-[4.8rem] py-[6.4rem] tablet:py-[10rem] text-center hover:opacity-80 transition-opacity"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={RENEWAL_VIEWPORT}
                transition={{ duration: 1, ease: RENEWAL_REVEAL_EASE }}
            >
                <p className="text-[clamp(2.4rem,11vw,14rem)] font-bold text-white leading-[0.95] tracking-[-0.04em] whitespace-nowrap">
                    {renewalContact.email}
                </p>
            </motion.a>
        </footer>
    );
};

export default ResumeRenewalFooter;
