"use client";

import { GitCommitHorizontal } from "lucide-react";

import { getRenewalExperienceAnchorId, type RenewalSectionEntry } from "@/shared/constants/resume/resumeRenewalData";
import { R } from "./renewalStyles";

const ResumeRenewalWorklog = ({ entries }: { entries: RenewalSectionEntry[] }) => {
    return (
        <section
            id="renewal-worklog"
            className="mx-auto w-full max-w-[calc(72rem*2)] scroll-mt-[10rem] py-[8rem] lg:py-[12rem]"
        >
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
                            <span className="absolute left-[-3.45rem] top-[0.15rem] hidden h-[2rem] w-[2rem] items-center justify-center rounded-[0.45rem] border border-black/20 bg-white text-black/45 shadow-sm lg:flex">
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

                        <div className="col-span-12 lg:col-span-8">
                            <p className="mb-[2.4rem] text-[1.7rem] leading-[1.75] text-black">{entry.overview}</p>
                            <section>
                                <h3 className="mb-[1rem] text-[1.7rem] font-semibold text-black">주요 성과</h3>
                                <ul className="mt-[1.6rem] space-y-[0.9rem] pl-[2rem] text-[1.55rem] leading-[1.7] text-black/70">
                                    {entry.achievements.map((achievement) => (
                                        <li
                                            className="list-disc pl-[0.4rem] marker:text-black/40"
                                            key={achievement}
                                        >
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
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

                <div className="absolute left-[-1px] bottom-0 w-full h-[5.2rem] bg-[linear-gradient(0deg,_#fff,_#ffffff00))]" />
            </div>
        </section>
    );
};

export default ResumeRenewalWorklog;
