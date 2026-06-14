"use client";

import { renewalCollaboration } from "@/shared/constants/resume/resumeRenewalData";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalCollaborationSection = () => {
    return (
        <RenewalSplitSection id="renewal-collaboration" divider>
            <RenewalRightBlocks
                label={<p className={R.label}>Collaboration</p>}
                headline={<h2 className={R.keyline}>{renewalCollaboration.headline}</h2>}
                description={<p className={R.body}>{renewalCollaboration.intro}</p>}
                details={
                    <div className="flex flex-col gap-[2.4rem]">
                        {renewalCollaboration.items.map((item, index) => (
                            <div key={item.title} className={index > 0 ? `${R.divider} pt-[2.4rem]` : ""}>
                                <h3 className="text-[1.8rem] font-bold text-black mb-[0.8rem]">{item.title}</h3>
                                <p className={R.bodyMuted}>{item.description}</p>
                                <p className={`${R.meta} mt-[1rem]`}>{item.tags.join(" · ")}</p>
                            </div>
                        ))}
                    </div>
                }
            />
        </RenewalSplitSection>
    );
};

export default ResumeRenewalCollaborationSection;
