"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

import { RENEWAL_VIEWPORT } from "@/shared/constants/resume/resumeRenewalData";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

type RenewalFadeInProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

export const RenewalFadeGroup = ({
    children,
    className = "",
    stagger = 0.08,
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
                visible: { transition: { staggerChildren: stagger } },
            }}
        >
            {children}
        </motion.div>
    );
};

const RenewalFadeIn = ({ children, className = "", delay = 0 }: RenewalFadeInProps) => {
    const reducedMotion = useReducedMotion();

    if (reducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { duration: 0.6, delay },
                },
            }}
        >
            {children}
        </motion.div>
    );
};

export default RenewalFadeIn;
