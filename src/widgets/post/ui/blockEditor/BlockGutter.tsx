"use client";

import type { PointerEvent } from "react";

type BlockGutterProps = {
    isActive: boolean;
    isDragging?: boolean;
    onOpenMenu: () => void;
    onDragStart: (event: PointerEvent) => void;
    onDragEnd?: () => void;
};

function GripIcon() {
    return (
        <span
            aria-hidden
            className="grid grid-cols-2 gap-[0.3rem]"
        >
            {Array.from({ length: 6 }).map((_, index) => (
                <span
                    className="h-[0.3rem] w-[0.3rem] rounded-full bg-current"
                    key={index}
                />
            ))}
        </span>
    );
}

export function BlockGutter({ isActive, isDragging = false, onOpenMenu, onDragStart, onDragEnd }: BlockGutterProps) {
    return (
        <section className="flex shrink-0 flex-col items-center gap-[0.4rem] pt-[0.8rem]">
            <button
                aria-label="블록 메뉴"
                className={`flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-[1.2rem] text-[var(--color-gray-600)] transition hover:bg-black/5 ${isActive ? "bg-black/5 text-[var(--color-gray-900)]" : "opacity-70"}`}
                onClick={(event) => {
                    event.stopPropagation();
                    onOpenMenu();
                }}
                type="button"
            >
                <GripIcon />
            </button>
            <button
                aria-label="블록 이동"
                className={`flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-[1.2rem] text-[var(--color-gray-500)] transition hover:bg-black/5 ${isDragging ? "cursor-grabbing bg-black/5" : "cursor-grab"}`}
                onPointerDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onDragStart(event);
                }}
                onPointerUp={() => onDragEnd?.()}
                type="button"
            >
                <span className="text-[1.8rem] leading-none">⠿</span>
            </button>
        </section>
    );
}
