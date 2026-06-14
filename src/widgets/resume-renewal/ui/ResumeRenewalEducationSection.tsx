"use client";

import { renewalEducation } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalEducationSection = () => {
    return (
        <RenewalSplitSection id="renewal-education" divider>
            <ClippedRevealGroup className="flex flex-col gap-[2.4rem]">
                <ClippedRevealText>
                    <p className={R.label}>Education & Activity</p>
                </ClippedRevealText>

                <ClippedRevealText>
                    <div>
                        <h3 className="text-[1.8rem] font-bold text-black">{renewalEducation.education.title}</h3>
                        <p className={`${R.meta} mt-[0.4rem]`}>{renewalEducation.education.period}</p>
                        <ul className="mt-[1.2rem] flex flex-col gap-[0.8rem]">
                            {renewalEducation.education.bullets.map((bullet) => (
                                <li key={bullet} className={R.bodyMuted}>
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>
                </ClippedRevealText>

                <ClippedRevealText>
                    <div className={`${R.divider} pt-[2.4rem]`}>
                        <h3 className="text-[1.8rem] font-bold text-black">{renewalEducation.activity.title}</h3>
                        <p className={`${R.meta} mt-[0.4rem]`}>{renewalEducation.activity.period}</p>
                        <p className={`${R.bodyMuted} mt-[1rem]`}>{renewalEducation.activity.description}</p>
                        <ul className="mt-[1.2rem] flex flex-col gap-[0.8rem]">
                            {renewalEducation.activity.bullets.map((bullet) => (
                                <li key={bullet} className={R.bodyMuted}>
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>
                </ClippedRevealText>
            </ClippedRevealGroup>
        </RenewalSplitSection>
    );
};

export default ResumeRenewalEducationSection;
