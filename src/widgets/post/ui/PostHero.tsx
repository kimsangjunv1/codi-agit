"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import UI from "@/shared/ui/common/UIComponent";
import TextShimmer from "@/shared/ui/common/TextShimmerComponent";
import PostHeroImageDropZone from "@/widgets/post/ui/PostHeroImageDropZone";

import { util } from "@/shared/lib/util";
import { useGetCategoryListQuery } from "@/entities/category/api/category.query";

type PostHeroViewProps = {
    mode: "view";
    imageUrl: string;
    title: string;
    summary: string;
    createDate: string;
    viewCount: number;
    likeCount: number;
};

type PostHeroEditProps = {
    mode: "edit";
    imageUrl: string;
    title: string;
    summary: string;
    categoryIdx: number;
    editLabel?: string;
    onTitleChange: (value: string) => void;
    onSummaryChange: (value: string) => void;
    onThumbnailChange: (value: string) => void;
    onCategoryChange: (value: number) => void;
};

type PostHeroProps = PostHeroViewProps | PostHeroEditProps;

const PostHero = (props: PostHeroProps) => {
    const [initGlow, setInitGlow] = useState(false);
    const heroImageSrc = props.imageUrl || undefined;

    return (
        <motion.article
            className="relative flex flex-col items-end justify-end gap-[1.6rem] w-full h-full rounded-[calc(1.6rem*3)] overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
        >
            <section className={`flex flex-col items-start justify-end gap-[2.4rem] h-full w-full max-w-[var(--size-tablet)] px-[1.2rem] py-[7.2rem] z-[100] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] ${props.mode === "edit" ? "pointer-events-none" : ""}`}>
                {props.mode === "edit" ? (
                    <PostHeroEditContent {...props} />
                ) : (
                    <PostHeroViewContent {...props} />
                )}
            </section>

            <div className="absolute top-0 left-[50%] transform translate-x-[-50%] w-full h-full bg-[linear-gradient(0deg,_#000,_#00000000)] z-[1] rounded-[2.4rem] pointer-events-none" />

            {!initGlow ? (
                <motion.div
                    className="absolute inset-0 z-[1000] pointer-events-none blur-[10px]"
                    initial={{ scale: 0.8, opacity: 0.35 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    onAnimationComplete={() => setInitGlow(true)}
                    style={{
                        background: `
                            radial-gradient(
                                circle at 50% 50%,
                                rgba(255, 255, 255, 0.25) 0%,
                                rgba(173, 216, 230, 0.35) 25%,
                                rgba(144, 238, 255, 0.4) 40%,
                                rgba(255, 182, 193, 0.35) 60%,
                                rgba(255, 255, 255, 0.15) 80%,
                                transparent 100%
                            )
                        `,
                        borderRadius: "50%",
                        transformOrigin: "center",
                    }}
                />
            ) : null}

            <div className="absolute inset-0 rounded-[2.4rem] overflow-hidden z-0">
                {heroImageSrc ? (
                    <img
                        src={heroImageSrc}
                        alt=""
                        className="object-cover object-center w-full h-full aspect-auto pointer-events-none"
                    />
                ) : (
                    <div className="w-full h-full bg-[var(--color-gray-200)] pointer-events-none" aria-hidden />
                )}
            </div>

            {props.mode === "edit" ? (
                <PostHeroImageDropZone onImageSelected={props.onThumbnailChange} />
            ) : null}
        </motion.article>
    );
};

const PostHeroViewContent = ({ title, summary, createDate, viewCount, likeCount }: PostHeroViewProps) => (
    <>
        <section className="flex flex-col gap-[1.2rem] pointer-events-none">
            <TextShimmer
                as="h2"
                duration={2}
                color={{
                    start: "#ffffff90",
                    end: "var(--color-gray-1000)",
                }}
                className="font-bold tablet:text-[2.0rem] mobile:text-[1.4rem]"
            >
                {title}
            </TextShimmer>
            <h2 className="font-extrabold text-left tablet:text-[3.2rem] mobile:text-[2.0rem] text-white leading-[1.5] whitespace-break-spaces">
                &quot;{summary}&quot;
            </h2>
        </section>

        <section className="flex items-end flex-wrap gap-[1.6rem] pointer-events-none">
            <div className="relative rounded-[2.4rem] w-[9.2rem] h-[9.2rem] shadow-[var(--shadow-normal)]">
                <img
                    src="/images/picture/profile.png"
                    alt="프로필"
                    className="object-cover rounded-[2.4rem] w-[9.2rem] h-[9.2rem] shadow-[var(--shadow-normal)]"
                />
            </div>

            <section className="flex flex-col items-start gap-[1.2rem]">
                <section className="flex gap-[0.8rem]">
                    <p className="font-bold text-[2.0rem] text-white">김상준</p>
                    <p className="text-[2.0rem] font-semibold text-[#ffffff90]">FRONT END DEVELOPER</p>
                </section>

                <p className="font-semibold text-[2.0rem] text-white ">
                    {util.string.getCurrentTime(createDate, 4)} ・ {viewCount} view ・ {likeCount} likes
                </p>
            </section>
        </section>
    </>
);

const PostHeroEditableField = ({
    value,
    placeholder,
    className,
    onChange,
}: {
    value: string;
    placeholder: string;
    className: string;
    onChange: (value: string) => void;
}) => {
    const ref = useRef<HTMLHeadingElement>(null);
    const lastExternalValue = useRef(value);

    useEffect(() => {
        if (value === lastExternalValue.current) return;

        lastExternalValue.current = value;

        if (ref.current && document.activeElement !== ref.current) {
            ref.current.textContent = value;
        }
    }, [value]);

    return (
        <h2
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            data-placeholder={placeholder}
            className={`${className} empty:before:content-[attr(data-placeholder)] empty:before:text-[#ffffff60] empty:before:pointer-events-none`}
            onInput={(e) => {
                const text = e.currentTarget.textContent ?? "";
                lastExternalValue.current = text;
                onChange(text);
            }}
        />
    );
};

const PostHeroEditContent = ({
    title,
    summary,
    categoryIdx,
    editLabel = "작성 중",
    onTitleChange,
    onSummaryChange,
    onCategoryChange,
}: PostHeroEditProps) => {
    const { data: getCategoryListData } = useGetCategoryListQuery();
    const enabledCategories = getCategoryListData?.result?.filter((e) => e.is_enabled) ?? [];
    const selectedCategory = enabledCategories.find((e) => e.idx === categoryIdx);

    return (
        <>
            <section className="flex flex-col gap-[1.2rem] w-full pointer-events-auto">
                <UI.Select
                    trackingData={selectedCategory?.title ?? ""}
                    defaultValue={selectedCategory?.idx}
                    list={enabledCategories.map((e) => ({
                        title: e.title,
                        value: e.idx,
                    }))}
                    onChange={onCategoryChange}
                    className={{
                        container: "px-0 w-fit",
                        button: "bg-[#ffffff20] backdrop-blur-sm px-[1.2rem] min-w-[5.2rem] text-white border border-[#ffffff30]",
                    }}
                />

                <PostHeroEditableField
                    value={title}
                    placeholder="제목을 입력해주세요"
                    className="h-auto p-0 font-bold tablet:text-[2.0rem] mobile:text-[1.4rem] text-white leading-[1.5] outline-none focus:ring-2 focus:ring-[#ffffff40] rounded-[0.8rem]"
                    onChange={onTitleChange}
                />

                <PostHeroEditableField
                    value={summary}
                    placeholder="요약을 입력해주세요"
                    className="h-auto p-0 font-extrabold text-left tablet:text-[3.2rem] mobile:text-[2.0rem] text-white leading-[1.5] whitespace-break-spaces outline-none focus:ring-2 focus:ring-[#ffffff40] rounded-[0.8rem]"
                    onChange={onSummaryChange}
                />
            </section>

            <section className="flex items-end flex-wrap gap-[1.6rem] pointer-events-none">
                <div className="relative rounded-[2.4rem] w-[9.2rem] h-[9.2rem] shadow-[var(--shadow-normal)]">
                    <img
                        src="/images/picture/profile.png"
                        alt="프로필"
                        className="object-cover rounded-[2.4rem] w-[9.2rem] h-[9.2rem] shadow-[var(--shadow-normal)]"
                    />
                </div>

                <section className="flex flex-col items-start gap-[1.2rem]">
                    <section className="flex gap-[0.8rem] flex-wrap">
                        <p className="font-bold text-[2.0rem] text-white">김상준</p>
                        <p className="text-[2.0rem] font-semibold text-[#ffffff90]">FRONT END DEVELOPER</p>
                    </section>
                    <p className="font-semibold text-[2.0rem] text-[#ffffff90]">{editLabel}</p>
                </section>
            </section>
        </>
    );
};

export default PostHero;
