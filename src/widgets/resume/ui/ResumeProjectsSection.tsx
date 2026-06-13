"use client";

import { useRef } from "react";
import { resumeProjects } from "@/shared/constants/resume/resumeData";
import ResumeProjectCard from "./ResumeProjectCard";

const ResumeProjectsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} id="resume-projects" className="w-full">
            <div className="px-[2.4rem] py-[6rem] tablet:py-[8rem] border-b border-[#e5e5e5] bg-white">
                <h2 className="text-[2.4rem] tablet:text-[3.6rem] font-bold text-[#111] tracking-[-0.02em]">
                    프로젝트 경험으로 검증된 성과
                </h2>
                <p className="text-[1.5rem] text-[#666] mt-[1.2rem] max-w-[60rem]">
                    API 최적화, 성능 개선, 풀스택 서비스 운영까지 — 각 프로젝트에서 달성한 핵심 지표입니다.
                </p>
            </div>

            {resumeProjects.map((project, index) => (
                <ResumeProjectCard key={project.id} project={project} index={index} />
            ))}
        </section>
    );
};

export default ResumeProjectsSection;
