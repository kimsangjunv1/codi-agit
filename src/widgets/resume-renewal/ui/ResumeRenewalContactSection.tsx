"use client";

import { renewalContact } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";

const ResumeRenewalContactSection = () => {
    return (
        <section className="w-full bg-[#111111] text-white">
            <div className="grid grid-cols-2 min-h-[40rem] tablet:min-h-[48rem]">
                <div className="border-r border-white/10 min-w-0" aria-hidden />

                <div className="flex flex-col justify-center px-[3.2rem] tablet:px-[6.4rem] py-[8rem] tablet:py-[12rem] min-w-0">
                    <ClippedRevealGroup className="flex flex-col gap-[4.8rem]">
                        <ClippedRevealText>
                            <p className="text-[2.8rem] tablet:text-[3.6rem] font-bold text-white leading-[1.25] tracking-[-0.02em]">
                                {renewalContact.quote}
                            </p>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <a
                                href={`mailto:${renewalContact.email}`}
                                className="block text-[2rem] tablet:text-[3.2rem] font-semibold text-white/80 hover:text-white transition-colors"
                            >
                                {renewalContact.email}
                            </a>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <a
                                href={renewalContact.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-[2rem] tablet:text-[3.2rem] font-semibold text-white/80 hover:text-white transition-colors"
                            >
                                {renewalContact.githubLabel}
                            </a>
                        </ClippedRevealText>
                    </ClippedRevealGroup>
                </div>
            </div>
        </section>
    );
};

export default ResumeRenewalContactSection;
