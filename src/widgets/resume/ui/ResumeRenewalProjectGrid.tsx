"use client";

import { ArrowUpRight, Maximize2, Minimize2, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";

import { resumeProjectDetails, type ResumeProjectDetail, type ResumeProjectDetailSection } from "@/shared/constants/resume/resumeProjectDetails";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import { useResumeProjectPanelStore } from "@/shared/stores/useResumeProjectPanelStore";
import { R } from "./renewalStyles";

const PROJECT_DIALOG_LAYER_ID = "resume-project-dialog-layer";
const PROJECT_REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const PROJECT_REVEAL_VARIANTS = {
    hidden: { x: "100%" },
    visible: { x: 0 },
};

const ProjectTile = ({ project, index, onSelect }: { project: ResumeProjectDetail; index: number; onSelect: (project: ResumeProjectDetail) => void }) => {
    const reducedMotion = useReducedMotion();

    return (
        <motion.button
            type="button"
            className="group aspect-square overflow-hidden bg-white p-0 text-left transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            aria-label={`${project.title} 상세 보기`}
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            onClick={() => onSelect(project)}
        >
            <motion.div
                className="relative flex h-full w-full flex-col justify-between p-[2.4rem]"
                variants={PROJECT_REVEAL_VARIANTS}
                transition={{ duration: 0.75, delay: index * 0.08, ease: PROJECT_REVEAL_EASE }}
            >
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#ededed] transition-colors duration-300 group-hover:bg-black"
                />

                <div className="relative z-10 flex w-full items-start justify-between gap-[1.6rem]">
                    <span className="text-[1.4rem] font-semibold text-black/45 group-hover:text-white/55">{String(index + 1).padStart(2, "0")}</span>
                    <ArrowUpRight size={18} />
                </div>
                <div className="relative z-10">
                    <p className="mb-[0.8rem] text-[1.4rem] leading-[1.5] text-black/45 group-hover:text-white/55">{project.category}</p>
                    <h3 className="text-[1.4rem] font-bold leading-[1.5]">{project.title}</h3>
                    <p className="mt-[1.6rem] text-[1.4rem] font-medium leading-[1.5]">{project.tileMetric}</p>
                </div>
            </motion.div>
        </motion.button>
    );
};

const ProjectDetailSection = ({ section }: { section: ResumeProjectDetailSection }) => {
    const List = section.ordered ? "ol" : "ul";

    return (
        <section>
            <h3 className="text-[1.4rem] font-semibold">{section.title}</h3>
            <List className={`space-y-[1.2rem] pl-[2.2rem] text-[1.55rem] leading-[1.5] text-black/70 ${section.ordered ? "list-decimal" : "list-disc"}`}>
                {section.items.map((item) => (
                    <li
                        className="pl-[0.4rem] leading-[1.5]"
                        key={item}
                    >
                        {item}
                    </li>
                ))}
            </List>
        </section>
    );
};

const ProjectDetailPanel = ({ project, onClose }: { project: ResumeProjectDetail; onClose: () => void }) => {
    const titleId = useId();
    const isMobile = useLayoutStore((state) => state.isMobile);
    const isExpanded = useResumeProjectPanelStore((state) => state.isExpanded);
    const panelWidthSvw = useResumeProjectPanelStore((state) => state.panelWidthSvw);
    const isResizing = useResumeProjectPanelStore((state) => state.isResizing);
    const toggleExpanded = useResumeProjectPanelStore((state) => state.toggleExpanded);
    const setPanelWidthSvw = useResumeProjectPanelStore((state) => state.setPanelWidthSvw);
    const setIsResizing = useResumeProjectPanelStore((state) => state.setIsResizing);
    const dragStartXRef = useRef(0);
    const dragStartWidthRef = useRef(panelWidthSvw);

    const panelWidth = isMobile || isExpanded ? "100svw" : `${panelWidthSvw}svw`;
    const transition = isResizing ? "none" : "width 280ms cubic-bezier(0.22, 1, 0.36, 1)";

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (!isResizing) return;

        const previousUserSelect = document.body.style.userSelect;
        const previousCursor = document.body.style.cursor;
        document.body.style.userSelect = "none";
        document.body.style.cursor = "col-resize";

        const handlePointerMove = (event: PointerEvent) => {
            const deltaSvw = ((dragStartXRef.current - event.clientX) / window.innerWidth) * 100;
            setPanelWidthSvw(dragStartWidthRef.current + deltaSvw);
        };

        const handlePointerUp = () => {
            setIsResizing(false);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            document.body.style.userSelect = previousUserSelect;
            document.body.style.cursor = previousCursor;
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isResizing, setIsResizing, setPanelWidthSvw]);

    const handleResizeStart = (event: ReactPointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        dragStartXRef.current = event.clientX;
        dragStartWidthRef.current = panelWidthSvw;
        setIsResizing(true);
    };

    return createPortal(
        <div
            id={PROJECT_DIALOG_LAYER_ID}
            className="pointer-events-none fixed inset-0 z-[120]"
        >
            {!isMobile && !isExpanded ? (
                <div
                    role="separator"
                    aria-orientation="vertical"
                    aria-label="패널 너비 조절"
                    className="pointer-events-auto absolute top-0 z-[10000] h-full w-[1.2rem] -translate-x-1/2 cursor-col-resize touch-none"
                    style={{ left: `calc(100svw - ${panelWidthSvw}svw)`, transition: isResizing ? "none" : "left 280ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                    onPointerDown={handleResizeStart}
                >
                    <div className="absolute inset-y-0 left-1/2 w-[0.1rem] -translate-x-1/2 bg-black/10 transition-colors hover:bg-black/40" />
                </div>
            ) : null}

            <aside
                role="dialog"
                aria-modal={isMobile || isExpanded}
                aria-labelledby={titleId}
                className="pointer-events-auto absolute top-0 right-0 flex h-[100svh] flex-col overflow-hidden bg-white"
                style={{ width: panelWidth, transition }}
            >
                <header className="sticky top-0 z-10 flex items-start justify-between border-b border-black/15 bg-white/95 px-[2.4rem] py-[2rem] backdrop-blur lg:px-[3.2rem] lg:py-[2.4rem]">
                    <section className="flex flex-col gap-[0.8rem] min-w-0">
                        <p className="text-[1.4rem] font-semibold uppercase text-black/45">{project.category}</p>

                        <h2
                            id={titleId}
                            className="text-[2.4rem] font-bold"
                        >
                            {project.title}
                        </h2>
                    </section>

                    <section className="flex shrink-0 items-center gap-[0.8rem]">
                        {!isMobile ? (
                            <button
                                type="button"
                                className="flex h-[4rem] w-[4rem] items-center justify-center border border-black/20 transition-colors hover:bg-black hover:text-white"
                                aria-label={isExpanded ? "원래 비율로 돌아가기" : "패널 확대"}
                                onClick={toggleExpanded}
                            >
                                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                            </button>
                        ) : null}
                        <button
                            type="button"
                            className="flex h-[4rem] w-[4rem] items-center justify-center border border-black/20 transition-colors hover:bg-black hover:text-white"
                            aria-label="닫기"
                            autoFocus
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>
                    </section>
                </header>

                <section className="p-[1.4rem]">
                    <p className="text-[1.4rem] font-medium leading-[1.5] lg:text-[2.4rem]">{project.summary}</p>
                    <p className="text-[1.4rem] leading-[1.5] text-black/65">{project.overview}</p>
                </section>

                <section className="grid border-y border-black/15 grid-cols-[1fr_auto_1fr]">
                    <div className="p-[2.4rem]">
                        <dt className="text-[1.4rem] font-semibold uppercase text-black/45">담당</dt>
                        <dd className="mt-[0.8rem] text-[1.55rem] leading-[1.5]">{project.role}</dd>
                    </div>

                    <div className="bg-black h-full w-[0.1rem]" />

                    <div className="p-[2.4rem]">
                        <dt className="text-[1.4rem] font-semibold uppercase text-black/45">구성 인원</dt>
                        <dd className="mt-[0.8rem] text-[1.55rem] leading-[1.5]">{project.team}</dd>
                    </div>
                </section>

                <section>
                    <h3 className="text-[1.4rem] font-semibold">기술 스택과 활용</h3>
                    <ul className="space-y-[1.2rem] pl-[2.2rem] text-[1.55rem] leading-[1.5] text-black/70">
                        {project.technologies.map((technology) => (
                            <li
                                className="list-disc pl-[0.4rem] leading-[1.5]"
                                key={technology.name}
                            >
                                <strong className="font-semibold text-black">{technology.name}:</strong> {technology.description}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="p-[2.4rem]">
                    {project.sections.map((section) => (
                        <ProjectDetailSection
                            key={section.title}
                            section={section}
                        />
                    ))}
                </section>
            </aside>
        </div>,
        document.body,
    );
};

const ResumeRenewalProjectGrid = () => {
    const [selectedProject, setSelectedProject] = useState<ResumeProjectDetail | null>(null);
    const openPanel = useResumeProjectPanelStore((state) => state.open);
    const closePanel = useResumeProjectPanelStore((state) => state.close);

    const handleSelect = useCallback(
        (project: ResumeProjectDetail) => {
            setSelectedProject(project);
            openPanel();
        },
        [openPanel],
    );

    const handleClose = useCallback(() => {
        setSelectedProject(null);
        closePanel();
    }, [closePanel]);

    useEffect(() => {
        return () => {
            closePanel();
        };
    }, [closePanel]);

    return (
        <section
            id="renewal-projects"
            className="mx-auto w-full max-w-[calc(72rem*2)] scroll-mt-[10rem] py-[8rem] lg:py-[12rem]"
        >
            <h2 className={`${R.label} mb-[3.2rem]`}>Projects</h2>

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-2">
                {resumeProjectDetails.map((project, index) => (
                    <ProjectTile
                        key={project.id}
                        project={project}
                        index={index}
                        onSelect={handleSelect}
                    />
                ))}
            </div>

            {selectedProject ? (
                <ProjectDetailPanel
                    project={selectedProject}
                    onClose={handleClose}
                />
            ) : null}
        </section>
    );
};

export default ResumeRenewalProjectGrid;
