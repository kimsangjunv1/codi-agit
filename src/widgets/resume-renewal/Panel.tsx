"use client";

import { renewalExperiences } from "@/shared/constants/resume/resumeRenewalData";
import { getRenewalExperienceAnchorId } from "@/shared/constants/resume/resumeRenewalData";
import ResumeRenewalEmailBannerSection from "./ui/ResumeRenewalEmailBannerSection";
import ResumeRenewalFooter from "./ui/ResumeRenewalFooter";
import ResumeRenewalHero from "./ui/ResumeRenewalHero";
import ResumeRenewalExperience from "./ui/ResumeRenewalExperience";
import ResumeRenewalSideProject from "./ui/ResumeRenewalSideProject";
import ResumeRenewalSkillSection from "./ui/ResumeRenewalSkillSection";
import ResumeRenewalTocNav from "./ui/ResumeRenewalTocNav";
import { R } from "./ui/renewalStyles";

const ResumeRenewalPanel = () => {
    return (
        <article className={`relative w-full bg-white ${R.root}`}>
            <ResumeRenewalTocNav />
            <ResumeRenewalHero />
            <ResumeRenewalSkillSection />
            {renewalExperiences.map((experience) => (
                <ResumeRenewalExperience
                    key={experience.id}
                    experience={experience}
                    anchorId={getRenewalExperienceAnchorId(experience.id)}
                />
            ))}
            <ResumeRenewalSideProject />
            <ResumeRenewalFooter />
            <ResumeRenewalEmailBannerSection />
        </article>
    );
};

export default ResumeRenewalPanel;
