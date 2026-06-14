"use client";

import Link from "next/link";

import { renewalCta } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalCtaSection = () => {
    const items = [renewalCta.mail, renewalCta.demo, renewalCta.github, renewalCta.resume];

    return (
        <RenewalSplitSection divider>
            <ClippedRevealGroup className="flex flex-col gap-[2.4rem]">
                <ClippedRevealText>
                    <p className={R.label}>Links</p>
                </ClippedRevealText>

                {items.map((item, index) => (
                    <ClippedRevealText key={item.headline}>
                        <div className={index === 0 ? "" : `${R.divider} pt-[2.4rem]`}>
                            <p className="text-[1.8rem] font-bold text-black">{item.headline}</p>
                            <p className={`${R.bodyMuted} mt-[0.8rem]`}>{item.description}</p>
                            {item.href.startsWith("mailto:") ? (
                                <a href={item.href} className={`${R.link} mt-[1rem] inline-block`}>
                                    {item.label}
                                </a>
                            ) : item.external ? (
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${R.link} mt-[1rem] inline-block`}>
                                    {item.label}
                                </a>
                            ) : (
                                <Link href={item.href} className={`${R.link} mt-[1rem] inline-block`}>
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    </ClippedRevealText>
                ))}
            </ClippedRevealGroup>
        </RenewalSplitSection>
    );
};

export default ResumeRenewalCtaSection;
