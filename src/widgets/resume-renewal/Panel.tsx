"use client";

import { renewalFooter, renewalProjects } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ui/ClippedRevealText";
import ResumeRenewalHero from "./ui/ResumeRenewalHero";
import ResumeRenewalSkillSection from "./ui/ResumeRenewalSkillSection";
import ResumeRenewalProject from "./ui/ResumeRenewalProject";
import ResumeRenewalContactSection from "./ui/ResumeRenewalContactSection";
import ResumeRenewalCtaSection from "./ui/ResumeRenewalCtaSection";
import ResumeRenewalFooter from "./ui/ResumeRenewalFooter";

const ResumeRenewalPanel = () => {
    return (
        <article className="w-full bg-white">
            <ResumeRenewalHero />
            <ResumeRenewalSkillSection />

            {renewalProjects.map((project, index) => (
                <ResumeRenewalProject
                    key={project.id}
                    project={project}
                    index={index}
                />
            ))}

            <section className="w-full px-[4.8rem] py-[8rem] border-t border-[#e5e5e5] bg-[#fafafa]">
                <ClippedRevealGroup className="max-w-[80rem] mx-auto flex flex-col gap-[1.6rem]">
                    <ClippedRevealText>
                        <h2 className="text-[1.2rem] font-bold tracking-[0.2em] uppercase text-[#111] mb-[1.6rem]">Education & Activity</h2>
                    </ClippedRevealText>
                    <ClippedRevealText>
                        <p className="text-[1.5rem] text-[#444]">{renewalFooter.education}</p>
                    </ClippedRevealText>
                    <ClippedRevealText>
                        <p className="text-[1.5rem] text-[#444]">{renewalFooter.activity}</p>
                    </ClippedRevealText>
                </ClippedRevealGroup>
            </section>

            <ResumeRenewalContactSection />
            <ResumeRenewalCtaSection />
            <ResumeRenewalFooter />
        </article>
    );
};

export default ResumeRenewalPanel;
