"use client";

import { renewalContact } from "@/shared/constants/resume/resumeRenewalData";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalFooter = () => {
    return (
        <RenewalSplitSection divider>
            <RenewalRightBlocks
                label={<p className={R.label}>End</p>}
                headline={
                    <a href={`mailto:${renewalContact.email}`} className={`${R.heroKeyline} hover:opacity-70 transition-opacity`}>
                        {renewalContact.email}
                    </a>
                }
                description={<p className={R.bodyMuted}>프로젝트 제안·협업 문의 환영합니다.</p>}
                details={<p className={R.meta}>© {new Date().getFullYear()} Kim Sangjun</p>}
            />
        </RenewalSplitSection>
    );
};

export default ResumeRenewalFooter;
