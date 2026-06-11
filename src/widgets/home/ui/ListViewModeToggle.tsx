"use client";

import { motion } from "motion/react";

import UI from "@/shared/ui/common/UIComponent";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";

const ListViewModeToggle = () => {
    const { listViewMode, setListViewMode } = useLayoutStore();

    return (
        <motion.article
            className="fixed z-100 flex gap-[0.4rem] p-[0.4rem] rounded-[1.4rem] left-[50%] -translate-x-1/2 bottom-[calc(1.6rem*2)] bg-[#ffffffd1] backdrop-blur-md shadow-[var(--shadow-normal)]"
            initial={{ opacity: 0, y: "2rem", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                type: "spring",
                mass: 0.1,
                stiffness: 100,
                damping: 10,
            }}
        >
            <UI.Button
                onClick={() => setListViewMode("default")}
                className={`px-[1.6rem] py-[0.8rem] rounded-[1.2rem] text-[1.4rem] font-bold transition-colors ${
                    listViewMode === "default" ? "bg-[var(--color-brand-500)] text-white shadow-[var(--shadow-normal)]" : "bg-white text-black"
                }`}
            >
                기본
            </UI.Button>
            <UI.Button
                onClick={() => setListViewMode("grid")}
                className={`px-[1.6rem] py-[0.8rem] rounded-[1.2rem] text-[1.4rem] font-bold transition-colors ${
                    listViewMode === "grid" ? "bg-[var(--color-brand-500)] text-white shadow-[var(--shadow-normal)]" : "bg-white text-black"
                }`}
            >
                grid
            </UI.Button>
        </motion.article>
    );
};

export default ListViewModeToggle;
