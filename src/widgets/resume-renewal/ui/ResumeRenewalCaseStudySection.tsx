"use client";

import type { RenewalCaseStudy } from "@/shared/constants/resume/resumeRenewalData";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

type ResumeRenewalCaseStudySectionProps = {
    caseStudy: RenewalCaseStudy;
};

const ResumeRenewalCaseStudySection = ({ caseStudy }: ResumeRenewalCaseStudySectionProps) => {
    return (
        <RenewalSplitSection divider>
            <RenewalRightBlocks
                label={<p className={R.label}>Case Study</p>}
                headline={<p className={R.keyline}>{caseStudy.result}</p>}
                description={
                    <div className="flex flex-col gap-[1.6rem]">
                        <div>
                            <p className={`${R.label} mb-[0.8rem]`}>Problem</p>
                            <p className={R.body}>{caseStudy.problem}</p>
                        </div>
                        <div>
                            <p className={`${R.label} mb-[0.8rem]`}>Approach</p>
                            <p className={R.body}>{caseStudy.approach}</p>
                        </div>
                    </div>
                }
                details={
                    <div className="flex flex-col gap-[2.4rem]">
                        <div>
                            <p className={`${R.label} mb-[0.8rem]`}>Learned</p>
                            <p className={R.bodyMuted}>{caseStudy.learned}</p>
                        </div>

                        <div className={`${R.divider} pt-[2.4rem]`}>
                            <p className={`${R.label} mb-[1.2rem]`}>My Role</p>
                            <ul className="flex flex-col gap-[0.8rem]">
                                {caseStudy.myRole.map((item) => (
                                    <li key={item} className={R.body}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={`${R.divider} pt-[2.4rem]`}>
                            <p className={`${R.label} mb-[1.2rem]`}>Team Role</p>
                            <ul className="flex flex-col gap-[0.8rem]">
                                {caseStudy.teamRole.map((item) => (
                                    <li key={item} className={R.bodyMuted}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {caseStudy.decisions.map((decision) => (
                            <div key={decision.title} className={`${R.divider} pt-[2.4rem]`}>
                                <p className="text-[1.6rem] font-semibold text-black mb-[1rem]">{decision.title}</p>
                                <p className={R.body}>
                                    <span className="text-[#888]">Chosen · </span>
                                    {decision.chosen}
                                </p>
                                <p className={`${R.bodyMuted} mt-[0.8rem]`}>
                                    <span className="text-[#888]">Alternative · </span>
                                    {decision.alternative}
                                </p>
                                <p className={`${R.bodyMuted} mt-[0.8rem]`}>
                                    <span className="text-[#888]">Why · </span>
                                    {decision.reason}
                                </p>
                            </div>
                        ))}

                        {caseStudy.architecture && (
                            <div className={`${R.divider} pt-[2.4rem]`}>
                                <p className={`${R.label} mb-[1.6rem]`}>{caseStudy.architecture.title}</p>
                                <ul className="flex flex-col gap-[1.2rem]">
                                    {caseStudy.architecture.layers.map((layer) => (
                                        <li key={layer.name}>
                                            <span className="text-[1.6rem] font-semibold text-black">{layer.name}</span>
                                            <span className={`${R.bodyMuted} ml-[0.8rem]`}>— {layer.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                }
            />
        </RenewalSplitSection>
    );
};

export default ResumeRenewalCaseStudySection;
