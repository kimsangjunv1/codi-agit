"use client";

import { renewalSkillCategories, renewalSkillStats } from "@/shared/constants/resume/resumeRenewalData";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalSkillSection = () => {
    const { experience, skills } = renewalSkillStats;

    return (
        <RenewalSplitSection
            id="renewal-skills"
            divider
            left={
                <div className="flex flex-col gap-[4rem] w-full">
                    <div>
                        <p className={R.meta}>{experience.label}</p>
                        <p className="text-[8rem] font-bold text-[#000000] leading-none tracking-[-0.04em]">
                            {experience.value}
                            <span className="text-[4rem]">{experience.suffix}</span>
                        </p>
                    </div>
                    <div>
                        <p className={R.meta}>{skills.label}</p>
                        <p className="text-[8rem] font-bold text-[#000000] leading-none tracking-[-0.04em]">
                            {skills.value}
                            <span className="text-[4rem]">{experience.suffix}</span>
                        </p>
                    </div>
                </div>
            }
        >
            <RenewalRightBlocks
                label={<p className={R.label}>Skills</p>}
                headline={<p className={R.keyline}>{experience.description}</p>}
                description={<p className={R.bodyMuted}>{skills.description}</p>}
                details={
                    <div className="flex flex-col gap-[2.4rem]">
                        {renewalSkillCategories.map((category, categoryIndex) => (
                            <div
                                key={category.id}
                                className={categoryIndex > 0 ? `${R.divider} pt-[2.4rem]` : ""}
                            >
                                <h3 className="text-[1.8rem] font-bold text-[#000000] mb-[0.8rem]">{category.label}</h3>
                                <p className={`${R.bodyMuted} mb-[1.6rem]`}>{category.description}</p>
                                <p className="text-[1.6rem] font-medium text-[#000000] leading-[1.75]">
                                    {category.items.map((item) => item.name).join(" · ")}
                                </p>
                            </div>
                        ))}
                    </div>
                }
            />
        </RenewalSplitSection>
    );
};

export default ResumeRenewalSkillSection;
