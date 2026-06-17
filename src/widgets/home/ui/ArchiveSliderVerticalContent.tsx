"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll } from "motion/react";

import { PostLatestItem } from "@/entities/post/model/post.type";

import ArchiveSliderVerticalCard from "./ArchiveSliderVerticalCard";

type ArchiveSliderVerticalContentProps = {
    posts: PostLatestItem[];
};

const ArchiveSliderVerticalContent = ({ posts }: ArchiveSliderVerticalContentProps) => {
    const cardRefs = useRef<(HTMLElement | null)[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const y = useMotionValue(0);

    const [maxTranslate, setMaxTranslate] = useState(0);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    });

    const calculateMaxTranslate = useCallback(() => {
        const track = sliderRef.current;
        const viewport = containerRef.current;

        if (!track || !viewport) {
            setMaxTranslate(0);
            return;
        }

        const trackHeight = track.scrollHeight;
        const viewportHeight = viewport.clientHeight;
        setMaxTranslate(Math.max(0, trackHeight - viewportHeight));
    }, []);

    useEffect(() => {
        calculateMaxTranslate();

        const ro = typeof window !== "undefined" && "ResizeObserver" in window ? new ResizeObserver(calculateMaxTranslate) : null;

        window.addEventListener("resize", calculateMaxTranslate);

        if (ro) {
            if (sliderRef.current) ro.observe(sliderRef.current);
            if (containerRef.current) ro.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener("resize", calculateMaxTranslate);
            ro?.disconnect();
        };
    }, [posts, calculateMaxTranslate]);

    useEffect(() => {
        if (maxTranslate <= 0) return;

        const unsub = scrollYProgress.on("change", (value) => {
            y.set(-value * maxTranslate);
        });

        return () => unsub();
    }, [scrollYProgress, maxTranslate, y]);

    const updateCardWidths = useCallback(() => {
        const container = containerRef.current;

        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;

        cardRefs.current.forEach((card) => {
            if (!card) return;

            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.top + cardRect.height / 2;
            const distance = Math.abs(containerCenter - cardCenter);
            const maxDistance = containerRect.height / 2;
            const ratio = Math.max(0, 1 - distance / maxDistance);

            card.style.width = `${75 + 17 * ratio}dvw`;
        });
    }, []);

    useEffect(() => {
        const unsub = y.onChange(() => requestAnimationFrame(updateCardWidths));
        updateCardWidths();

        return () => unsub();
    }, [y, posts, updateCardWidths]);

    return (
        <div
            ref={scrollRef}
            className="relative w-full h-[300vh]"
        >
            <section className="fixed top-0 flex justify-center w-full h-screen">
                <div
                    ref={containerRef}
                    className="flex justify-center w-full h-full overflow-hidden"
                >
                    <motion.div
                        ref={sliderRef}
                        className="flex flex-col gap-[2.4rem] items-center py-[calc(50dvh-(30svh/2))]"
                        style={{ y }}
                    >
                        {posts.map((post, index) => (
                            <ArchiveSliderVerticalCard
                                key={post.idx}
                                post={post}
                                index={index}
                                cardRef={(element) => {
                                    cardRefs.current[index] = element;
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ArchiveSliderVerticalContent;
