"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

import {
    resumeProjectDetails,
    type ResumeProjectDetail,
    type ResumeProjectDetailSection,
} from "@/shared/constants/resume/resumeProjectDetails";

const PROJECT_DIALOG_LAYER_ID = "resume-project-dialog-layer";

const ProjectDetailSection = ({ section }: { section: ResumeProjectDetailSection }) => {
    const List = section.ordered ? "ol" : "ul";

    return (
        <section>
            <h3 className="mb-[1.6rem] text-[2rem] font-semibold tracking-[-0.025em]">{section.title}</h3>
            <List
                className={`space-y-[1.2rem] pl-[2.2rem] text-[1.55rem] leading-[1.8] text-black/70 ${
                    section.ordered ? "list-decimal" : "list-disc"
                }`}
            >
                {section.items.map((item) => (
                    <li
                        className="pl-[0.4rem]"
                        key={item}
                    >
                        {item}
                    </li>
                ))}
            </List>
        </section>
    );
};

const ProjectDetailModal = ({ project, onClose }: { project: ResumeProjectDetail; onClose: () => void }) => {
    const titleId = useId();

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        const backgroundElements = Array.from(document.body.children)
            .filter((element) => element.id !== PROJECT_DIALOG_LAYER_ID && element.tagName !== "SCRIPT")
            .map((element) => ({
                element,
                hadInert: element.hasAttribute("inert"),
                ariaHidden: element.getAttribute("aria-hidden"),
            }));
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.body.style.overflow = "hidden";
        backgroundElements.forEach(({ element }) => {
            element.setAttribute("inert", "");
            element.setAttribute("aria-hidden", "true");
        });
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            backgroundElements.forEach(({ element, hadInert, ariaHidden }) => {
                if (!hadInert) element.removeAttribute("inert");
                if (ariaHidden === null) element.removeAttribute("aria-hidden");
                else element.setAttribute("aria-hidden", ariaHidden);
            });
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return createPortal(
        <div
            id={PROJECT_DIALOG_LAYER_ID}
            className="fixed inset-0 z-[120] flex items-center justify-center p-[1.6rem] lg:p-[4rem]"
        >
            <button
                type="button"
                className="absolute inset-0 cursor-default bg-black/55"
                aria-label="프로젝트 상세 닫기"
                onClick={onClose}
            />
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="relative max-h-full w-full max-w-[96rem] overflow-y-auto bg-white shadow-2xl"
            >
                <header className="sticky top-0 z-10 flex items-start justify-between gap-[2.4rem] border-b border-black/15 bg-white/95 px-[2.4rem] py-[2rem] backdrop-blur lg:px-[4.8rem] lg:py-[2.8rem]">
                    <div>
                        <p className="mb-[0.8rem] text-[1.1rem] font-semibold uppercase tracking-[0.12em] text-black/45">
                            {project.category}
                        </p>
                        <h2
                            id={titleId}
                            className="text-[2.8rem] font-bold leading-[1.3] tracking-[-0.04em] lg:text-[4rem]"
                        >
                            {project.title}
                        </h2>
                    </div>
                    <button
                        type="button"
                        className="flex h-[4rem] w-[4rem] shrink-0 items-center justify-center border border-black/20 transition-colors hover:bg-black hover:text-white"
                        aria-label="닫기"
                        autoFocus
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className="mx-auto flex max-w-[80rem] flex-col gap-[4.8rem] px-[2.4rem] py-[4rem] lg:px-0 lg:py-[6.4rem]">
                    <div>
                        <p className="text-[2rem] font-medium leading-[1.7] tracking-[-0.025em] lg:text-[2.4rem]">
                            {project.summary}
                        </p>
                        <p className="mt-[2.4rem] text-[1.6rem] leading-[1.8] text-black/65">{project.overview}</p>
                    </div>

                    <dl className="grid gap-x-[3.2rem] gap-y-[2.4rem] border-y border-black/15 py-[3.2rem] sm:grid-cols-2">
                        <div>
                            <dt className="text-[1.1rem] font-semibold uppercase tracking-[0.12em] text-black/45">담당</dt>
                            <dd className="mt-[0.8rem] text-[1.55rem] leading-[1.7]">{project.role}</dd>
                        </div>
                        <div>
                            <dt className="text-[1.1rem] font-semibold uppercase tracking-[0.12em] text-black/45">구성 인원</dt>
                            <dd className="mt-[0.8rem] text-[1.55rem] leading-[1.7]">{project.team}</dd>
                        </div>
                    </dl>

                    <section>
                        <h3 className="mb-[1.6rem] text-[2rem] font-semibold tracking-[-0.025em]">기술 스택과 활용</h3>
                        <ul className="space-y-[1.2rem] pl-[2.2rem] text-[1.55rem] leading-[1.8] text-black/70">
                            {project.technologies.map((technology) => (
                                <li
                                    className="list-disc pl-[0.4rem]"
                                    key={technology.name}
                                >
                                    <strong className="font-semibold text-black">{technology.name}:</strong> {technology.description}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {project.sections.map((section) => (
                        <ProjectDetailSection
                            key={section.title}
                            section={section}
                        />
                    ))}
                </div>
            </section>
        </div>,
        document.body,
    );
};

const ResumeRenewalProjectGrid = () => {
    const [selectedProject, setSelectedProject] = useState<ResumeProjectDetail | null>(null);
    const closeProject = useCallback(() => setSelectedProject(null), []);

    return (
        <section
            id="renewal-projects"
            className="mx-auto w-full max-w-[calc(56rem*2)] scroll-mt-[10rem] py-[8rem] lg:py-[12rem]"
        >
            <div className="mb-[3.2rem]">
                <div>
                    <p className="text-[1.2rem] font-semibold uppercase tracking-[0.12em] text-black/45">Selected work</p>
                    <h2 className="mt-[0.8rem] text-[3.2rem] font-bold tracking-[-0.04em] lg:text-[4.8rem]">PROJECTS</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-[1.2rem] sm:grid-cols-2 lg:grid-cols-4">
                {resumeProjectDetails.map((project, index) => (
                    <button
                        type="button"
                        className="group flex aspect-square flex-col justify-between border border-black/15 bg-white p-[2.4rem] text-left transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                        aria-label={`${project.title} 상세 보기`}
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                    >
                        <div className="flex w-full items-start justify-between gap-[1.6rem]">
                            <span className="text-[1.1rem] font-semibold tracking-[0.12em] text-black/45 group-hover:text-white/55">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <ArrowUpRight size={18} />
                        </div>
                        <div>
                            <p className="mb-[0.8rem] text-[1.1rem] leading-[1.5] text-black/45 group-hover:text-white/55">
                                {project.category}
                            </p>
                            <h3 className="text-[2.2rem] font-bold leading-[1.3] tracking-[-0.035em]">{project.title}</h3>
                            <p className="mt-[1.6rem] text-[1.3rem] font-medium leading-[1.5]">{project.tileMetric}</p>
                        </div>
                    </button>
                ))}
            </div>

            {selectedProject ? (
                <ProjectDetailModal
                    project={selectedProject}
                    onClose={closeProject}
                />
            ) : null}
        </section>
    );
};

export default ResumeRenewalProjectGrid;
