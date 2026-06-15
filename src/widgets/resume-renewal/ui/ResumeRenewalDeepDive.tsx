"use client";

import {
    getRenewalDeepDiveAnchorId,
    renewalDeepDiveProject,
} from "@/shared/constants/resume/resumeRenewalData";
import ResumeRenewalCaseStudySection from "./ResumeRenewalCaseStudySection";
import { R } from "./renewalStyles";

const ResumeRenewalDeepDive = () => {
    const { caseStudy } = renewalDeepDiveProject;

    if (!caseStudy) {
        return null;
    }

    return (
        <section id={getRenewalDeepDiveAnchorId()} className={`${R.root} w-full`}>
            <ResumeRenewalCaseStudySection
                caseStudy={caseStudy}
                project={renewalDeepDiveProject}
                index={0}
                compact
            />
        </section>
    );
};

export default ResumeRenewalDeepDive;
