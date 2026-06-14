"use client";

import { renewalEducation } from "@/shared/constants/resume/resumeRenewalData";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalEducationSection = () => {
    return (
        <RenewalSplitSection id="renewal-education" divider>
            <RenewalRightBlocks
                label={<p className={R.label}>Education & Activity</p>}
                headline={<h2 className={R.keyline}>{renewalEducation.education.title}</h2>}
                description={
                    <div className="flex flex-col gap-[1.2rem]">
                        <p className={R.meta}>{renewalEducation.education.period}</p>
                        <ul className="flex flex-col gap-[0.8rem]">
                            {renewalEducation.education.bullets.map((bullet) => (
                                <li key={bullet} className={R.bodyMuted}>
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                details={
                    <div>
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
                }
            />
        </RenewalSplitSection>
    );
};

export default ResumeRenewalEducationSection;
