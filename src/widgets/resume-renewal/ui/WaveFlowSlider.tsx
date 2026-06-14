"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useInView, useMotionValue } from "motion/react";

import { RENEWAL_GALLERY_VIEWPORT, RENEWAL_REVEAL_EASE } from "@/shared/constants/resume/resumeRenewalData";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

export const WAVE_FLOW_DEFAULT_LOGO = "/images/icon/graphic/ico-graphic-logo-horizontal.svg";

export type WaveFlowSliderItem = {
    id: string;
    image: string;
    alt: string;
};

type WaveFlowSliderProps = {
    items: WaveFlowSliderItem[];
    className?: string;
    speed?: number;
    waveAmplitude?: number;
    waveDuration?: number;
    waveStagger?: number;
};

type WaveFlowSliderCardProps = {
    item: WaveFlowSliderItem;
    index: number;
    visible: boolean;
    isFlowing: boolean;
    reducedMotion: boolean;
    revealStagger: number;
    revealDuration: number;
    waveAmplitude: number;
    waveDuration: number;
    waveStagger: number;
};

const normalizeX = (value: number, loopWidth: number) => {
    if (!loopWidth) return value;

    const normalized = value % loopWidth;
    return normalized > 0 ? normalized - loopWidth : normalized;
};

const WaveFlowSliderCard = ({
    item,
    index,
    visible,
    isFlowing,
    reducedMotion,
    revealStagger,
    revealDuration,
    waveAmplitude,
    waveDuration,
    waveStagger,
}: WaveFlowSliderCardProps) => {
    const staticWaveY = Math.sin(index * 0.8) * waveAmplitude;

    return (
        <motion.div
            className="relative flex h-[8rem] w-[8rem] shrink-0 items-center justify-center"
            initial={{ scale: 0 }}
            animate={{
                scale: visible ? 1 : 0,
                y:
                    reducedMotion
                        ? staticWaveY
                        : isFlowing
                          ? [0, -waveAmplitude, 0]
                          : 0,
            }}
            transition={{
                scale: {
                    duration: reducedMotion ? 0 : revealDuration,
                    ease: RENEWAL_REVEAL_EASE,
                    delay: visible ? index * revealStagger : 0,
                },
                y:
                    isFlowing && !reducedMotion
                        ? {
                              duration: waveDuration,
                              ease: RENEWAL_REVEAL_EASE,
                              repeat: Infinity,
                              delay: index * waveStagger,
                          }
                        : {
                              duration: 0.3,
                              ease: RENEWAL_REVEAL_EASE,
                          },
            }}
        >
            <Image
                src={item.image}
                alt={item.alt}
                width={64}
                height={64}
                className="h-[4.8rem] w-auto max-w-[6.4rem] object-contain select-none pointer-events-none"
                draggable={false}
            />
        </motion.div>
    );
};

const WaveFlowSlider = ({
    items,
    className = "",
    speed = 48,
    waveAmplitude = 28,
    waveDuration = 1.6,
    waveStagger = 0.14,
}: WaveFlowSliderProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const loopWidthRef = useRef(0);
    const x = useMotionValue(0);

    const isInView = useInView(containerRef, RENEWAL_GALLERY_VIEWPORT);
    const reducedMotion = useReducedMotion();
    const visible = reducedMotion || isInView;

    const [isFlowing, setIsFlowing] = useState(false);

    const sliderItems = [...items, ...items];
    const itemCount = items.length;

    const revealDuration = 0.65;
    const revealStagger = 0.08;
    const maxRevealDelay = revealStagger * Math.max(itemCount - 1, 0) + revealDuration;

    useEffect(() => {
        if (!visible) {
            setIsFlowing(false);
            return;
        }

        if (reducedMotion) {
            setIsFlowing(true);
            return;
        }

        const timer = window.setTimeout(() => setIsFlowing(true), maxRevealDelay * 1000);
        return () => window.clearTimeout(timer);
    }, [visible, reducedMotion, maxRevealDelay]);

    useEffect(() => {
        const updateLoopWidth = () => {
            const trackWidth = trackRef.current?.scrollWidth ?? 0;
            loopWidthRef.current = trackWidth / 2;
            x.set(normalizeX(x.get(), trackWidth / 2));
        };

        updateLoopWidth();
        window.addEventListener("resize", updateLoopWidth);

        const resizeObserver =
            typeof window !== "undefined" && "ResizeObserver" in window ? new ResizeObserver(updateLoopWidth) : null;

        if (trackRef.current) resizeObserver?.observe(trackRef.current);

        return () => {
            window.removeEventListener("resize", updateLoopWidth);
            resizeObserver?.disconnect();
        };
    }, [items, x]);

    useAnimationFrame((_, delta) => {
        if (!isFlowing || reducedMotion) return;

        const loopWidth = loopWidthRef.current;
        if (!loopWidth) return;

        const nextX = x.get() - (speed * delta) / 1000;
        x.set(normalizeX(nextX, loopWidth));
    });

    if (itemCount === 0) return null;

    return (
        <div ref={containerRef} className={`w-full overflow-hidden py-[2.4rem] ${className}`}>
            <motion.div
                ref={trackRef}
                className="flex w-max items-center gap-[2.4rem]"
                style={reducedMotion ? undefined : { x }}
            >
                {sliderItems.map((item, index) => (
                    <WaveFlowSliderCard
                        key={`${item.id}-${index}`}
                        item={item}
                        index={index % itemCount}
                        visible={visible}
                        isFlowing={isFlowing}
                        reducedMotion={reducedMotion}
                        revealStagger={revealStagger}
                        revealDuration={revealDuration}
                        waveAmplitude={waveAmplitude}
                        waveDuration={waveDuration}
                        waveStagger={waveStagger}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default WaveFlowSlider;
