"use client";

import { useEffect, useState } from "react";

import PerfTestGuide from "./PerfTestGuide";
import PerfTestNav from "./PerfTestNav";
import { PERF_TEST } from "./shared";

const busyWait = (ms: number) => {
    const end = performance.now() + ms;
    while (performance.now() < end) {
        // Intentionally block the main thread for performance lab demo.
    }
};

const BadPerfView = () => {
    const [isReady, setIsReady] = useState(false);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        busyWait(400);
        setIsReady(true);

        const timer = window.setTimeout(() => {
            setShowImage(true);
        }, 1500);

        return () => window.clearTimeout(timer);
    }, []);

    return (
        <article className="mx-auto flex w-full max-w-[72rem] flex-col gap-[2.4rem] px-[2rem] py-[4rem]">
            <PerfTestNav current="bad" />

            <header className="flex flex-col gap-[1.2rem]">
                <p className="rounded-[0.4rem] bg-red-100 px-[1rem] py-[0.6rem] text-[1.3rem] font-medium text-red-800">
                    BAD — LCP가 의도적으로 느립니다
                </p>
                <h1 className="text-[3.2rem] font-bold leading-tight">{PERF_TEST.title}</h1>
                <p className="text-[1.6rem] text-neutral-600">{PERF_TEST.description}</p>
            </header>

            <div className="w-full overflow-hidden rounded-[0.8rem] bg-neutral-100">
                {!isReady ? (
                    <p className="p-[4rem] text-center text-[1.4rem] text-neutral-500">클라이언트 JS 실행 중…</p>
                ) : showImage ? (
                    <img
                        src={PERF_TEST.imageUrl}
                        alt={PERF_TEST.alt}
                        loading="lazy"
                        className="w-full"
                    />
                ) : (
                    <p className="p-[4rem] text-center text-[1.4rem] text-neutral-500">
                        useEffect 지연 중… (약 1.5초)
                    </p>
                )}
            </div>

            <p className="text-[1.4rem] text-neutral-500">
                LCP 후보는 위 히어로 이미지입니다. Performance 탭에서 LCP 마커가 이미지 표시 시점에 찍히는지
                확인하세요.
            </p>

            <PerfTestGuide variant="bad" />
        </article>
    );
};

export default BadPerfView;
