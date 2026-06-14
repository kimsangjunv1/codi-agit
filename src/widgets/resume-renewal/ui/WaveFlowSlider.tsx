"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useInView, useMotionValue, cubicBezier } from "motion/react";

import { RENEWAL_GALLERY_VIEWPORT, RENEWAL_REVEAL_EASE } from "@/shared/constants/resume/resumeRenewalData";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

export const WAVE_FLOW_DEFAULT_LOGO = "/images/icon/graphic/ico-graphic-logo-horizontal.svg";

/** ArchiveSliderCard sin 위상 간격 */
const WAVE_PHASE_STEP = 0.8;
const WAVE_RAMP_DURATION = 1.1;

const renewalEase = cubicBezier(...RENEWAL_REVEAL_EASE);

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
    waveFrequency?: number;
};

type WaveFlowSliderCardProps = {
    item: WaveFlowSliderItem;
    globalIndex: number;
    visible: boolean;
    reducedMotion: boolean;
    revealStagger: number;
    revealDuration: number;
    waveAmplitude: number;
    waveInnerRef: (element: HTMLDivElement | null) => void;
    onImageReady: () => void;
};

const WaveFlowSliderCard = ({ item, globalIndex, visible, reducedMotion, revealStagger, revealDuration, waveAmplitude, waveInnerRef, onImageReady }: WaveFlowSliderCardProps) => {
    const staticWaveY = Math.sin(globalIndex * WAVE_PHASE_STEP) * waveAmplitude;

    return (
        <motion.div
            className="relative shrink-0"
            initial={{ scale: 0 }}
            animate={{ scale: visible ? 1 : 0 }}
            transition={{
                duration: reducedMotion ? 0 : revealDuration,
                ease: RENEWAL_REVEAL_EASE,
                delay: visible ? (globalIndex % 20) * revealStagger : 0,
            }}
        >
            <div
                ref={waveInnerRef}
                className="flex h-[12.8rem] w-[12.8rem] items-center justify-center"
                style={reducedMotion ? { transform: `translateY(${staticWaveY}px)` } : undefined}
            >
                <Image
                    src={item.image}
                    alt={item.alt}
                    width={64}
                    height={64}
                    onLoad={onImageReady}
                    className="h-[12.8rem] w-auto max-w-[12.8rem] object-contain select-none pointer-events-none"
                    draggable={false}
                />
            </div>
        </motion.div>
    );
};

const WaveFlowSlider = ({ items, className = "", speed = 48, waveAmplitude = 28, waveFrequency = 2.2 }: WaveFlowSliderProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const setRef = useRef<HTMLDivElement>(null);
    const waveInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const loopWidthRef = useRef(0);
    const waveTimeRef = useRef(0);
    const waveRampElapsedRef = useRef(0);
    const x = useMotionValue(0);

    const isInView = useInView(containerRef, RENEWAL_GALLERY_VIEWPORT);
    const reducedMotion = useReducedMotion();
    const visible = reducedMotion || isInView;

    const [isFlowing, setIsFlowing] = useState(false);

    const itemCount = items.length;
    const duplicateCount = 3;
    const revealDuration = 0.65;
    const revealStagger = 0.06;
    const maxRevealDelay = revealStagger * Math.min(itemCount, 20) + revealDuration;

    const updateLoopWidth = useCallback(() => {
        const setWidth = setRef.current?.offsetWidth ?? 0;
        if (!setWidth) return;

        loopWidthRef.current = setWidth;

        const currentX = x.get();
        if (currentX <= -setWidth) {
            x.set(currentX + setWidth * Math.ceil(-currentX / setWidth));
        }
    }, [x]);

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
        if (!isFlowing) return;

        waveTimeRef.current = 0;
        waveRampElapsedRef.current = 0;
    }, [isFlowing]);

    useEffect(() => {
        waveInnerRefs.current = [];
        waveTimeRef.current = 0;
        waveRampElapsedRef.current = 0;
        x.set(0);
        updateLoopWidth();
        window.addEventListener("resize", updateLoopWidth);

        const resizeObserver = typeof window !== "undefined" && "ResizeObserver" in window ? new ResizeObserver(updateLoopWidth) : null;

        if (setRef.current) resizeObserver?.observe(setRef.current);

        return () => {
            window.removeEventListener("resize", updateLoopWidth);
            resizeObserver?.disconnect();
        };
    }, [items, updateLoopWidth, x]);

    useEffect(() => {
        if (isFlowing) return;

        waveInnerRefs.current.forEach((inner) => {
            if (!inner) return;
            inner.style.transform = "";
        });
    }, [isFlowing]);

    useAnimationFrame((_, delta) => {
        if (!isFlowing || reducedMotion) return;

        const loopWidth = loopWidthRef.current;
        if (!loopWidth) return;

        const deltaSeconds = delta / 1000;
        waveRampElapsedRef.current += deltaSeconds;
        const rampLinear = Math.min(1, waveRampElapsedRef.current / WAVE_RAMP_DURATION);
        const ramp = renewalEase(rampLinear);

        waveTimeRef.current += deltaSeconds;

        let nextX = x.get() - speed * ramp * deltaSeconds;
        while (nextX <= -loopWidth) {
            nextX += loopWidth;
        }
        x.set(nextX);

        waveInnerRefs.current.forEach((inner, globalIndex) => {
            if (!inner) return;

            const phase = globalIndex * WAVE_PHASE_STEP;
            const y = Math.sin(waveTimeRef.current * waveFrequency + phase) * waveAmplitude * ramp;
            inner.style.transform = `translateY(${y}px)`;
        });
    });

    if (itemCount === 0) return null;

    const renderSet = (setIndex: number) => {
        const globalOffset = setIndex * itemCount;

        return (
            <div
                key={`wave-set-${setIndex}`}
                ref={setIndex === 0 ? setRef : undefined}
                className="flex shrink-0 items-center gap-[5.2rem]"
                aria-hidden={setIndex > 0 ? true : undefined}
            >
                {items.map((item, index) => {
                    const globalIndex = globalOffset + index;

                    return (
                        <WaveFlowSliderCard
                            key={`${setIndex}-${item.id}`}
                            item={item}
                            globalIndex={globalIndex}
                            visible={visible}
                            reducedMotion={reducedMotion}
                            revealStagger={revealStagger}
                            revealDuration={revealDuration}
                            waveAmplitude={waveAmplitude}
                            waveInnerRef={(element) => {
                                waveInnerRefs.current[globalIndex] = element;
                            }}
                            onImageReady={updateLoopWidth}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div
            ref={containerRef}
            className={`w-full overflow-hidden py-[2.4rem] ${className}`}
        >
            <motion.div
                ref={trackRef}
                className="flex w-max items-center"
                style={reducedMotion ? undefined : { x }}
            >
                {Array.from({ length: duplicateCount }, (_, setIndex) => renderSet(setIndex))}
            </motion.div>
        </div>
    );
};

export default WaveFlowSlider;
