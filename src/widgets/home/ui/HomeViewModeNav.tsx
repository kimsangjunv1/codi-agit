"use client";

import { AnimatePresence, motion } from "motion/react";

import UI from "@/shared/ui/common/UIComponent";
import TextShimmer from "@/shared/ui/common/TextShimmerComponent";
import { useGetCategoryListQuery } from "@/entities/category/api/category.query";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";

const springTransition = {
    type: "spring" as const,
    mass: 0.1,
    stiffness: 100,
    damping: 10,
};

type HomeViewModeNavProps = {
    variant: "header" | "floating";
};

const HomeViewModeNav = ({ variant }: HomeViewModeNavProps) => {
    const { mainViewMode, setMainViewMode, categoryFilter, setCategoryFilter, setIsSearchOpen } = useLayoutStore();
    const { data: getCategoryListData } = useGetCategoryListQuery();

    const isFloating = variant === "floating";
    const activeTextClass = isFloating ? "text-white" : "text-black";
    const inactiveTextClass = isFloating ? "text-white/50" : "text-[#00000050]";
    const dividerClass = isFloating
        ? "h-[1.6rem] w-[0.1rem] bg-white/30 shrink-0"
        : "h-[1.6rem] w-[0.1rem] bg-[var(--color-gray-400)] shrink-0";
    const buttonTextClass = isFloating ? "font-extrabold text-[1.6rem]" : "font-extrabold text-[2.4rem]";

    return (
        <AnimatePresence mode="popLayout">
            <UI.Button
                onClick={() => setIsSearchOpen(true)}
                className={`${inactiveTextClass} flex h-[2.8rem] w-[2.8rem] shrink-0 items-center justify-center`}
            >
                <span className="relative h-[1.6rem] w-[1.6rem] rounded-full border-[0.18rem] border-current after:absolute after:right-[-0.45rem] after:bottom-[-0.35rem] after:h-[0.7rem] after:w-[0.18rem] after:rotate-[-45deg] after:rounded-full after:bg-current" />
                <span className="sr-only">검색</span>
            </UI.Button>

            <UI.Button
                onClick={() => {
                    window.scrollTo({ top: 0, left: 0 });
                    setMainViewMode(1);
                }}
                className={`${activeTextClass} text-[1.8rem] font-bold shrink-0`}
            >
                {isFloating ? (
                    <span className={buttonTextClass}>최신글</span>
                ) : (
                    <TextShimmer
                        as="h2"
                        duration={3}
                        style={{
                            color: "#000000",
                            fontSize: "2.4rem",
                        }}
                        color={{
                            start: "#000000",
                            end: "#9393a0",
                        }}
                        className="font-extrabold text-[2.4rem]"
                    >
                        최신글
                    </TextShimmer>
                )}
            </UI.Button>

            <div key="hr" className={dividerClass} />

            {mainViewMode === 1 && (
                <motion.section
                    key="slider"
                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                    animate={{ opacity: 1, transform: "scale(1)" }}
                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                    transition={springTransition}
                    className="flex gap-[1.6rem] flex-1 justify-center shrink-0"
                >
                    <UI.Button onClick={() => setMainViewMode(2)} className={`${inactiveTextClass} ${buttonTextClass}`}>
                        리스트
                    </UI.Button>
                </motion.section>
            )}

            {mainViewMode === 2 && (
                <motion.section
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={springTransition}
                    className={`flex gap-[1.6rem] flex-1 justify-center ${isFloating ? "overflow-x-auto max-w-full scrollbar-hide" : ""}`}
                >
                    <motion.section
                        key="category-all"
                        initial={{ opacity: 0, transform: "scale(0.8)" }}
                        animate={{ opacity: 1, transform: "scale(1)" }}
                        exit={{ opacity: 0, transform: "scale(0.8)" }}
                        transition={springTransition}
                        onClick={() => setCategoryFilter(999)}
                        className={`flex gap-[1.6rem] shrink-0 ${categoryFilter === 999 ? activeTextClass : inactiveTextClass}`}
                    >
                        <UI.Button className={buttonTextClass}>전체</UI.Button>
                    </motion.section>
                    {getCategoryListData?.result
                        ?.filter((e) => e.is_enabled)
                        .map((e, i) => (
                            <motion.section
                                key={`${e.idx}-${i}`}
                                initial={{ opacity: 0, transform: "scale(0.8)" }}
                                animate={{ opacity: 1, transform: "scale(1)" }}
                                exit={{ opacity: 0, transform: "scale(0.8)" }}
                                transition={{
                                    delay: 0.05 * (i + 1),
                                    ...springTransition,
                                }}
                                onClick={() => setCategoryFilter(e.idx)}
                                className={`flex gap-[1.6rem] shrink-0 ${categoryFilter === e.idx ? activeTextClass : inactiveTextClass}`}
                            >
                                <UI.Button className={buttonTextClass}>{e.title}</UI.Button>
                            </motion.section>
                        ))}
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default HomeViewModeNav;
