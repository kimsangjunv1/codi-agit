"use client";

import { ReactNode, useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";

const MIN_COPIES = 2;

const Marquee = ({ content, duration = 1, className }: { content: string | ReactNode; duration?: number; className?: { container?: string; marquee?: string } }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const firstRef = useRef<HTMLDivElement | null>(null);
    const [segmentWidth, setSegmentWidth] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [copyCount, setCopyCount] = useState(MIN_COPIES);

    const isFullWidth = Boolean(className?.container?.includes("w-full"));

    const measure = useCallback(() => {
        const container = containerRef.current;
        const first = firstRef.current;
        const second = first?.nextElementSibling as HTMLElement | null;
        if (!container || !first || !second) return;

        const segment = second.offsetLeft - first.offsetLeft;
        if (segment <= 0) return;

        setSegmentWidth(segment);

        if (isFullWidth) {
            const viewport = container.parentElement?.clientWidth ?? container.clientWidth;
            if (viewport <= 0) return;

            setViewportWidth(viewport);
            setCopyCount(Math.max(MIN_COPIES, Math.ceil(viewport / segment) + 1));
            return;
        }

        setViewportWidth(segment);
        setCopyCount(MIN_COPIES);
    }, [isFullWidth]);

    useEffect(() => {
        measure();

        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver(measure);
        observer.observe(container);
        const parent = container.parentElement;
        if (parent) observer.observe(parent);

        return () => observer.disconnect();
    }, [content, measure, copyCount]);

    return (
        <div
            ref={containerRef}
            className={`${className?.container ?? ""} overflow-hidden max-w-full`}
            style={{
                position: "relative",
                width: viewportWidth > 0 ? viewportWidth : undefined,
            }}
        >
            <motion.div
                className={`${className?.marquee ?? ""} flex w-max flex-nowrap`}
                animate={{
                    x: segmentWidth ? [0, -segmentWidth] : 0,
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    duration,
                }}
            >
                {Array.from({ length: copyCount }, (_, i) => (
                    <div
                        key={i}
                        ref={i === 0 ? firstRef : undefined}
                        className="flex-shrink-0 whitespace-nowrap"
                        aria-hidden={i > 0 ? true : undefined}
                    >
                        {content}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
