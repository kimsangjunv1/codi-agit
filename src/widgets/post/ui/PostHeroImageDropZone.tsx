"use client";

import { useId, useRef, useState } from "react";

import { usePostDraftImageStore } from "@/shared/stores/usePostDraftImageStore";
import { useToastStore } from "@/shared/stores/useToastStore";

type PostHeroImageDropZoneProps = {
    onImageSelected: (previewUrl: string) => void;
};

const PostHeroImageDropZone = ({ onImageSelected }: PostHeroImageDropZoneProps) => {
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const { setToast } = useToastStore();
    const addFromFile = usePostDraftImageStore((state) => state.addFromFile);

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setToast({ msg: "이미지 파일만 추가할 수 있어요", time: 2 });
            return;
        }

        const id = addFromFile(file);
        if (!id) return;

        const previewUrl = usePostDraftImageStore.getState().images.find((image) => image.id === id)?.previewUrl;

        if (previewUrl) {
            onImageSelected(previewUrl);
            setToast({ msg: "썸네일 이미지를 추가했어요", time: 2 });
        }
    };

    const openFilePicker = () => {
        inputRef.current?.click();
    };

    return (
        <>
            <section
                className={`absolute inset-0 z-[5] rounded-[2.4rem] transition-colors ${
                    isDragging ? "bg-[#00000040] ring-2 ring-white/60" : "bg-transparent"
                }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);

                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFile(file);
                }}
                onClick={openFilePicker}
            />

            <label
                htmlFor={inputId}
                className="absolute top-[2.4rem] right-[2.4rem] z-[6] cursor-pointer px-[1.2rem] py-[0.8rem] bg-[#00000060] hover:bg-[var(--color-brand-500)] backdrop-blur-sm rounded-[1.6rem] text-white text-[1.3rem] font-semibold transition-colors"
            >
                클릭 또는 드래그로 썸네일 추가
            </label>

            <input
                id={inputId}
                ref={inputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = "";
                }}
            />
        </>
    );
};

export default PostHeroImageDropZone;
