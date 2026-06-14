"use client";

import { renewalCollaboration } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalCollaborationSection = () => {
    return (
        <RenewalSplitSection id="renewal-collaboration" divider>
            <ClippedRevealGroup className="flex flex-col gap-[2.4rem]">
                <ClippedRevealText>
                    <p className={R.label}>Collaboration</p>
                </ClippedRevealText>

                <ClippedRevealText>
                    <h2 className={R.title}>{renewalCollaboration.headline}</h2>
                </ClippedRevealText>

                <ClippedRevealText>
                    <p className={R.body}>{renewalCollaboration.intro}</p>
                </ClippedRevealText>

                {renewalCollaboration.items.map((item, index) => (
                    <ClippedRevealText key={item.title}>
                        <div className={index === 0 ? "" : `${R.divider} pt-[2.4rem]`}>
                            <h3 className="text-[1.8rem] font-bold text-black mb-[0.8rem]">{item.title}</h3>
                            <p className={R.bodyMuted}>{item.description}</p>
                            <p className={`${R.meta} mt-[1rem]`}>{item.tags.join(" · ")}</p>
                        </div>
                    </ClippedRevealText>
                ))}
            </ClippedRevealGroup>
        </RenewalSplitSection>
    );
};

export default ResumeRenewalCollaborationSection;
