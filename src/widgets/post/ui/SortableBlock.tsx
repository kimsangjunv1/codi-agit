"use client";

import { motion, Reorder, useDragControls } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";

import TipTap from "@/shared/ui/layout/Tiptap";
import UI from "@/shared/ui/common/UIComponent";
import IconComponent from "@/shared/ui/common/IconComponent";
import { blockContentToHtml } from "@/widgets/post/lib/blockContent";

import { usePostDraftImageStore } from "@/shared/stores/usePostDraftImageStore";
import { useToastStore } from "@/shared/stores/useToastStore";
import { Row, useBlockStore } from "@/widgets/post/model/useEditorBlockStore";

import type { SectionContent } from "@/entities/post/model/post.type";

const REORDER_TRANSITION = { type: "spring" as const, stiffness: 500, damping: 42 };

const getRowKey = (row: Row) => row.map((b) => b.id).join("-");

const SortableBlock = ({ contents }: { contents?: Row[] }) => {
    const { rows, setRows } = useBlockStore();

    useEffect(() => {
        if (contents && contents.length > 0) {
            setRows(contents);
        }
    }, [contents, setRows]);

    return (
        <Reorder.Group
            axis="y"
            values={rows}
            onReorder={(newRows) => useBlockStore.getState().setRows(newRows)}
            as="section"
            className="flex flex-col flex-1 gap-[7.2rem]"
        >
            {rows.map((row, rowIndex) => (
                <Item key={getRowKey(row)} row={row} rowIndex={rowIndex} />
            ))}
        </Reorder.Group>
    );
};

const Item = ({ row, rowIndex }: { row: Row; rowIndex: number }) => {
    const dragControls = useDragControls();

    const [isGrabbing, setIsGrabbing] = useState(false);

    const { setToast } = useToastStore();
    const { rows, addBlock, deleteRow } = useBlockStore();

    return (
        <Reorder.Item
            value={row}
            layout
            transition={REORDER_TRANSITION}
            className="group/row relative flex flex-col gap-[0.8rem]"
            as="div"
            dragControls={dragControls}
            dragListener={false}
        >
            <section
                className={`flex gap-[0.8rem] w-full justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 ${isGrabbing ? "opacity-100" : ""}`}
            >
                <section className="flex items-center justify-center bg-white rounded-full shadow-[var(--shadow-normal)] border border-[var(--color-gray-200)]">
                    <section
                        onPointerDown={(e) => {
                            e.preventDefault();
                            setIsGrabbing(true);
                            dragControls.start(e);
                        }}
                        onPointerUp={() => setIsGrabbing(false)}
                        className={`text-black rounded-[1.6rem] flex gap-[0.4rem] h-full items-center px-[1.2rem] py-[0.8rem] ${isGrabbing ? "cursor-grabbing" : "cursor-grab"}`}
                    >
                        <IconComponent type="outlined-arrow-below" alt="이동" className="rotate-180" />
                        <p className="tablet:block mobile:hidden text-[1.2rem]">이동</p>
                    </section>

                    <UI.Button
                        onClick={() => addBlock(rowIndex, "down")}
                        className="text-black rounded-[1.6rem] flex gap-[0.4rem] h-full items-center px-[1.2rem] py-[0.8rem]"
                    >
                        <p className="tablet:block mobile:hidden text-[1.2rem]">아래 그룹</p>
                        <p>+</p>
                    </UI.Button>

                    <UI.Button
                        onClick={() => {
                            if (rows.length === 1) {
                                setToast({ msg: "마지막 그룹은 삭제 할 수 없어요", time: 2 });
                                return;
                            }

                            setToast({ msg: "그룹을 제거했어요", time: 2 });
                            deleteRow(rowIndex);
                        }}
                        className="text-black rounded-[1.6rem] flex gap-[0.4rem] h-full items-center px-[1.2rem] py-[0.8rem]"
                    >
                        <p className="tablet:block mobile:hidden text-[1.2rem]">삭제</p>
                        <p>-</p>
                    </UI.Button>
                </section>
            </section>

            <section className={`flex flex-wrap gap-[1.6rem] w-full ${row.length === 1 && (row[0].type === 1 || row[0].type === 2) ? "" : ""}`}>
                {row.map((block, blockIndex) => (
                    <Fragment key={block.id}>
                        <section className="flex-1 min-w-[calc((var(--size-tablet)-(1.6rem*10))/2)]">
                            <Block
                                block={block}
                                rowIndex={rowIndex}
                                blockIndex={blockIndex}
                                last={row.length !== 1}
                                blockCount={row.length}
                            />
                        </section>

                        <section
                            className={`flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 ${blockIndex === 0 ? "" : "hidden"}`}
                        >
                            <UI.Button
                                onClick={() => {
                                    const ADD = row.length === 1;
                                    const SWAP = row.length === 2;

                                    if (ADD) {
                                        addBlock(rowIndex, "right");
                                        return;
                                    }

                                    if (SWAP) {
                                        const newRows = rows.map((e, idx) => (idx === rowIndex ? e.reverse() : e));
                                        useBlockStore.getState().setRows(newRows);
                                    }
                                }}
                                className="flex gap-[0.4rem] items-center h-full p-[0.8rem] bg-[var(--color-gray-200)] hover:bg-[var(--color-brand-500)] rounded-[0.8rem]"
                            >
                                <IconComponent
                                    type={row.length === 1 ? "outlined-arrow-add-right" : "outlined-arrow-swap"}
                                    alt={row.length === 1 ? "오른쪽에 블록 추가" : "내용 스왑"}
                                    className={row.length === 1 ? "" : "tablet:rotate-0 mobile:rotate-90"}
                                />
                            </UI.Button>
                        </section>
                    </Fragment>
                ))}
            </section>
        </Reorder.Item>
    );
};

