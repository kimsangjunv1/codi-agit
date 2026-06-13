"use client";

import ResumeHeroSection from "./ui/ResumeHeroSection";
import ResumeProfileSection from "./ui/ResumeProfileSection";
import ResumeProjectsSection from "./ui/ResumeProjectsSection";
import ResumeTechSection from "./ui/ResumeTechSection";
import ResumeEducationSection from "./ui/ResumeEducationSection";

const ResumePanel = () => {
    const scrollToProjects = () => {
        document.getElementById("resume-projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <article className="w-full max-w-[120rem] mx-auto bg-white">
            <ResumeHeroSection onScrollToProjects={scrollToProjects} />
            <ResumeProfileSection />
            <ResumeProjectsSection />
            <ResumeTechSection />
            <ResumeEducationSection />
        </article>
    );
};

export default ResumePanel;
