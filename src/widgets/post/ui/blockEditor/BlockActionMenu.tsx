"use client";

import { useEffect, useRef, useState } from "react";
import { ColorPickerPopover } from "@/shared/ui/common/richText/toolbar/ColorPickerPopover";
import { isSameColor } from "@/shared/ui/common/richText/toolbar/colorPalette";
import { BLOCK_MENU_ITEM_CLASS, BLOCK_MENU_PANEL_CLASS } from "@/widgets/post/ui/blockEditor/blockEditorStyles";

type BlockActionMenuProps = {
    open: boolean;
    onClose: () => void;
    anchorRef: React.RefObject<HTMLElement | null>;
    rowIndex: number;
    blockIndex: number;
    rowCount: number;
    blockCount: number;
    backgroundColor?: string;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onAddGroupBelow: () => void;
    onAddBlockRight: () => void;
    onSwapColumns: () => void;
    onDuplicate: () => void;
    onDeleteBlock: () => void;
    onDeleteRow: () => void;
    onBackgroundColorChange: (color: string | undefined) => void;
};

export function BlockActionMenu({
    open,
    onClose,
    anchorRef,
    rowIndex,
    blockIndex,
    rowCount,
    blockCount,
    backgroundColor,
    onMoveUp,
    onMoveDown,
    onAddGroupBelow,
    onAddBlockRight,
    onSwapColumns,
    onDuplicate,
    onDeleteBlock,
    onDeleteRow,
    onBackgroundColorChange,
}: BlockActionMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [recentColors, setRecentColors] = useState<string[]>([]);
    const currentColor = backgroundColor ?? null;

    useEffect(() => {
        if (!open) {
            setIsColorPickerOpen(false);
        }
    }, [open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        function handlePointerDown(event: MouseEvent) {
            const target = event.target as Node;

            if (menuRef.current?.contains(target) || anchorRef.current?.contains(target)) {
                return;
            }

            onClose();
        }

        document.addEventListener("mousedown", handlePointerDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
        };
    }, [anchorRef, onClose, open]);

    if (!open) {
        return null;
    }

    const canMoveUp = rowIndex > 0;
    const canMoveDown = rowIndex < rowCount - 1;
    const canDeleteRow = rowCount > 1;
    const canAddRight = blockCount === 1;
    const canSwap = blockCount === 2 && blockIndex === 0;
    const canDeleteBlock = blockCount > 1;

    return (
        <div
            className={`absolute left-0 top-[calc(100%+0.4rem)] z-40 min-w-[22rem] ${BLOCK_MENU_PANEL_CLASS}`}
            onClick={(event) => event.stopPropagation()}
            ref={menuRef}
        >
            <button
                className={BLOCK_MENU_ITEM_CLASS}
                disabled={!canMoveUp}
                onClick={() => {
                    onMoveUp();
                    onClose();
                }}
                type="button"
            >
                위로 이동
            </button>
            <button
                className={BLOCK_MENU_ITEM_CLASS}
                disabled={!canMoveDown}
                onClick={() => {
                    onMoveDown();
                    onClose();
                }}
                type="button"
            >
                아래로 이동
            </button>
            <button
                className={BLOCK_MENU_ITEM_CLASS}
                onClick={() => {
                    onAddGroupBelow();
                    onClose();
                }}
                type="button"
            >
                아래에 그룹 추가
            </button>
            {canAddRight ? (
                <button
                    className={BLOCK_MENU_ITEM_CLASS}
                    onClick={() => {
                        onAddBlockRight();
                        onClose();
                    }}
                    type="button"
                >
                    오른쪽에 블록 추가
                </button>
            ) : null}
            {canSwap ? (
                <button
                    className={BLOCK_MENU_ITEM_CLASS}
                    onClick={() => {
                        onSwapColumns();
                        onClose();
                    }}
                    type="button"
                >
                    좌우 전환
                </button>
            ) : null}
            <button
                className={BLOCK_MENU_ITEM_CLASS}
                onClick={() => {
                    onDuplicate();
                    onClose();
                }}
                type="button"
            >
                블록 복제
            </button>

            <section className="relative border-t border-white/10 px-[0.4rem] py-[0.4rem]">
                <button
                    className={BLOCK_MENU_ITEM_CLASS}
                    onClick={() => setIsColorPickerOpen((prev) => !prev)}
                    type="button"
                >
                    <span>블록 배경색</span>
                    <span
                        className="ml-auto h-[1.6rem] w-[1.6rem] rounded-[0.4rem] border border-white/30"
                        style={{ backgroundColor: currentColor ?? "transparent" }}
                    />
                </button>
                <ColorPickerPopover
                    currentColor={currentColor}
                    mode="highlight"
                    onClose={() => setIsColorPickerOpen(false)}
                    onSelect={(color) => {
                        onBackgroundColorChange(color ?? undefined);

                        if (color) {
                            setRecentColors((prev) => [color, ...prev.filter((item) => !isSameColor(item, color))].slice(0, 8));
                        }

                        setIsColorPickerOpen(false);
                        onClose();
                    }}
                    open={isColorPickerOpen}
                    placement="bottom"
                    recentColors={recentColors}
                />
            </section>

            {canDeleteBlock ? (
                <button
                    className={`${BLOCK_MENU_ITEM_CLASS} text-[#ffb4b4]`}
                    onClick={() => {
                        onDeleteBlock();
                        onClose();
                    }}
                    type="button"
                >
                    이 블록 삭제
                </button>
            ) : null}
            <button
                className={`${BLOCK_MENU_ITEM_CLASS} text-[#ffb4b4]`}
                disabled={!canDeleteRow}
                onClick={() => {
                    onDeleteRow();
                    onClose();
                }}
                type="button"
            >
                그룹 삭제
            </button>
        </div>
    );
}
