"use client";

import { renewalSkillStats } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";

const DOT_GRID_STYLE = {
    backgroundImage: "radial-gradient(circle, #111111 1.5px, transparent 1.5px)",
    backgroundSize: "14px 14px",
} as const;

const ResumeRenewalSkillSection = () => {
    const { experience, skills } = renewalSkillStats;

    return (
        <section className="w-full border-b border-[#e5e5e5] bg-white">
            <div className="grid grid-cols-2 min-h-[28rem] tablet:min-h-[36rem]">
                <div
                    className="min-w-0 opacity-[0.12]"
                    style={DOT_GRID_STYLE}
                    aria-hidden
                />
                <div className="flex flex-col justify-center px-[3.2rem] tablet:px-[6.4rem] py-[4.8rem] tablet:py-[6.4rem] border-r border-[#e5e5e5] min-w-0">
                    <ClippedRevealGroup className="flex flex-col gap-[1.2rem]">
                        <ClippedRevealText>
                            <p className="text-[1.4rem] tablet:text-[1.6rem] font-bold text-[#111] tracking-wide">{experience.label}</p>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <p className="text-[10rem] tablet:text-[14rem] font-bold text-[#111] leading-[0.85] tracking-[-0.04em]">
                                {experience.value}
                                {experience.suffix && <span className="text-[6rem] tablet:text-[8rem]">{experience.suffix}</span>}
                            </p>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <p className="text-[1.4rem] tablet:text-[1.6rem] text-[#444] leading-[1.6]">{experience.description}</p>
                        </ClippedRevealText>
                    </ClippedRevealGroup>
                </div>
            </div>

            <div className="grid grid-cols-2 border-t border-[#e5e5e5]">
                <div
                    className="min-w-0 bg-white"
                    aria-hidden
                />
                <div className="px-[3.2rem] tablet:px-[6.4rem] py-[4.8rem] tablet:py-[6.4rem] border-r border-[#e5e5e5] min-w-0">
                    <ClippedRevealGroup className="flex flex-col gap-[1.2rem]">
                        <ClippedRevealText>
                            <p className="text-[1.4rem] tablet:text-[1.6rem] font-bold text-[#111] tracking-wide">{skills.label}</p>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <p className="text-[10rem] tablet:text-[14rem] font-bold text-[#111] leading-[0.85] tracking-[-0.04em]">{skills.value}</p>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <p className="text-[1.4rem] tablet:text-[1.6rem] text-[#444] leading-[1.6]">{skills.description}</p>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <ul className="flex flex-wrap gap-[0.8rem] mt-[1.6rem]">
                                {skills.items.map((item) => (
                                    <li
                                        key={item}
                                        className="px-[1.2rem] py-[0.6rem] text-[1.2rem] text-[#333] border border-[#ddd] rounded-full bg-white"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </ClippedRevealText>
                    </ClippedRevealGroup>
                </div>
            </div>
        </section>
    );
};

export default ResumeRenewalSkillSection;
