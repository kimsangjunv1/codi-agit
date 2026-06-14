"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";

import { RENEWAL_GALLERY_VIEWPORT } from "@/shared/constants/resume/resumeRenewalData";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

type RenewalFadeInProps = {
    children: ReactNode;
    className?: string;
};

/** opacity only — 뷰포트 이탈 시 hidden 복구 */
const RenewalFadeIn = ({ children, className = "" }: RenewalFadeInProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, RENEWAL_GALLERY_VIEWPORT);
    const reducedMotion = useReducedMotion();
    const visible = reducedMotion || isInView;

    return (
        <div ref={ref} className={className}>
            <motion.div
                initial={false}
                animate={{ opacity: visible ? 1 : 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default RenewalFadeIn;
