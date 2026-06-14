"use client";

import type { RenewalProjectEntry } from "@/shared/constants/resume/resumeRenewalData";
import { getRenewalProjectAnchorId } from "@/shared/constants/resume/resumeRenewalData";
import RenewalProjectLogoPanel from "./RenewalProjectLogoPanel";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import ResumeRenewalCaseStudySection from "./ResumeRenewalCaseStudySection";
import ResumeRenewalGallery from "./ResumeRenewalGallery";
import { StudioSlider } from "./StudioSlider";
import { R } from "./renewalStyles";

type ResumeRenewalProjectProps = {
    project: RenewalProjectEntry;
    index: number;
};

const ResumeRenewalProject = ({ project, index }: ResumeRenewalProjectProps) => {
    const anchorId = getRenewalProjectAnchorId(project.id);

    return (
        <>
            <RenewalSplitSection
                id={anchorId}
                divider
                left={
                    <RenewalProjectLogoPanel
                        alt={`${project.title} 로고`}
                        logo={project.logo}
                    />
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
                                    <li
                                        key={achievement}
                                        className={R.bodyMuted}
                                    >
                                        {achievement}
                                    </li>
                                ))}
                            </ul>

                            <dl className={`grid grid-cols-[7rem_1fr] gap-y-[0.8rem] ${R.meta}`}>
                                <dt>일정</dt>
                                <dd>{project.period}</dd>
                                <dt>기술</dt>
                                <dd>{project.techStack}</dd>
                                <dt>인력</dt>
                                <dd>{project.team}</dd>
                            </dl>

                            {(project.links.demo || project.links.github || project.links.article) && (
                                <div className="flex flex-wrap gap-x-[2rem] gap-y-[0.8rem]">
                                    {project.links.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={R.link}
                                        >
                                            Live Demo
                                        </a>
                                    )}
                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={R.link}
                                        >
                                            GitHub
                                        </a>
                                    )}
                                    {project.links.article && (
                                        <a
                                            href={project.links.article}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={R.link}
                                        >
                                            Article
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    }
                />
            </RenewalSplitSection>

            <section className={`${R.root} w-full`}>
                <StudioSlider
                    items={project.sliderItems}
                    touch
                    fullWidth
                />
            </section>

            <ResumeRenewalCaseStudySection
                caseStudy={project.caseStudy}
                project={project}
                index={index}
            />
            {/* <ResumeRenewalGallery items={project.gallery} /> */}
        </>
    );
};

export default ResumeRenewalProject;
