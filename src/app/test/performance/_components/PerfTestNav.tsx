import Link from "next/link";

type PerfTestNavProps = {
    current: "bad" | "good";
};

const PerfTestNav = ({ current }: PerfTestNavProps) => {
    return (
        <nav className="flex flex-wrap items-center gap-[1.2rem] text-[1.4rem]">
            <Link
                href="/test/performance/bad"
                className={current === "bad" ? "font-bold underline" : "text-neutral-500 hover:underline"}
                aria-current={current === "bad" ? "page" : undefined}
            >
                Bad (느린 LCP)
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
                href="/test/performance/good"
                className={current === "good" ? "font-bold underline" : "text-neutral-500 hover:underline"}
                aria-current={current === "good" ? "page" : undefined}
            >
                Good (최적화)
            </Link>
        </nav>
    );
};

export default PerfTestNav;
