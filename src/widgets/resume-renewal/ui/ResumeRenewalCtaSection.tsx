"use client";

import Link from "next/link";

import { renewalCta } from "@/shared/constants/resume/resumeRenewalData";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalCtaSection = () => {
    const items = [renewalCta.mail, renewalCta.demo, renewalCta.github];

    return (
        <RenewalSplitSection divider>
            <RenewalRightBlocks
                label={<p className={R.label}>Links</p>}
                headline={<h2 className={R.keyline}>{renewalCta.mail.headline}</h2>}
                description={<p className={R.body}>{renewalCta.mail.description}</p>}
                details={
                    <div className="flex flex-col gap-[2.4rem]">
                        {items.map((item, index) => (
                            <div key={item.headline} className={index > 0 ? `${R.divider} pt-[2.4rem]` : ""}>
                                <p className="text-[1.8rem] font-bold text-[#000000]">{item.headline}</p>
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
                        ))}
                    </div>
                }
            />
        </RenewalSplitSection>
    );
};

export default ResumeRenewalCtaSection;
