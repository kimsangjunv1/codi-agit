"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

import { RENEWAL_REVEAL_EASE, RENEWAL_VIEWPORT } from "@/shared/constants/resume/resumeRenewalData";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

type ClippedRevealTextProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

export const ClippedRevealGroup = ({
    children,
    className = "",
    stagger = 0.12,
}: {
    children: ReactNode;
    className?: string;
    stagger?: number;
}) => {
    const reducedMotion = useReducedMotion();

    if (reducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={RENEWAL_VIEWPORT}
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: stagger },
                },
            }}
        >
            {children}
        </motion.div>
    );
};

const ClippedRevealText = ({ children, className = "", delay = 0 }: ClippedRevealTextProps) => {
    const reducedMotion = useReducedMotion();

    if (reducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={`overflow-hidden ${className}`}
            variants={{
                hidden: {},
                visible: {},
            }}
        >
            <motion.div
                variants={{
                    hidden: { x: "110%", opacity: 0 },
                    visible: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.9,
                            ease: RENEWAL_REVEAL_EASE,
                            delay,
                        },
                    },
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default ClippedRevealText;
