"use client";

import { renewalContact, renewalContactExtended } from "@/shared/constants/resume/resumeRenewalData";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalContactSection = () => {
    return (
        <RenewalSplitSection
            id="renewal-contact"
            divider
        >
            <RenewalRightBlocks
                label={<p className={R.label}>Contact</p>}
                headline={<p className={R.keyline}>{renewalContact.quote}</p>}
                description={
                    <div className="flex flex-col gap-[1rem]">
                        <a
                            href={`mailto:${renewalContact.email}`}
                            className={R.link}
                        >
                            {renewalContact.email}
                        </a>
                        <a
                            href={renewalContactExtended.phoneHref}
                            className={R.link}
                        >
                            {renewalContactExtended.phone}
                        </a>
                    </div>
                }
                details={
                    <div className="flex flex-col gap-[0.8rem]">
                        <a
                            href={renewalContact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={R.link}
                        >
                            {renewalContact.githubLabel}
                        </a>
                        <a
                            href={renewalContactExtended.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={R.link}
                        >
                            {renewalContactExtended.linkedinLabel}
                        </a>
                        <a
                            href={renewalContactExtended.service}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={R.link}
                        >
                            codi-agit.com
                        </a>
                        <a
                            href={renewalContactExtended.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={R.link}
                        >
                            portfoliosj-react.netlify.app
                        </a>
                    </div>
                }
            />
        </RenewalSplitSection>
    );
};

export default ResumeRenewalContactSection;
