"use client";

import { GitCommitHorizontal } from "lucide-react";

import {
    getRenewalExperienceAnchorId,
    type RenewalSectionEntry,
} from "@/shared/constants/resume/resumeRenewalData";

const ResumeRenewalWorklog = ({ entries }: { entries: RenewalSectionEntry[] }) => {
    return (
        <section
            id="renewal-worklog"
            className="relative mx-auto w-full max-w-[calc(56rem*2)] border-l border-[var(--adaptive-border)] lg:ml-[1rem]"
        >
            <div className="mb-[5.6rem] ml-[-1rem] inline-flex items-center gap-[1rem] bg-[var(--adaptive-background)] pr-[1.6rem] text-[1.2rem] font-semibold text-[var(--adaptive-text-muted)]">
                <span className="h-[2rem] w-[2rem] rounded-[0.45rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)]" />
                CAREER
            </div>

            {entries.map((entry) => (
                <article
                    className="grid scroll-mt-[12rem] pb-[8rem] pl-[2.4rem] lg:grid-cols-12 lg:gap-[3.2rem] lg:pb-[13.6rem]"
                    id={getRenewalExperienceAnchorId(entry.id)}
                    key={entry.id}
                >
                    <div className="relative col-span-12 mb-[2.8rem] self-start lg:sticky lg:top-[12rem] lg:col-span-4 lg:mb-0">
                        <span className="absolute left-[-3.45rem] top-[0.15rem] hidden h-[2rem] w-[2rem] items-center justify-center rounded-[0.45rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] text-[var(--adaptive-text-muted)] shadow-[var(--shadow-popup)] lg:flex">
                            <GitCommitHorizontal size={13} />
                        </span>
                        <h2 className="text-[1.9rem] font-medium leading-[1.35] tracking-[-0.025em] text-[var(--adaptive-text-primary)]">
                            {entry.title}
                        </h2>
                        <div className="mt-[1.2rem] flex flex-wrap items-center gap-[0.8rem]">
                            <span className="text-[1.15rem] text-[var(--adaptive-text-muted)]">{entry.period}</span>
                            <span className="inline-flex rounded-full border border-[var(--adaptive-border)] px-[0.65rem] py-[0.35rem] text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-[var(--adaptive-text-secondary)]">
                                WORK
                            </span>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-8">
                        <p className="mb-[2.4rem] text-[1.7rem] leading-[1.75] text-[var(--adaptive-text-primary)]">
                            {entry.overview}
                        </p>
                        <section>
                            <h3 className="mb-[1rem] text-[1.7rem] font-semibold">주요 성과</h3>
                            <ul className="mt-[1.6rem] space-y-[0.9rem] pl-[2rem] text-[1.55rem] leading-[1.7] text-[var(--adaptive-text-secondary)]">
                                {entry.achievements.map((achievement) => (
                                    <li
                                        className="list-disc pl-[0.4rem] marker:text-[var(--adaptive-text-muted)]"
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
                                    className="rounded-full border border-[var(--adaptive-border)] bg-[var(--adaptive-greyOpacity50)] px-[0.8rem] py-[0.35rem] text-[1.05rem] text-[var(--adaptive-text-muted)]"
                                    key={technology}
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </div>
                </article>
            ))}
        </section>
    );
};

export default ResumeRenewalWorklog;
