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

                {entries.map((entry) => (
                    <article
                        className="grid scroll-mt-[12rem] pb-[8rem] lg:grid-cols-12 lg:gap-[3.2rem] lg:pb-[13.6rem]"
                        id={getRenewalExperienceAnchorId(entry.id)}
                        key={entry.id}
                    >
                        <div className="relative col-span-12 mb-[2.8rem] self-start lg:sticky lg:top-[12rem] lg:col-span-4 lg:mb-0">
                            <h2 className="text-[2.0rem] font-extrabold">{entry.title}</h2>

                            <div className="mt-[1.2rem] flex flex-wrap items-center gap-[0.8rem]">
                                <span className="text-[1.8rem] text-black">{entry.period}</span>
                                <span className="inline-flex rounded-full border border-black/20 px-[0.65rem] py-[0.35rem] text-[0.95rem] font-semibold uppercase text-black/65">WORK</span>
                            </div>
                        </div>

                        <div className="col-span-12 flex flex-col gap-[2.4rem]">
                            <p className="text-[2.0rem] leading-[1.5] font-semibold text-black">&quot;{entry.overview}&quot;</p>

                            <section>
                                <h3 className="mb-[1rem] text-[1.4rem] font-semibold text-black">주요 성과</h3>
                                <div className="flex flex-col gap-[0.8rem] mt-[1.6rem] space-y-[1.4rem] text-black">
                                    {entry.achievements.map((achievement) => (
                                        <p
                                            className="relative list-disc pl-[0.4rem] leading-[1.5] font-regular text-[1.8rem] marker:text-black"
                                            key={achievement}
                                        >
                                            {achievement}
                                            {/* <div className="absolute top-[0.2rem] left-[-1.2rem] font-bold text-red-500">+</div> */}
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
            </div>
        </RenewalSplitSection>
    );
};

export default ResumeRenewalWorklog;
