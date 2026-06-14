"use client";

import type { RenewalProjectEntry } from "@/shared/constants/resume/resumeRenewalData";
import { getRenewalProjectAnchorId } from "@/shared/constants/resume/resumeRenewalData";
import { resumeProfile } from "@/shared/constants/resume/resumeData";
import MiniChart from "@/widgets/resume/ui/MiniChart";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import ResumeRenewalCaseStudySection from "./ResumeRenewalCaseStudySection";
import ResumeRenewalGallery from "./ResumeRenewalGallery";
import { R } from "./renewalStyles";

type ResumeRenewalProjectProps = {
    project: RenewalProjectEntry;
    index: number;
};

const ResumeRenewalProject = ({ project, index }: ResumeRenewalProjectProps) => {
    const periodStart = project.period.split("~")[0]?.trim() ?? project.period;
    const anchorId = getRenewalProjectAnchorId(project.id);

    return (
        <>
            <RenewalSplitSection
                id={anchorId}
                divider
                left={
                    <div className="flex flex-col justify-between w-full h-full min-h-[32rem] gap-[3.2rem]">
                        <div>
                            <p className={`${R.label} mb-[2rem]`}>Project {String(index + 1).padStart(2, "0")}</p>
                            <p className={R.meta}>{project.highlight.label}</p>
                            <div className="flex items-end gap-[1rem] mt-[1.2rem]">
                                <span className="text-[1.6rem] text-[#ccc] line-through">
                                    {project.highlight.before}
                                    {project.highlight.unit ?? ""}
                                </span>
                                <span className="text-[4.8rem] font-bold leading-none tracking-[-0.04em] text-black">
                                    {project.highlight.after}
                                    <span className="text-[1.8rem] text-[#666]">{project.highlight.unit ?? ""}</span>
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 min-h-[14rem]">
                            <MiniChart
                                points={project.chartPoints}
                                label={project.chartLabel}
                                chartId={`renewal-${project.id}`}
                                startLabel={periodStart}
                                endLabel="현재"
                                strokeColor="#000000"
                            />
                        </div>

                        <div className={`grid grid-cols-3 gap-[1.6rem] ${R.divider} pt-[2.4rem]`}>
                            {project.metrics.map((metric) => (
                                <div key={metric.label}>
                                    <p className="text-[1.8rem] font-bold text-black">{metric.value}</p>
                                    <p className={`${R.meta} mt-[0.2rem]`}>{metric.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            >
                <RenewalRightBlocks
                    label={<p className={R.category}>{project.category}</p>}
                    headline={
                        <div>
                            <h2 className={R.keyline}>{project.title}</h2>
                            <p className={`${R.subtitle} mt-[1.2rem]`}>{project.subtitle}</p>
                        </div>
                    }
                    description={<p className={R.body}>{project.overview}</p>}
                    details={
                        <div className="flex flex-col gap-[2.4rem]">
                            <ul className="flex flex-col gap-[1.2rem]">
                                {project.achievements.map((achievement) => (
                                    <li key={achievement} className={R.bodyMuted}>
                                        {achievement}
                                    </li>
                                ))}
                            </ul>

                            <dl className={`grid grid-cols-[7rem_1fr] gap-y-[0.8rem] ${R.meta}`}>
                                <dt>일정</dt>
                                <dd className="text-[#333]">{project.period}</dd>
                                <dt>기술</dt>
                                <dd className="text-[#333]">{project.techStack}</dd>
                                <dt>인력</dt>
                                <dd className="text-[#333]">{project.team}</dd>
                            </dl>

                            {(project.links.demo || project.links.github || project.links.article) && (
                                <div className="flex flex-wrap gap-x-[2rem] gap-y-[0.8rem]">
                                    {project.links.demo && (
                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={R.link}>
                                            Live Demo
                                        </a>
                                    )}
                                    {project.links.github && (
                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={R.link}>
                                            GitHub
                                        </a>
                                    )}
                                    {project.links.article && (
                                        <a href={project.links.article} target="_blank" rel="noopener noreferrer" className={R.link}>
                                            Article
                                        </a>
                                    )}
                                </div>
                            )}

                            <div className={`${R.divider} pt-[2.4rem]`}>
                                <p className={R.role}>Frontend Developer</p>
                                <p className={R.name}>{resumeProfile.name}</p>
                            </div>
                        </div>
                    }
                />
            </RenewalSplitSection>

            <ResumeRenewalCaseStudySection caseStudy={project.caseStudy} />
            <ResumeRenewalGallery items={project.gallery} />
        </>
    );
};

export default ResumeRenewalProject;
