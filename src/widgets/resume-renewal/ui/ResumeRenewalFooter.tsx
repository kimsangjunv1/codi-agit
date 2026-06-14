"use client";

import { renewalContact } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText from "./ClippedRevealText";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalFooter = () => {
    return (
        <RenewalSplitSection divider>
            <ClippedRevealText>
                <a href={`mailto:${renewalContact.email}`} className={`${R.link} text-[1.6rem] break-all`}>
                    {renewalContact.email}
                </a>
            </ClippedRevealText>
        </RenewalSplitSection>
    );
};

export default ResumeRenewalFooter;
