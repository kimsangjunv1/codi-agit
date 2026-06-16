import type { Metadata } from "next";
import Image from "next/image";

import { NOINDEX_METADATA } from "@/shared/lib/seo/metadata";

import PerfTestGuide from "../_components/PerfTestGuide";
import PerfTestNav from "../_components/PerfTestNav";
import { PERF_TEST } from "../_components/shared";

export const metadata: Metadata = {
    title: "Performance Good",
    ...NOINDEX_METADATA,
};

const GoodPerformancePage = () => {
    return (
        <article className="mx-auto flex w-full max-w-[72rem] flex-col gap-[2.4rem] px-[2rem] py-[4rem]">
            <PerfTestNav current="good" />

            <header className="flex flex-col gap-[1.2rem]">
                <p className="rounded-[0.4rem] bg-green-100 px-[1rem] py-[0.6rem] text-[1.3rem] font-medium text-green-800">
                    GOOD — LCP 최적화 적용
                </p>
                <h1 className="text-[3.2rem] font-bold leading-tight">{PERF_TEST.title}</h1>
                <p className="text-[1.6rem] text-neutral-600">{PERF_TEST.description}</p>
            </header>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[0.8rem] bg-neutral-100">
                <Image
                    src={PERF_TEST.imageUrl}
                    alt={PERF_TEST.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover"
                />
            </div>

            <p className="text-[1.4rem] text-neutral-500">
                LCP 후보는 위 히어로 이미지입니다. Bad 페이지와 같은 URL·문구이지만 서버 렌더 + priority로 더 빨리
                표시됩니다.
            </p>

            <PerfTestGuide variant="good" />
        </article>
    );
};

export default GoodPerformancePage;
