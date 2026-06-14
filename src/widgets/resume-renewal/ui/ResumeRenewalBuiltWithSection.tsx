"use client";

import { renewalBuiltWith } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalBuiltWithSection = () => {
    return (
        <RenewalSplitSection id="renewal-built-with" divider>
            <ClippedRevealGroup className="flex flex-col gap-[2.4rem]">
                <ClippedRevealText>
                    <p className={R.label}>Built With</p>
                </ClippedRevealText>

                <ClippedRevealText>
                    <h2 className={R.title}>{renewalBuiltWith.headline}</h2>
                </ClippedRevealText>

                <ClippedRevealText>
                    <p className={R.body}>{renewalBuiltWith.description}</p>
                </ClippedRevealText>

                <ClippedRevealText>
                    <p className={R.bodyMuted}>{renewalBuiltWith.stack.join(" · ")}</p>
                </ClippedRevealText>

                <ClippedRevealText>
                    <div className={`grid grid-cols-2 gap-[2rem] ${R.divider} pt-[2.4rem]`}>
                        {renewalBuiltWith.metrics.map((metric) => (
                            <div key={metric.label}>
                                <p className="text-[2rem] font-bold text-black">{metric.value}</p>
                                <p className={`${R.meta} mt-[0.4rem]`}>{metric.label}</p>
                                {metric.sub && <p className={`${R.meta} mt-[0.2rem]`}>{metric.sub}</p>}
                            </div>
                        ))}
                    </div>
                </ClippedRevealText>

                <ClippedRevealText>
                    <ul className={`flex flex-col gap-[0.8rem] ${R.divider} pt-[2.4rem]`}>
                        {renewalBuiltWith.practices.map((practice) => (
                            <li key={practice} className={R.bodyMuted}>
                                {practice}
                            </li>
                        ))}
                    </ul>
                </ClippedRevealText>
            </ClippedRevealGroup>
        </RenewalSplitSection>
    );
};

export default ResumeRenewalBuiltWithSection;
