"use client";

import { renewalProjects } from "@/shared/constants/resume/resumeRenewalData";
import ResumeRenewalBuiltWithSection from "./ui/ResumeRenewalBuiltWithSection";
import ResumeRenewalCollaborationSection from "./ui/ResumeRenewalCollaborationSection";
import ResumeRenewalContactSection from "./ui/ResumeRenewalContactSection";
import ResumeRenewalCtaSection from "./ui/ResumeRenewalCtaSection";
import ResumeRenewalEducationSection from "./ui/ResumeRenewalEducationSection";
import ResumeRenewalEmailBannerSection from "./ui/ResumeRenewalEmailBannerSection";
import ResumeRenewalFooter from "./ui/ResumeRenewalFooter";
import ResumeRenewalHero from "./ui/ResumeRenewalHero";
import ResumeRenewalProfileSection from "./ui/ResumeRenewalProfileSection";
import ResumeRenewalProject from "./ui/ResumeRenewalProject";
import ResumeRenewalSkillSection from "./ui/ResumeRenewalSkillSection";
import ResumeRenewalTocNav from "./ui/ResumeRenewalTocNav";

const ResumeRenewalPanel = () => {
    return (
        <article className="relative w-full bg-white">
            <ResumeRenewalTocNav />
            <ResumeRenewalHero />
            <ResumeRenewalProfileSection />
            <ResumeRenewalSkillSection />

            <ResumeRenewalCollaborationSection />
            <ResumeRenewalEducationSection />

            {renewalProjects.map((project, index) => (
                <ResumeRenewalProject
                    key={project.id}
                    project={project}
                    index={index}
                />
            ))}

            {/* <ResumeRenewalBuiltWithSection /> */}
            {/* <ResumeRenewalContactSection />
            <ResumeRenewalCtaSection /> */}
            <ResumeRenewalFooter />
            <ResumeRenewalEmailBannerSection />
        </article>
    );
};

export default ResumeRenewalPanel;