const Block = ({
    block,
    rowIndex,
    blockIndex,
    last,
    blockCount,
}: {
    block: SectionContent;
    rowIndex: number;
    blockIndex: number;
    last: boolean;
    blockCount: number;
}) => {
    const { selectedPosition, updateBlock, deleteBlock, copyBlock, pasteBlock, selectBlock, unSelectBlock } =
        useBlockStore();
    const { setToast } = useToastStore();
    const addFromFile = usePostDraftImageStore((state) => state.addFromFile);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string>(block.imageUrl ?? "/");
    const textContent = blockContentToHtml(block.content);
    const containerRef = useRef<HTMLDivElement>(null);

    const columnClassName = `flex flex-col gap-[1.6rem] h-full group/block ${block.type !== 0 ? "rounded-[2.4rem] overflow-hidden" : ""} ${block.type === 1 || block.type === 2 ? "" : ""} ${blockCount === 1 && block.type !== 0 ? "col-span-2" : blockCount > 1 && block.type !== 0 ? "min-h-[36.0rem]" : ""}`;

    const handleImageFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setToast({ msg: "이미지 파일만 추가할 수 있어요", time: 2 });
            return;
        }

        const id = addFromFile(file);
        if (!id) return;

        const previewUrl = usePostDraftImageStore.getState().images.find((image) => image.id === id)?.previewUrl;

        if (previewUrl) {
            setCurrentImageUrl(previewUrl);
            updateBlock(rowIndex, blockIndex, { imageUrl: previewUrl });
        }
    };

    const isSelected = selectedPosition?.rowIndex === rowIndex && selectedPosition?.blockIndex === blockIndex;

    useEffect(() => {
        setCurrentImageUrl(block.imageUrl ?? "/");
    }, [block.imageUrl]);

    return (
        <motion.div
            ref={containerRef}
            tabIndex={0}
            className={`${columnClassName} relative outline-none ring-offset-2 ${isSelected ? "ring-2 ring-[var(--color-brand-500)] rounded-[2.4rem]" : "hover:ring-1 hover:ring-[var(--color-gray-300)] rounded-[2.4rem]"}`}
            onClick={() => {
                selectBlock(rowIndex, blockIndex);
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
                const target = e.target as HTMLElement;

                if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
                    return;
                }

                if (e.key === "Escape") {
                    e.preventDefault();
                    unSelectBlock();
                    setToast({ msg: "선택 해제 되었어요", time: 2 });
                }

                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
                    e.preventDefault();
                    copyBlock(rowIndex, blockIndex);
                    setToast({ msg: "복사가 완료됐어요!", time: 2 });
                }

                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
                    e.preventDefault();
                    pasteBlock();
                    setToast({ msg: "복사한 col을 붙여넣었어요", time: 2 });
                }
            }}
        >
            {last ? (
                <UI.Button
                    onClick={() => deleteBlock(rowIndex, blockIndex)}
                    className="absolute top-[0.8rem] right-[0.8rem] z-10 p-[0.8rem] rounded-full bg-white shadow-[var(--shadow-normal)] opacity-0 group-hover/block:opacity-100 transition-opacity"
                >
                    <IconComponent type="outlined-cross" alt="닫기" />
                </UI.Button>
            ) : null}

            <section className="relative flex flex-col gap-[1.6rem] h-full">
                {block.type === 0 ? (
                    <section className="w-full min-h-[12rem]">
                        <TipTap.Normal
                            content={textContent}
                            onChange={(html) => updateBlock(rowIndex, blockIndex, { content: html })}
                        />
                    </section>
                ) : null}

                {block.type === 1 ? (
                    <div className="relative">
                        <img
                            src={
                                block.imageUrl !== ""
                                    ? block.imageUrl
                                    : "https://dummyimage.com/200x200/ededed/000000&text=placeholder"
                            }
                            alt=""
                            className={`w-full ${blockCount === 1 ? "" : "h-full object-cover"}`}
                        />
                        <UI.Button
                            onClick={() => imageInputRef.current?.click()}
                            className="p-[1.2rem] bg-[white] hover:bg-[var(--color-brand-500)] transition-all backdrop-blur-sm rounded-[1.6rem] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] shadow-[var(--shadow-normal)] font-semibold opacity-0 group-hover/block:opacity-100"
                        >
                            이미지 선택
                        </UI.Button>
                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageFile(file);
                                e.target.value = "";
                            }}
                        />
                    </div>
                ) : null}

                {block.type === 2 ? (
                    <TipTap.Code
                        content={block.content as string}
                        onChange={(html) => updateBlock(rowIndex, blockIndex, { content: html })}
                    />
                ) : null}
            </section>
        </motion.div>
    );
};

export default SortableBlock;
