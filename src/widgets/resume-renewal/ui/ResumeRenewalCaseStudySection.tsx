"use client";

import type { RenewalCaseStudy } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

type ResumeRenewalCaseStudySectionProps = {
    caseStudy: RenewalCaseStudy;
};

const BLOCKS = [
    { label: "Problem", field: "problem" as const },
    { label: "Approach", field: "approach" as const },
    { label: "Result", field: "result" as const },
    { label: "Learned", field: "learned" as const },
];

const ResumeRenewalCaseStudySection = ({ caseStudy }: ResumeRenewalCaseStudySectionProps) => {
    return (
        <RenewalSplitSection divider>
            <ClippedRevealGroup className="flex flex-col gap-[2.4rem]">
                <ClippedRevealText>
                    <p className={R.label}>Case Study</p>
                </ClippedRevealText>

                {BLOCKS.map((block, index) => (
                    <ClippedRevealText key={block.label}>
                        <div className={index > 0 ? `${R.divider} pt-[2.4rem]` : ""}>
                            <p className={`${R.label} mb-[1rem]`}>{block.label}</p>
                            <p className={R.body}>{caseStudy[block.field]}</p>
                        </div>
                    </ClippedRevealText>
                ))}

                <ClippedRevealText>
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
                </ClippedRevealText>

                <ClippedRevealText>
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
                </ClippedRevealText>

                {caseStudy.decisions.map((decision) => (
                    <ClippedRevealText key={decision.title}>
                        <div className={`${R.divider} pt-[2.4rem]`}>
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
                    </ClippedRevealText>
                ))}

                {caseStudy.architecture && (
                    <ClippedRevealText>
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
                    </ClippedRevealText>
                )}
            </ClippedRevealGroup>
        </RenewalSplitSection>
    );
};

export default ResumeRenewalCaseStudySection;
