"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

import { RENEWAL_REVEAL_EASE } from "@/shared/constants/resume/resumeRenewalData";
import { useLightMotion } from "@/shared/hooks/useLightMotion";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

type ClippedRevealBlockProps = {
    children: ReactNode;
    revealed: boolean;
    delay?: number;
    className?: string;
};

/** clip reveal — revealed false일 때만 hidden 상태 */
export const ClippedRevealBlock = ({ children, revealed, delay = 0, className = "" }: ClippedRevealBlockProps) => {
    const reducedMotion = useReducedMotion();
    const lightMotion = useLightMotion();
    const visible = reducedMotion || revealed;

    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={false}
                animate={visible ? { x: 0, opacity: 1 } : { x: "110%", opacity: 0 }}
                transition={{
                    duration: reducedMotion ? 0 : lightMotion ? (visible ? 0.55 : 0.3) : visible ? 0.85 : 0.45,
                    ease: RENEWAL_REVEAL_EASE,
                    delay: visible ? (lightMotion ? delay * 0.5 : delay) : 0,
                }}
                style={{ willChange: visible ? "auto" : "transform" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

const ClippedRevealText = ClippedRevealBlock;

export default ClippedRevealText;
