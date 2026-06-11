"use client";

import { useCreatePostStore } from "@/shared/stores/useCreatePostStore";
import { usePostDraftImageStore } from "@/shared/stores/usePostDraftImageStore";

const PostAttachedImageList = () => {
    const { images } = usePostDraftImageStore();
    const { thumbnail, setThumbnail } = useCreatePostStore();

    if (images.length === 0) return null;

    return (
        <section className="flex flex-col gap-[1.2rem] w-full pt-[2.4rem] border-t border-[var(--color-gray-200)]">
            <div className="flex items-center justify-between gap-[1.2rem]">
                <p className="text-[1.4rem] font-semibold text-[var(--color-gray-1000)]">첨부 이미지</p>
                <p className="text-[1.2rem] text-[var(--color-gray-500)]">선택 시 썸네일로 지정 · 저장 시 업로드</p>
            </div>

            <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <section className="flex flex-nowrap items-center gap-[1.2rem] pb-[0.4rem]">
                    {images.map((image) => {
                        const isThumbnail = thumbnail === image.previewUrl;

                        return (
                            <button
                                key={image.id}
                                type="button"
                                title={isThumbnail ? "현재 썸네일" : "썸네일로 지정"}
                                onClick={() => setThumbnail(image.previewUrl)}
                                className={`relative shrink-0 w-[10rem] h-[10rem] rounded-[1.6rem] overflow-hidden border-2 transition-colors ${
                                    isThumbnail
                                        ? "border-[var(--color-blue-500)] shadow-[var(--shadow-normal)]"
                                        : "border-[var(--color-gray-200)] hover:border-[var(--color-brand-500)]"
                                }`}
                            >
                                <img src={image.previewUrl} alt={image.name} className="object-cover w-full h-full" />
                                {isThumbnail ? (
                                    <span className="absolute bottom-[0.6rem] left-[0.6rem] px-[0.8rem] py-[0.2rem] rounded-full bg-[var(--color-blue-500)] text-white text-[1rem] font-semibold">
                                        썸네일
                                    </span>
                                ) : null}
                            </button>
                        );
                    })}
                </section>
            </div>
        </section>
    );
};

export default PostAttachedImageList;
