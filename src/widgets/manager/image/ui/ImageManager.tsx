"use client";

import { useMemo, useState } from "react";

import { useGetPostImageInventoryOnManagerQuery } from "@/entities/post-image/api/postImage.query";
import type { PostImageInventoryItem } from "@/shared/lib/image/postImageInventory";
import { formatBytes } from "@/shared/lib/image/postImageInventory";
import { useModalStore } from "@/shared/stores/useModalStore";
import UI from "@/shared/ui/common/UIComponent";
import { useDeleteUnusedPostImagesWithToast } from "@/widgets/manager/image/hooks/useImageMutations";
import ImageDetail from "@/widgets/manager/image/ui/ImageDetail";
import ImageListItem from "@/widgets/manager/image/ui/ImageListItem";
import ManagerDetailPane from "@/widgets/manager/ui/ManagerDetailPane";
import ManagerEmptyState from "@/widgets/manager/ui/ManagerEmptyState";
import ManagerListPane from "@/widgets/manager/ui/ManagerListPane";
import ManagerListError from "@/widgets/manager/ui/ManagerListError";
import ManagerListSkeleton from "@/widgets/manager/ui/ManagerListSkeleton";
import ManagerListPaneHeader from "@/widgets/manager/ui/ManagerListPaneHeader";
import useManagerSelection from "@/widgets/manager/ui/useManagerSelection";

type FilterType = "all" | "used" | "unused";

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
    { value: "all", label: "전체" },
    { value: "used", label: "사용중" },
    { value: "unused", label: "미사용" },
];

const EMPTY_ITEMS: PostImageInventoryItem[] = [];

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
    const { selectedItem, setSelectedItem } = useManagerSelection();

    const inventory = data?.result;
    const summary = inventory?.summary;
    const items = inventory?.items ?? EMPTY_ITEMS;

    const filteredItems = useMemo(() => filterItems(items, filter), [items, filter]);
    const selectedImage = items.find((item) => item.path === selectedItem);

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
        <div className="contents">
            <ManagerListPane>
                <ManagerListPaneHeader
                    title="이미지 관리"
                    count={filteredItems.length}
                    description="게시물 이미지의 사용 현황과 용량을 확인합니다."
                    action={
                        <UI.Button
                            type="button"
                            disabled={!summary || summary.unusedCount === 0 || isPending}
                            onClick={openOptimizeModal}
                            className="shrink-0 rounded-[0.6rem] bg-[var(--color-brand-500)] px-[1.2rem] py-[0.7rem] text-[1.2rem] font-semibold text-white disabled:opacity-50"
                        >
                            {isPending ? "정리 중..." : "최적화"}
                        </UI.Button>
                    }
                    filter={
                        <div className="flex flex-col gap-[1.2rem]">
                            {summary && (
                                <section className="grid grid-cols-3 gap-[0.8rem]">
                                    <SummaryCard label="전체" count={summary.totalCount} size={summary.totalSizeBytes} />
                                    <SummaryCard label="사용중" count={summary.usedCount} size={summary.usedSizeBytes} />
                                    <SummaryCard label="미사용" count={summary.unusedCount} size={summary.unusedSizeBytes} />
                                </section>
                            )}
                            <div className="flex gap-[0.6rem]">
                                {FILTER_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setFilter(option.value)}
                                        className={`rounded-full px-[1rem] py-[0.5rem] text-[1.1rem] font-semibold transition-colors ${
                                            filter === option.value
                                                ? "bg-[var(--color-gray-900)] text-white"
                                                : "border border-[var(--color-gray-300)] bg-white text-[var(--color-gray-600)]"
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    }
                />

                <div className="p-[1.2rem]">
                    {isLoading ? (
                        <ManagerListSkeleton count={5} />
                    ) : isError || data?.resultCode === "ERROR" ? (
                        <ManagerListError
                            message={isError ? error?.message : data?.resultMessage}
                            onRetry={() => refetch()}
                        />
                    ) : !summary ? (
                        <ManagerEmptyState
                            variant="no-list"
                            title="이미지 정보를 불러오지 못했습니다"
                            description="잠시 후 다시 시도해주세요."
                        />
                    ) : filteredItems.length === 0 ? (
                        <ManagerEmptyState
                            variant="no-list"
                            title={items.length === 0 ? "업로드된 이미지가 없습니다" : "표시할 이미지가 없습니다"}
                        />
                    ) : (
                        <section className="flex flex-col gap-[0.8rem]">
                            {filteredItems.map((item) => (
                                <ImageListItem
                                    key={item.path}
                                    item={item}
                                    isSelected={selectedItem === item.path}
                                    onClick={() => setSelectedItem(item.path)}
                                />
                            ))}
                        </section>
                    )}
                </div>
            </ManagerListPane>

            <ManagerDetailPane>
                {selectedImage ? (
                    <ImageDetail item={selectedImage} />
                ) : (
                    <ManagerEmptyState variant="no-item" />
                )}
            </ManagerDetailPane>
        </div>
    );
};

function SummaryCard({ label, count, size }: { label: string; count: number; size: number }) {
    return (
        <article className="border-l-2 border-[var(--color-gray-300)] pl-[0.8rem]">
            <p className="text-[1rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-gray-500)]">{label}</p>
            <p className="mt-[0.3rem] text-[1.4rem] font-bold text-[var(--color-gray-900)]">{count}개</p>
            <p className="mt-[0.2rem] text-[1rem] text-[var(--color-gray-500)]">{formatBytes(size)}</p>
        </article>
    );
}

export default ImageManager;
