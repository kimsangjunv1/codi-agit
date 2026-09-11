"use client";

import { GitCommitHorizontal } from "lucide-react";

import { getRenewalExperienceAnchorId, type RenewalSectionEntry } from "@/shared/constants/resume/resumeRenewalData";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalWorklog = ({ entries }: { entries: RenewalSectionEntry[] }) => {
    return (
        <RenewalSplitSection
            id="renewal-worklog"
            divider
        >
            <div className="w-full">
                <h2 className={`${R.label} mb-[5.6rem]`}>Worklog</h2>

                <div className="relative border-l border-black/15">
                    <div className="mb-[5.6rem] ml-[-1rem] inline-flex items-center gap-[1rem] bg-white pr-[1.6rem] text-[1.2rem] font-semibold text-black/45">
                        <span className="h-[2rem] w-[2rem] rounded-[0.45rem] border border-black/20 bg-white" />
                        CAREER
                    </div>

                    {entries.map((entry) => (
                        <article
                            className="grid scroll-mt-[12rem] pb-[8rem] pl-[2.4rem] lg:grid-cols-12 lg:gap-[3.2rem] lg:pb-[13.6rem]"
                            id={getRenewalExperienceAnchorId(entry.id)}
                            key={entry.id}
                        >
                            <div className="relative col-span-12 mb-[2.8rem] self-start lg:sticky lg:top-[12rem] lg:col-span-4 lg:mb-0">
                                <span className="absolute left-[-3.45rem] top-[0.15rem] hidden h-[0.8rem] w-[0.8rem] items-center justify-center rounded-full bg-black text-black/45 lg:flex">
                                    <GitCommitHorizontal size={13} />
                                </span>
                                <h2 className="text-[1.9rem] font-medium leading-[1.35] tracking-[-0.025em] text-black">{entry.title}</h2>
                                <div className="mt-[1.2rem] flex flex-wrap items-center gap-[0.8rem]">
                                    <span className="text-[1.15rem] text-black/45">{entry.period}</span>
                                    <span className="inline-flex rounded-full border border-black/20 px-[0.65rem] py-[0.35rem] text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-black/65">
                                        WORK
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-8 flex flex-col gap-[2.4rem]">
                                <p className="text-[2.0rem] leading-[1.5] font-semibold text-black">{entry.overview}</p>

                                <section>
                                    <h3 className="mb-[1rem] text-[1.4rem] font-semibold text-black">주요 성과</h3>
                                    <div className="flex flex-col gap-[0.8rem] mt-[1.6rem] space-y-[0.92rem] pl-[2rem] text-black">
                                        {entry.achievements.map((achievement) => (
                                            <p
                                                className="relative list-disc pl-[0.4rem] leading-[1.5] font-regular text-[1.6rem] marker:text-black"
                                                key={achievement}
                                            >
                                                {achievement}
                                                <div className="absolute top-[0.2rem] left-[-1.2rem] font-bold text-red-500">+</div>
                                            </p>
                                        ))}
                                    </div>
                                </section>
                                <div className="mt-[2.4rem] flex flex-wrap gap-[0.7rem]">
                                    {entry.techStack.split(", ").map((technology) => (
                                        <span
                                            className="rounded-full border border-black/20 bg-black/[0.02] px-[0.8rem] py-[0.35rem] text-[1.05rem] text-black/55"
                                            key={technology}
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}

                    <div className="absolute left-[-1px] bottom-0 h-[5.2rem] w-full bg-[linear-gradient(0deg,_#fff,_#ffffff00))]" />
                </div>
            </div>
        </RenewalSplitSection>
    );
};

export default ResumeRenewalWorklog;
