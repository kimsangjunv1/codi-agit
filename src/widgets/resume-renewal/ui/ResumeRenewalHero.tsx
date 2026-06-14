"use client";

import Image from "next/image";
import Link from "next/link";

import { renewalHero } from "@/shared/constants/resume/resumeRenewalData";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";
import RenewalFadeIn from "./RenewalFadeIn";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalHero = () => {
    return (
        <RenewalSplitSection
            id="renewal-about"
            left={
                <RenewalFadeIn>
                    <div className="relative w-full aspect-[4/5] max-w-[28rem] mx-auto overflow-hidden bg-[#eee]">
                        <Image
                            src={renewalHero.profileImage}
                            alt={`${renewalHero.title} 프로필 사진`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 80vw, 28rem"
                            priority
                        />
                    </div>
                </RenewalFadeIn>
            }
        >
            <ClippedRevealGroup className="flex flex-col gap-[2.4rem]">
                <ClippedRevealText>
                    <p className={R.category}>{renewalHero.category}</p>
                </ClippedRevealText>

                <ClippedRevealText>
                    <h1 className={R.title}>{renewalHero.description}</h1>
                </ClippedRevealText>

                <ClippedRevealText>
                    <p className={R.body}>{renewalHero.body}</p>
                </ClippedRevealText>

                <ClippedRevealText>
                    <div className="pt-[2rem]">
                        <p className={R.role}>{renewalHero.role}</p>
                        <p className={R.name}>{renewalHero.title}</p>
                    </div>
                </ClippedRevealText>

                <ClippedRevealText>
                    <div className="flex flex-wrap gap-x-[2rem] gap-y-[0.8rem] pt-[0.8rem]">
                        {renewalHero.quickLinks.map((link) =>
                            link.external ? (
                                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={R.link}>
                                    {link.label}
                                </a>
                            ) : (
                                <a key={link.label} href={link.href} className={R.link}>
                                    {link.label}
                                </a>
                            ),
                        )}
                        <Link href="/resume" className={R.link}>
                            Resume
                        </Link>
                    </div>
                </ClippedRevealText>
            </ClippedRevealGroup>
        </RenewalSplitSection>
    );
};

export default ResumeRenewalHero;
