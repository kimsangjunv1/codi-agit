"use client";

import { useMemo, useState } from "react";

import { useGetPostImageInventoryOnManagerQuery } from "@/entities/post-image/api/postImage.query";
import type { PostImageInventoryItem } from "@/shared/lib/image/postImageInventory";
import { formatBytes } from "@/shared/lib/image/postImageInventory";
import { useModalStore } from "@/shared/stores/useModalStore";
import UI from "@/shared/ui/common/UIComponent";
import { useDeleteUnusedPostImagesWithToast } from "@/widgets/manager/image/hooks/useImageMutations";
import ManagerListError from "@/widgets/manager/ui/ManagerListError";
import ManagerListSkeleton from "@/widgets/manager/ui/ManagerListSkeleton";
import ManagerPageShell from "@/widgets/manager/ui/ManagerPageShell";

type FilterType = "all" | "used" | "unused";

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
    { value: "all", label: "전체" },
    { value: "used", label: "사용중" },
    { value: "unused", label: "미사용" },
];

const filterItems = (items: PostImageInventoryItem[], filter: FilterType) => {
    if (filter === "used") return items.filter((item) => item.isUsed);
    if (filter === "unused") return items.filter((item) => !item.isUsed);
    return items;
};

const ImageManager = () => {
    const [filter, setFilter] = useState<FilterType>("all");
    const { setModal } = useModalStore();
    const { data, isLoading, isError, error, refetch } = useGetPostImageInventoryOnManagerQuery();
    const { mutate: optimizeImages, isPending } = useDeleteUnusedPostImagesWithToast();

    const inventory = data?.result;
    const summary = inventory?.summary;
    const items = inventory?.items ?? [];

    const filteredItems = useMemo(() => filterItems(items, filter), [items, filter]);

    const openOptimizeModal = () => {
        if (!summary) return;

        setModal({
            type: "CHECK",
            title: "미사용 이미지를 정리할까요?",
            content: (
                <article className="flex flex-col gap-[1.2rem]">
                    <p className="text-[var(--color-gray-600)]">
                        미사용 이미지 {summary.unusedCount}개 ({formatBytes(summary.unusedSizeBytes)})를
                        스토리지에서 삭제합니다.
                    </p>
                    <p className="text-[1.2rem] text-[var(--color-gray-500)]">
                        게시물에 연결된 이미지는 삭제되지 않습니다.
                    </p>
                </article>
            ),
            cancel: { text: "취소" },
            confirm: {
                text: "최적화",
                onClick: () => optimizeImages(),
            },
            isOpen: true,
        });
    };

    return (
        <ManagerPageShell
            title="이미지 관리"
            description="업로드된 게시물 이미지의 사용 여부와 용량을 확인하고 미사용 파일을 정리합니다."
            action={
                <UI.Button
                    type="button"
                    disabled={!summary || summary.unusedCount === 0 || isPending}
                    onClick={openOptimizeModal}
                    className="shrink-0 bg-[var(--color-brand-500)] text-white rounded-[0.8rem] px-[1.6rem] py-[0.8rem] text-[1.4rem] font-medium disabled:opacity-50"
                >
                    {isPending ? "정리 중..." : "최적화"}
                </UI.Button>
            }
        >
            {isLoading ? (
                <ManagerListSkeleton />
            ) : isError || data?.resultCode === "ERROR" ? (
                <ManagerListError
                    message={isError ? error?.message : data?.resultMessage}
                    onRetry={() => refetch()}
                />
            ) : !summary ? (
                <UI.Empty title="이미지 정보를 불러오지 못했습니다" className="opacity-100" />
            ) : (
                <>
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-[1.2rem] w-full">
                        <SummaryCard label="전체" count={summary.totalCount} size={summary.totalSizeBytes} />
                        <SummaryCard label="사용중" count={summary.usedCount} size={summary.usedSizeBytes} />
                        <SummaryCard label="미사용" count={summary.unusedCount} size={summary.unusedSizeBytes} />
                    </section>

                    <div className="flex gap-[0.8rem] overflow-x-auto pb-[0.4rem]">
                        {FILTER_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setFilter(option.value)}
                                className={`shrink-0 text-[1.3rem] px-[1.2rem] py-[0.6rem] rounded-full font-medium transition-colors ${
                                    filter === option.value
                                        ? "bg-[var(--color-brand-500)] text-white"
                                        : "bg-white text-[var(--color-gray-700)] shadow-[var(--shadow-normal)]"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {filteredItems.length === 0 ? (
                        <UI.Empty title="표시할 이미지가 없습니다" className="opacity-100" />
                    ) : (
                        <section className="flex flex-col w-full gap-[1.2rem]">
                            {filteredItems.map((item) => (
                                <ImageRow key={item.path} item={item} />
                            ))}
                        </section>
                    )}
                </>
            )}
        </ManagerPageShell>
    );
};

function SummaryCard({ label, count, size }: { label: string; count: number; size: number }) {
    return (
        <article className="bg-white rounded-[1.2rem] shadow-[var(--shadow-normal)] p-[1.6rem] flex flex-col gap-[0.4rem]">
            <p className="text-[1.3rem] text-[var(--color-gray-600)]">{label}</p>
            <p className="text-[2rem] font-bold">{count}개</p>
            <p className="text-[1.3rem] text-[var(--color-gray-500)]">{formatBytes(size)}</p>
        </article>
    );
}

function ImageRow({ item }: { item: PostImageInventoryItem }) {
    const fileName = item.path.split("/").pop() ?? item.path;

    return (
        <article className="flex flex-col sm:flex-row sm:items-center gap-[1.2rem] bg-white rounded-[1.2rem] shadow-[var(--shadow-normal)] p-[1.6rem]">
            <div className="shrink-0 w-[8rem] h-[8rem] rounded-[0.8rem] overflow-hidden bg-[var(--color-gray-100)]">
                <img src={item.url} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>

            <div className="flex-1 flex flex-col gap-[0.4rem] min-w-0">
                <div className="flex flex-wrap items-center gap-[0.8rem]">
                    <p className="text-[1.5rem] font-bold truncate">{fileName}</p>
                    <span
                        className={`text-[1.2rem] px-[0.8rem] py-[0.2rem] rounded-full font-medium ${
                            item.isUsed
                                ? "bg-[var(--color-brand-100)] text-[var(--color-brand-600)]"
                                : "bg-[var(--color-gray-100)] text-[var(--color-gray-600)]"
                        }`}
                    >
                        {item.isUsed ? "사용중" : "미사용"}
                    </span>
                </div>
                <p className="text-[1.3rem] text-[var(--color-gray-600)]">{formatBytes(item.sizeBytes)}</p>
                {item.referencedBy.length > 0 ? (
                    <p className="text-[1.2rem] text-[var(--color-gray-500)]">
                        참조 게시물: {item.referencedBy.join(", ")}
                    </p>
                ) : null}
            </div>
        </article>
    );
}

export default ImageManager;
