"use client";

import { ReactNode, useRef } from "react";

import { RENEWAL_VIEWPORT } from "@/shared/constants/resume/resumeRenewalData";
import { useDirectionalRevealInView } from "@/shared/hooks/useDirectionalRevealInView";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { ClippedRevealBlock } from "./ClippedRevealText";

/** 블록 간 순차 delay — 4덩이 각각 구분되도록 */
const BLOCK_STAGGER = 0.14;

type RenewalRightBlocksProps = {
    label: ReactNode;
    headline: ReactNode;
    description: ReactNode;
    details: ReactNode;
    className?: string;
};

const RenewalRightBlocks = ({ label, headline, description, details, className = "" }: RenewalRightBlocksProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const revealed = useDirectionalRevealInView(ref, RENEWAL_VIEWPORT);
    const reducedMotion = useReducedMotion();

    const blocks = [
        { key: "label", content: label },
        { key: "headline", content: headline },
        { key: "description", content: description },
        { key: "details", content: details },
    ];

    if (reducedMotion) {
        return (
            <div ref={ref} className={`flex flex-col gap-[3.2rem] ${className}`}>
                {blocks.map(({ key, content }) => (
                    <div key={key}>{content}</div>
                ))}
            </div>
        );
    }

    return (
        <div ref={ref} className={`flex flex-col gap-[3.2rem] ${className}`}>
            {blocks.map(({ key, content }, index) => (
                <ClippedRevealBlock key={key} revealed={revealed} delay={index * BLOCK_STAGGER}>
                    {content}
                </ClippedRevealBlock>
            ))}
        </div>
    );
};

export default RenewalRightBlocks;
