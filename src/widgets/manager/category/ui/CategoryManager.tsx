"use client";

import { useRef } from "react";

import { useGetCategoryListOnManagerQuery } from "@/entities/category/api/category.query";
import type { CategoryItemManager, PatchCategoryPayload, SetCategoryPayload } from "@/entities/category/model/category.type";
import { util } from "@/shared/lib/util";
import { useModalStore } from "@/shared/stores/useModalStore";
import { useToastStore } from "@/shared/stores/useToastStore";
import UI from "@/shared/ui/common/UIComponent";
import ModalContent from "@/shared/ui/common/ModalComponent";
import {
    useDeleteCategoryWithToast,
    usePatchCategoryWithToast,
    useSetCategoryWithToast,
} from "@/widgets/manager/category/hooks/useCategoryMutations";
import ManagerDetailMetaGrid from "@/widgets/manager/ui/ManagerDetailMetaGrid";
import ManagerDetailPane from "@/widgets/manager/ui/ManagerDetailPane";
import ManagerDetailPaneHeader from "@/widgets/manager/ui/ManagerDetailPaneHeader";
import ManagerEmptyState from "@/widgets/manager/ui/ManagerEmptyState";
import ManagerListError from "@/widgets/manager/ui/ManagerListError";
import ManagerListItemCard from "@/widgets/manager/ui/ManagerListItemCard";
import ManagerListPane from "@/widgets/manager/ui/ManagerListPane";
import ManagerListPaneHeader from "@/widgets/manager/ui/ManagerListPaneHeader";
import ManagerListSkeleton from "@/widgets/manager/ui/ManagerListSkeleton";
import useManagerSelection from "@/widgets/manager/ui/useManagerSelection";

