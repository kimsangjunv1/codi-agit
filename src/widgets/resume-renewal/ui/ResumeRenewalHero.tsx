"use client";

import Image from "next/image";
import Link from "next/link";

import { renewalHero } from "@/shared/constants/resume/resumeRenewalData";
import { renewalProfileDetails } from "@/shared/constants/resume/resumeRenewalData";
import RenewalFadeIn from "./RenewalFadeIn";
import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { resumeProfile, resumeSummaryStats } from "@/shared/constants/resume/resumeData";
import { R } from "./renewalStyles";

const HERO_IMAGE_HEIGHT = "h-[calc(100svh-var(--header-height))]";

const ResumeRenewalHero = () => {
    return (
        <RenewalSplitSection
            id="renewal-about"
            leftFill
            // splitClassName="!min-h-[calc(100svh-var(--header-height))]"
            leftWrapperClassName="w-full p-[2.4rem]"
            rightClassName="tablet:!flex-col tablet:!justify-end tablet:!items-start tablet:min-h-[calc(100svh-var(--header-height))]"
            // rightClassName="tablet:!flex-col tablet:!justify-end tablet:!items-start tablet:!py-[2.4rem] tablet:px-[2.4rem] tablet:min-h-[calc(100svh-var(--header-height))]"
            left={
                <div className="tablet:sticky tablet:top-[var(--header-height)] w-full">
                    <RenewalFadeIn>
                        <Image
                            src={renewalHero.profileImage}
                            alt={`${renewalHero.title} 프로필 사진`}
                            width={960}
                            height={1200}
                            className="h-[calc(100svh-(var(--header-height)*2))] object-cover"
                            // className={`${HERO_IMAGE_HEIGHT} w-full object-cover object-center`}
                            // sizes="(max-width: 768px) 100vw, 50vw"
                            // priority
                        />
                    </RenewalFadeIn>
                </div>
            }
        >
            <RenewalRightBlocks
                className="h-[calc(100svh-(var(--header-height)*2))] justify-center"
                label={<p className={R.label}>{renewalHero.category}</p>}
                headline={<h1 className={R.heroKeyline}>{renewalHero.description}</h1>}
                description={<p className={R.body}>{renewalHero.body}</p>}
                details={
                    <div className="flex flex-col gap-[2rem]">
                        <div>
                            <p className={R.role}>{renewalHero.role}</p>
                            <p className={R.name}>{renewalHero.title}</p>
                        </div>
                        <div className="flex flex-wrap gap-x-[2rem] gap-y-[0.8rem]">
                            {renewalHero.quickLinks.map((link) =>
                                link.external ? (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={R.link}
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className={R.link}
                                    >
                                        {link.label}
                                    </a>
                                ),
                            )}
                            <Link
                                href="/resume"
                                className={R.link}
                            >
                                Resume
                            </Link>
                        </div>
                    </div>
                }
            />
            <RenewalRightBlocks
                className="h-[calc(100svh-(var(--header-height)*2))] justify-center"
                label={<p className={R.label}>About</p>}
                headline={<h2 className={R.keyline}>프론트엔드 개발자, {resumeProfile.name}</h2>}
                description={<p className={R.body}>{renewalProfileDetails.motivation}</p>}
                details={
                    <div className="flex flex-col gap-[2.4rem]">
                        <div className="grid grid-cols-3 gap-[2rem]">
                            {resumeSummaryStats.map((stat) => (
                                <div key={stat.label}>
                                    <p className="text-[2rem] font-bold text-[#000000]">{stat.value}</p>
                                    <p className={`${R.meta} mt-[0.4rem]`}>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                        <dl className={`${R.divider} pt-[2.4rem] grid grid-cols-[9rem_1fr] gap-y-[1rem] ${R.meta}`}>
                            <dt>경력</dt>
                            <dd>{resumeProfile.experience}</dd>
                            <dt>연락처</dt>
                            <dd>
                                <a
                                    href={`tel:${renewalProfileDetails.phone.replace(/-/g, "")}`}
                                    className={R.link}
                                >
                                    {renewalProfileDetails.phone}
                                </a>
                            </dd>
                            <dt>이메일</dt>
                            <dd>
                                <a
                                    href={`mailto:${resumeProfile.email}`}
                                    className={R.link}
                                >
                                    {resumeProfile.email}
                                </a>
                            </dd>
                            <dt>서비스</dt>
                            <dd>
                                <a
                                    href={renewalProfileDetails.service}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={R.link}
                                >
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

export default ResumeRenewalHero;
