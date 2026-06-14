"use client";

import { renewalProfileDetails } from "@/shared/constants/resume/resumeRenewalData";
import { resumeProfile, resumeSummaryStats } from "@/shared/constants/resume/resumeData";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalProfileSection = () => {
    return (
        <RenewalSplitSection divider>
            <RenewalRightBlocks
                label={<p className={R.label}>About</p>}
                headline={<h2 className={R.keyline}>프론트엔드 개발자, {resumeProfile.name}</h2>}
                description={<p className={R.body}>{renewalProfileDetails.motivation}</p>}
                details={
                    <div className="flex flex-col gap-[2.4rem]">
                        <div className="grid grid-cols-3 gap-[2rem]">
                            {resumeSummaryStats.map((stat) => (
                                <div key={stat.label}>
                                    <p className="text-[2rem] font-bold text-black">{stat.value}</p>
                                    <p className={`${R.meta} mt-[0.4rem]`}>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                        <dl className={`${R.divider} pt-[2.4rem] grid grid-cols-[9rem_1fr] gap-y-[1rem] ${R.meta}`}>
                            <dt>경력</dt>
                            <dd className="text-[#333]">{resumeProfile.experience}</dd>
                            <dt>연락처</dt>
                            <dd>
                                <a href={`tel:${renewalProfileDetails.phone.replace(/-/g, "")}`} className={R.link}>
                                    {renewalProfileDetails.phone}
                                </a>
                            </dd>
                            <dt>이메일</dt>
                            <dd>
                                <a href={`mailto:${resumeProfile.email}`} className={R.link}>
                                    {resumeProfile.email}
                                </a>
                            </dd>
                            <dt>서비스</dt>
                            <dd>
                                <a href={renewalProfileDetails.service} target="_blank" rel="noopener noreferrer" className={R.link}>
                                    codi-agit.com
                                </a>
                            </dd>
                        </dl>
                    </div>
                }
            />
        </RenewalSplitSection>
    );
};

export default ResumeRenewalProfileSection;
