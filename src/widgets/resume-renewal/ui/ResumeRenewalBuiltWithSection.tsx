"use client";

import { renewalBuiltWith } from "@/shared/constants/resume/resumeRenewalData";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalBuiltWithSection = () => {
    return (
        <RenewalSplitSection id="renewal-built-with" divider>
            <RenewalRightBlocks
                label={<p className={R.label}>Built With</p>}
                headline={<h2 className={R.keyline}>{renewalBuiltWith.headline}</h2>}
                description={<p className={R.body}>{renewalBuiltWith.description}</p>}
                details={
                    <div className="flex flex-col gap-[2.4rem]">
                        <p className={R.bodyMuted}>{renewalBuiltWith.stack.join(" · ")}</p>

                        <div className={`grid grid-cols-2 gap-[2rem] ${R.divider} pt-[2.4rem]`}>
                            {renewalBuiltWith.metrics.map((metric) => (
                                <div key={metric.label}>
                                    <p className="text-[2rem] font-bold text-[#000000]">{metric.value}</p>
                                    <p className={`${R.meta} mt-[0.4rem]`}>{metric.label}</p>
                                    {metric.sub && <p className={`${R.meta} mt-[0.2rem]`}>{metric.sub}</p>}
                                </div>
                            ))}
                        </div>

                        <ul className={`flex flex-col gap-[0.8rem] ${R.divider} pt-[2.4rem]`}>
                            {renewalBuiltWith.practices.map((practice) => (
                                <li key={practice} className={R.bodyMuted}>
                                    {practice}
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            />
        </RenewalSplitSection>
    );
};

export default ResumeRenewalBuiltWithSection;
