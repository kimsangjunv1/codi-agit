"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";

import { RENEWAL_REVEAL_EASE, RENEWAL_VIEWPORT } from "@/shared/constants/resume/resumeRenewalData";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

type ClippedRevealBlockProps = {
    children: ReactNode;
    isInView: boolean;
    delay?: number;
    className?: string;
};

/** clip reveal — isInView false 시 hidden 상태로 복구 */
export const ClippedRevealBlock = ({ children, isInView, delay = 0, className = "" }: ClippedRevealBlockProps) => {
    const reducedMotion = useReducedMotion();
    const visible = reducedMotion || isInView;

    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={false}
                animate={visible ? { x: 0, opacity: 1 } : { x: "110%", opacity: 0 }}
                transition={{
                    duration: reducedMotion ? 0 : visible ? 0.85 : 0.45,
                    ease: RENEWAL_REVEAL_EASE,
                    delay: visible ? delay : 0,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

const ClippedRevealText = ClippedRevealBlock;

export default ClippedRevealText;
