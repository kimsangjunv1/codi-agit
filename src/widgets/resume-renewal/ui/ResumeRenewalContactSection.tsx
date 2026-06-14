"use client";

import { renewalContact, renewalContactExtended } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalContactSection = () => {
    return (
        <RenewalSplitSection id="renewal-contact" divider>
            <ClippedRevealGroup className="flex flex-col gap-[2.4rem]">
                <ClippedRevealText>
                    <p className={R.label}>Contact</p>
                </ClippedRevealText>

                <ClippedRevealText>
                    <p className="text-[2rem] tablet:text-[2.4rem] font-bold text-black leading-[1.35]">{renewalContact.quote}</p>
                </ClippedRevealText>

                <ClippedRevealText>
                    <div className="flex flex-col gap-[1rem]">
                        <a href={`mailto:${renewalContact.email}`} className={`${R.link} text-[1.6rem]`}>
                            {renewalContact.email}
                        </a>
                        <a href={renewalContactExtended.phoneHref} className={R.link}>
                            {renewalContactExtended.phone}
                        </a>
                    </div>
                </ClippedRevealText>

                <ClippedRevealText>
                    <div className={`flex flex-col gap-[0.8rem] ${R.divider} pt-[2.4rem]`}>
                        <a href={renewalContact.github} target="_blank" rel="noopener noreferrer" className={R.link}>
                            {renewalContact.githubLabel}
                        </a>
                        <a href={renewalContactExtended.linkedin} target="_blank" rel="noopener noreferrer" className={R.link}>
                            {renewalContactExtended.linkedinLabel}
                        </a>
                        <a href={renewalContactExtended.service} target="_blank" rel="noopener noreferrer" className={R.link}>
                            codi-agit.com
                        </a>
                        <a href={renewalContactExtended.portfolio} target="_blank" rel="noopener noreferrer" className={R.link}>
                            portfoliosj-react.netlify.app
                        </a>
                    </div>
                </ClippedRevealText>
            </ClippedRevealGroup>
        </RenewalSplitSection>
    );
};

export default ResumeRenewalContactSection;
