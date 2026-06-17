"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll } from "motion/react";

import { PostLatestItem } from "@/entities/post/model/post.type";

import ArchiveSliderCard from "./ArchiveSliderCard";

type ArchiveSliderContentProps = {
    posts: PostLatestItem[];
};

const ArchiveSliderContent = ({ posts }: ArchiveSliderContentProps) => {
    const cardRefs = useRef<(HTMLElement | null)[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const x = useMotionValue(0);

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

        const trackWidth = track.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        setMaxTranslate(Math.max(0, trackWidth - viewportWidth));
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
            x.set(-value * maxTranslate);
        });

        return () => unsub();
    }, [scrollYProgress, maxTranslate, x]);

    const updateCardHeights = useCallback(() => {
        const container = containerRef.current;

        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        cardRefs.current.forEach((card) => {
            if (!card) return;

            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(containerCenter - cardCenter);
            const maxDistance = containerRect.width / 2;
            const ratio = Math.max(0, 1 - distance / maxDistance);

            card.style.height = `${30 + 20 * ratio}svh`;
        });
    }, []);

    useEffect(() => {
        const unsub = x.onChange(() => requestAnimationFrame(updateCardHeights));
        updateCardHeights();

        return () => unsub();
    }, [x, posts, updateCardHeights]);

    return (
        <div
            ref={scrollRef}
            className="relative w-full h-[300vh]"
        >
            <section className="fixed top-0 flex items-center w-full h-screen">
                <div
                    ref={containerRef}
                    className="flex items-center w-full h-full overflow-hidden"
                >
                    <motion.div
                        ref={sliderRef}
                        className="flex gap-[2.4rem] items-center px-[calc(50dvw-(36.0rem/2))]"
                        style={{ x }}
                    >
                        {posts.map((post, index) => (
                            <ArchiveSliderCard
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

export default ArchiveSliderContent;
