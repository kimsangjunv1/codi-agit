"use client";

import {
    getRenewalProjectAnchorId,
    renewalSkillCategories,
    renewalSkillStats,
} from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const scrollToProject = (projectId: string) => {
    document.getElementById(getRenewalProjectAnchorId(projectId))?.scrollIntoView({ behavior: "smooth", block: "start" });
};

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
                        <p className="text-[8rem] font-bold text-black leading-none tracking-[-0.04em]">
                            {experience.value}
                            <span className="text-[4rem]">{experience.suffix}</span>
                        </p>
                    </div>
                    <div>
                        <p className={R.meta}>{skills.label}</p>
                        <p className="text-[8rem] font-bold text-black leading-none tracking-[-0.04em]">{skills.value}</p>
                    </div>
                </div>
            }
        >
            <ClippedRevealGroup className="flex flex-col gap-[2.4rem]">
                <ClippedRevealText>
                    <p className={R.label}>Skills</p>
                </ClippedRevealText>

                <ClippedRevealText>
                    <p className={R.body}>{experience.description}</p>
                </ClippedRevealText>

                <ClippedRevealText>
                    <p className={R.bodyMuted}>{skills.description}</p>
                </ClippedRevealText>

                {renewalSkillCategories.map((category, categoryIndex) => (
                    <ClippedRevealText key={category.id}>
                        <div className={categoryIndex > 0 ? `${R.divider} pt-[2.4rem]` : ""}>
                            <h3 className="text-[1.8rem] font-bold text-black mb-[0.8rem]">{category.label}</h3>
                            <p className={`${R.bodyMuted} mb-[1.6rem]`}>{category.description}</p>
                            <ul className="flex flex-col gap-[1.2rem]">
                                {category.items.map((item) => (
                                    <li key={item.name} className="flex flex-col gap-[0.4rem]">
                                        <span className="text-[1.6rem] font-medium text-[#111]">{item.name}</span>
                                        {item.note && <span className={R.meta}>{item.note}</span>}
                                        <div className="flex flex-wrap gap-[0.6rem] mt-[0.4rem]">
                                            {item.projectIds.map((projectId) => (
                                                <button
                                                    key={`${item.name}-${projectId}`}
                                                    type="button"
                                                    onClick={() => scrollToProject(projectId)}
                                                    className={`${R.meta} hover:text-black transition-colors`}
                                                >
                                                    {projectId}
                                                </button>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ClippedRevealText>
                ))}
            </ClippedRevealGroup>
        </RenewalSplitSection>
    );
};

export default ResumeRenewalSkillSection;
