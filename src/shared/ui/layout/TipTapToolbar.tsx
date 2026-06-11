"use client";

import { useRef } from "react";
import type { Editor } from "@tiptap/react";

import {
    applyHeading,
    FONT_SIZES,
    getActiveHeading,
    LINE_HEIGHTS,
    ToolbarDivider,
    ToolbarIconButton,
    ToolbarSelect,
    useTipTapToolbarState,
    type HeadingValue,
} from "@/shared/ui/layout/tipTapToolbarShared";
import { usePostDraftImageStore } from "@/shared/stores/usePostDraftImageStore";

type TipTapToolbarProps = {
    editor: Editor;
};

const HEADING_OPTIONS = [
    { label: "본문", value: "paragraph" },
    { label: "H1", value: "h1" },
    { label: "H2", value: "h2" },
    { label: "H3", value: "h3" },
] as const;

const TipTapToolbar = ({ editor }: TipTapToolbarProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const addFromFile = usePostDraftImageStore((state) => state.addFromFile);
    const state = useTipTapToolbarState(editor);
    const activeHeading = getActiveHeading(state);

    const handleImageInsert = (file: File) => {
        const id = addFromFile(file);
        if (!id) return;

        const previewUrl = usePostDraftImageStore.getState().images.find((image) => image.id === id)?.previewUrl;

        if (previewUrl) {
            editor.chain().focus().setImage({ src: previewUrl }).run();
        }
    };

    return (
        <div className="relative mb-[0.8rem] rounded-[1.6rem] bg-white shadow-[var(--shadow-normal)] border border-[var(--color-gray-200)]">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-[2.4rem] rounded-l-[1.6rem] bg-gradient-to-r from-white to-transparent z-[1]" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[2.4rem] rounded-r-[1.6rem] bg-gradient-to-l from-white to-transparent z-[1]" />

            <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <section className="flex flex-nowrap items-center gap-[0.2rem] p-[0.4rem] min-w-min">
                    <ToolbarIconButton
                        label="굵게"
                        title="굵게"
                        active={state.isBold}
                        disabled={!state.canBold}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <span className="font-bold">B</span>
                    </ToolbarIconButton>
                    <ToolbarIconButton
                        label="기울임"
                        title="기울임"
                        active={state.isItalic}
                        disabled={!state.canItalic}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <span className="italic font-serif">I</span>
                    </ToolbarIconButton>
                    <ToolbarIconButton
                        label="밑줄"
                        title="밑줄"
                        active={state.isUnderline}
                        disabled={!state.canUnderline}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        <span className="underline">U</span>
                    </ToolbarIconButton>
                    <ToolbarIconButton
                        label="취소선"
                        title="취소선"
                        active={state.isStrike}
                        disabled={!state.canStrike}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                    >
                        <span className="line-through">S</span>
                    </ToolbarIconButton>
                    <ToolbarIconButton
                        label="인라인 코드"
                        title="인라인 코드"
                        active={state.isCode}
                        disabled={!state.canCode}
                        onClick={() => editor.chain().focus().toggleCode().run()}
                    >
                        <span className="font-mono text-[1.2rem]">{`</>`}</span>
                    </ToolbarIconButton>
                    <ToolbarIconButton
                        label="형광펜"
                        title="형광펜"
                        active={state.isHighlight}
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                    >
                        <span className="bg-[#fff59d] text-[var(--color-gray-1000)] px-[0.4rem] rounded-[0.4rem]">H</span>
                    </ToolbarIconButton>

                    <ToolbarDivider />

                    <ToolbarSelect
                        label="제목 스타일"
                        value={activeHeading}
                        options={HEADING_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}
                        onChange={(value) => applyHeading(editor, value as HeadingValue)}
                    />

                    <ToolbarDivider />

                    <ToolbarIconButton
                        label="글머리 목록"
                        title="글머리 목록"
                        active={state.isBulletList}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        <span>•</span>
                    </ToolbarIconButton>
                    <ToolbarIconButton
                        label="번호 목록"
                        title="번호 목록"
                        active={state.isOrderedList}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        <span className="text-[1.2rem]">1.</span>
                    </ToolbarIconButton>
                    <ToolbarIconButton
                        label="코드 블록"
                        title="코드 블록"
                        active={state.isCodeBlock}
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    >
                        <span className="font-mono text-[1.1rem]">{`{ }`}</span>
                    </ToolbarIconButton>
                    <ToolbarIconButton
                        label="인용문"
                        title="인용문"
                        active={state.isBlockquote}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    >
                        <span className="text-[1.6rem] leading-none">&quot;</span>
                    </ToolbarIconButton>
                    <ToolbarIconButton
                        label="이미지"
                        title="이미지 삽입"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <span className="text-[1.2rem]">IMG</span>
                    </ToolbarIconButton>

                    <ToolbarDivider />

                    <ToolbarSelect
                        label="글자 크기"
                        value="16"
                        options={FONT_SIZES.map((size) => ({
                            label: `${size}px`,
                            value: String(size),
                        }))}
                        onChange={(value) =>
                            editor.chain().focus().setMark("textStyle", { fontSize: `${value}px` }).run()
                        }
                    />
                    <ToolbarSelect
                        label="줄간격"
                        value="1.5"
                        options={LINE_HEIGHTS.map((lh) => ({
                            label: lh,
                            value: lh,
                        }))}
                        onChange={(value) => editor.chain().focus().setMark("textStyle", { lineHeight: value }).run()}
                    />

                    <ToolbarDivider />

                    <ToolbarIconButton
                        label="실행 취소"
                        title="실행 취소"
                        disabled={!state.canUndo}
                        onClick={() => editor.chain().focus().undo().run()}
                    >
                        <span className="text-[1.6rem] leading-none">↩</span>
                    </ToolbarIconButton>
                    <ToolbarIconButton
                        label="다시 실행"
                        title="다시 실행"
                        disabled={!state.canRedo}
                        onClick={() => editor.chain().focus().redo().run()}
                    >
                        <span className="text-[1.6rem] leading-none">↪</span>
                    </ToolbarIconButton>
                </section>
            </div>

            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageInsert(file);
                    e.target.value = "";
                }}
            />
        </div>
    );
};

export default TipTapToolbar;
