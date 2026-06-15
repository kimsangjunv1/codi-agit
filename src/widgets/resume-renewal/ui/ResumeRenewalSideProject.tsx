"use client";

import { getRenewalSideProjectAnchorId, renewalSideProject } from "@/shared/constants/resume/resumeRenewalData";
import RenewalProjectLogoPanel from "./RenewalProjectLogoPanel";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { RInverse } from "./renewalStyles";

const ResumeRenewalSideProject = () => {
    const project = renewalSideProject;
    const sectionAnchorId = getRenewalSideProjectAnchorId(project.id);

    return (
        <RenewalSplitSection
            id={sectionAnchorId}
            divider
            className={RInverse.section}
            left={
                <RenewalProjectLogoPanel
                    alt={`${project.title} 로고`}
                    logo={project.logo}
                />
            }
        >
            <RenewalRightBlocks
                label={<p className={RInverse.category}>{project.category}</p>}
                headline={
                    <div>
                        <h2 className={RInverse.keyline}>{project.title}</h2>
                        <p className={`${RInverse.subtitle} mt-[1.2rem]`}>{project.subtitle}</p>
                    </div>
                }
                description={<p className={RInverse.body}>{project.overview}</p>}
                details={
                    <div className="flex flex-col gap-[2.4rem]">
                        <ul className="flex flex-col gap-[1.2rem]">
                            {project.achievements.map((achievement) => (
                                <li
                                    key={achievement}
                                    className={RInverse.bodyMuted}
                                >
                                    {achievement}
                                </li>
                            ))}
                        </ul>

                        <dl className={`grid grid-cols-[7rem_1fr] gap-y-[0.8rem] ${RInverse.meta}`}>
                            <dt className="text-[1.8rem]">일정</dt>
                            <dd className="text-[1.8rem]">{project.period}</dd>
                            <dt className="text-[1.8rem]">기술</dt>
                            <dd className="text-[1.8rem]">{project.techStack}</dd>
                            <dt className="text-[1.8rem]">인력</dt>
                            <dd className="text-[1.8rem]">{project.team}</dd>
                        </dl>

                        {(project.links.demo || project.links.github || project.links.article) && (
                            <div className="flex flex-wrap gap-x-[2rem] gap-y-[0.8rem]">
                                {project.links.demo && (
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={RInverse.link}
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={RInverse.link}
                                    >
                                        GitHub
                                    </a>
                                )}
                                {project.links.article && (
                                    <a
                                        href={project.links.article}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={RInverse.link}
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
    );
};

export default ResumeRenewalSideProject;