const CategoryManager = () => {
    const categoryCreateValueRef = useRef<SetCategoryPayload>({ title: "", description: "" });
    const categoryPatchValueRef = useRef<PatchCategoryPayload>({ idx: 0, title: "", is_enabled: true, description: "" });
    const { data, isLoading, isError, error, refetch } = useGetCategoryListOnManagerQuery();
    const { mutate: createCategory } = useSetCategoryWithToast();
    const { mutate: patchCategory } = usePatchCategoryWithToast();
    const { mutate: deleteCategory } = useDeleteCategoryWithToast();
    const { setToast } = useToastStore();
    const { setModal } = useModalStore();
    const { selectedItem, setSelectedItem } = useManagerSelection();
    const list = data?.result ?? [];
    const selectedCategory = list.find((item) => String(item.idx) === selectedItem);

    const createCategoryModal = () =>
        setModal({
            type: "CHECK",
            title: "카테고리 생성",
            content: <ModalContent.Post.AddCategory onChange={(value) => (categoryCreateValueRef.current = value)} />,
            cancel: { text: "닫기" },
            confirm: {
                text: "확인",
                onClick: () => {
                    if (!categoryCreateValueRef.current.title || !categoryCreateValueRef.current.description) {
                        setToast({ msg: "카테고리 이름과 설명을 입력해주세요", time: 2 });
                        return false;
                    }
                    createCategory(categoryCreateValueRef.current);
                    categoryCreateValueRef.current = { title: "", description: "" };
                },
            },
            isOpen: true,
        });

    const modifyCategoryModal = (item: CategoryItemManager) =>
        setModal({
            type: "CHECK",
            title: "카테고리 수정",
            content: <ModalContent.Post.ModifyCategory info={item} onChange={(value) => (categoryPatchValueRef.current = value)} />,
            cancel: { text: "닫기" },
            confirm: {
                text: "확인",
                onClick: () => {
                    if (!categoryPatchValueRef.current.title || !categoryPatchValueRef.current.description) {
                        setToast({ msg: "카테고리 이름과 설명을 입력해주세요", time: 2 });
                        return false;
                    }
                    patchCategory(categoryPatchValueRef.current);
                },
            },
            isOpen: true,
        });

    const deleteCategoryModal = (item: CategoryItemManager) =>
        setModal({
            type: "CHECK",
            title: "카테고리를 삭제할까요?",
            content: <p className="text-[var(--color-gray-600)]">삭제 대상: {item.title}</p>,
            cancel: { text: "취소" },
            confirm: { text: "삭제하기", onClick: () => deleteCategory({ idx: item.idx }) },
            isOpen: true,
        });

    return (
        <div className="contents">
            <ManagerListPane>
                <ManagerListPaneHeader
                    title="카테고리 관리"
                    count={list.length}
                    description="게시판에 노출되는 카테고리를 관리합니다."
                    action={
                        <UI.Button className="rounded-[0.6rem] bg-[var(--color-brand-500)] px-[1.2rem] py-[0.7rem] text-[1.2rem] font-semibold text-white" onClick={createCategoryModal}>
                            + 생성
                        </UI.Button>
                    }
                />
                <div className="p-[1.2rem]">
                    {isLoading ? <ManagerListSkeleton /> : isError || data?.resultCode === "ERROR" ? (
                        <ManagerListError message={isError ? error?.message : data?.resultMessage} onRetry={() => refetch()} />
                    ) : list.length === 0 ? (
                        <ManagerEmptyState variant="no-list" title="등록된 카테고리가 없습니다" />
                    ) : (
                        <section className="flex flex-col gap-[0.8rem]">
                            {list.map((item) => (
                                <ManagerListItemCard key={item.idx} isSelected={selectedItem === String(item.idx)} onClick={() => setSelectedItem(item.idx)}>
                                    <div className="flex items-center justify-between gap-[1rem]">
                                        <div className="min-w-0">
                                            <p className="truncate text-[1.4rem] font-semibold">{item.title}</p>
                                            <p className="mt-[0.4rem] text-[1.1rem] text-[var(--color-gray-500)]">{util.string.getCurrentDate(item.created_at)}</p>
                                        </div>
                                        <StatusBadge active={item.is_enabled} />
                                    </div>
                                </ManagerListItemCard>
                            ))}
                        </section>
                    )}
                </div>
            </ManagerListPane>
            <ManagerDetailPane>
                {selectedCategory ? (
                    <article>
                        <ManagerDetailPaneHeader title={selectedCategory.title} description={selectedCategory.description} />
                        <div className="flex flex-col gap-[2.4rem] p-[2.4rem]">
                            <div className="flex items-center justify-between border-b border-[var(--color-gray-300)] pb-[1.6rem]">
                                <span className="text-[1.2rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-gray-500)]">Status</span>
                                <UI.Switch states={selectedCategory.is_enabled} onChange={(is_enabled) => patchCategory({ idx: selectedCategory.idx, is_enabled })} />
                            </div>
                            <ManagerDetailMetaGrid items={[
                                { label: "Title", value: selectedCategory.title },
                                { label: "Created", value: util.string.getCurrentDate(selectedCategory.created_at, 4) },
                                { label: "Status", value: selectedCategory.is_enabled ? "활성" : "비활성" },
                            ]} />
                            <div className="flex gap-[0.8rem]">
                                <UI.Button className="rounded-[0.6rem] border border-[var(--color-gray-300)] px-[1.2rem] py-[0.7rem]" onClick={() => modifyCategoryModal(selectedCategory)}>수정</UI.Button>
                                <UI.Button className="rounded-[0.6rem] border border-[var(--color-red-200)] px-[1.2rem] py-[0.7rem] text-[var(--color-red-600)]" onClick={() => deleteCategoryModal(selectedCategory)}>삭제</UI.Button>
                            </div>
                        </div>
                    </article>
                ) : <ManagerEmptyState variant="no-item" />}
            </ManagerDetailPane>
        </div>
    );
};

const StatusBadge = ({ active }: { active: boolean }) => (
    <span className={`shrink-0 rounded-full px-[0.8rem] py-[0.2rem] text-[1rem] font-semibold ${active ? "bg-[var(--color-brand-100)] text-[var(--color-brand-700)]" : "bg-[var(--color-gray-200)] text-[var(--color-gray-600)]"}`}>
        {active ? "활성" : "비활성"}
    </span>
);

export default CategoryManager;
