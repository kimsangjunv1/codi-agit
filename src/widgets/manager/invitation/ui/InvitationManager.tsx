"use client";

import { useRef } from "react";

import { useGetInvitationCodeListOnManagerQuery } from "@/entities/invitation/api/invitation.query";
import type { InvitationCodeListItem, SetInvitationCodePayload } from "@/entities/invitation/model/invitation.type";
import { util } from "@/shared/lib/util";
import { useModalStore } from "@/shared/stores/useModalStore";
import UI from "@/shared/ui/common/UIComponent";
import ModalContent from "@/shared/ui/common/ModalComponent";
import {
    useDeleteInvitationCodeWithToast,
    usePatchInvitationCodeWithToast,
    useSetInvitationCodeWithToast,
} from "@/widgets/manager/invitation/hooks/useInvitationMutations";
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

const InvitationManager = () => {
    const createValueRef = useRef<SetInvitationCodePayload>({ is_active: false, expire_at: "" });
    const { data, isLoading, isError, error, refetch } = useGetInvitationCodeListOnManagerQuery();
    const { mutate: createInvitation } = useSetInvitationCodeWithToast();
    const { mutate: patchInvitation } = usePatchInvitationCodeWithToast();
    const { mutate: deleteInvitation } = useDeleteInvitationCodeWithToast();
    const { setModal } = useModalStore();
    const { selectedItem, setSelectedItem } = useManagerSelection();
    const list = data?.result ?? [];
    const selectedInvitation = list.find((item) => String(item.id) === selectedItem);

    const createInvitationModal = () =>
        setModal({
            type: "CHECK",
            title: "초대코드 생성",
            content: <ModalContent.Invitation.AddInvitationCode onChange={(value) => (createValueRef.current = value)} />,
            cancel: { text: "닫기" },
            confirm: {
                text: "확인",
                onClick: () => {
                    createInvitation(createValueRef.current);
                    createValueRef.current = { is_active: true, expire_at: "" };
                },
            },
            isOpen: true,
        });

    const deleteInvitationModal = (item: InvitationCodeListItem) =>
        setModal({
            type: "CHECK",
            title: "초대코드를 삭제할까요?",
            content: <p className="break-all text-[var(--color-gray-600)]">삭제 대상: {item.code}</p>,
            cancel: { text: "취소" },
            confirm: { text: "삭제하기", onClick: () => deleteInvitation({ id: item.id }) },
            isOpen: true,
        });

    return (
        <div className="contents">
            <ManagerListPane>
                <ManagerListPaneHeader
                    title="초대코드 관리"
                    count={list.length}
                    description="회원가입 초대코드를 발급·관리합니다."
                    action={<UI.Button className="rounded-[0.6rem] bg-[var(--color-brand-500)] px-[1.2rem] py-[0.7rem] text-[1.2rem] font-semibold text-white" onClick={createInvitationModal}>+ 생성</UI.Button>}
                />
                <div className="p-[1.2rem]">
                    {isLoading ? <ManagerListSkeleton /> : isError || data?.resultCode === "ERROR" ? (
                        <ManagerListError message={isError ? error?.message : data?.resultMessage} onRetry={() => refetch()} />
                    ) : list.length === 0 ? <ManagerEmptyState variant="no-list" title="등록된 초대코드가 없습니다" /> : (
                        <section className="flex flex-col gap-[0.8rem]">
                            {list.map((item) => (
                                <ManagerListItemCard key={item.id} isSelected={selectedItem === String(item.id)} onClick={() => setSelectedItem(item.id)}>
                                    <div className="flex items-center justify-between gap-[1rem]">
                                        <div className="min-w-0">
                                            <p className="truncate font-mono text-[1.3rem] font-semibold">{item.code}</p>
                                            <p className="mt-[0.4rem] text-[1.1rem] text-[var(--color-gray-500)]">{item.expire_at ? `만료 ${util.string.getCurrentDate(item.expire_at)}` : "만료 없음"}</p>
                                        </div>
                                        <span className={`rounded-full px-[0.8rem] py-[0.2rem] text-[1rem] font-semibold ${item.is_active ? "bg-[var(--color-brand-100)] text-[var(--color-brand-700)]" : "bg-[var(--color-gray-200)] text-[var(--color-gray-600)]"}`}>{item.is_active ? "활성" : "비활성"}</span>
                                    </div>
                                </ManagerListItemCard>
                            ))}
                        </section>
                    )}
                </div>
            </ManagerListPane>
            <ManagerDetailPane>
                {selectedInvitation ? (
                    <article>
                        <ManagerDetailPaneHeader title={selectedInvitation.code} description="회원가입에 사용하는 초대코드입니다." />
                        <div className="flex flex-col gap-[2.4rem] p-[2.4rem]">
                            <div className="flex items-center justify-between border-b border-[var(--color-gray-300)] pb-[1.6rem]">
                                <span className="text-[1.2rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-gray-500)]">Status</span>
                                <UI.Switch states={selectedInvitation.is_active} onChange={(is_active) => patchInvitation({ id: selectedInvitation.id, is_active, expire_at: selectedInvitation.expire_at })} />
                            </div>
                            <ManagerDetailMetaGrid items={[
                                { label: "Code", value: selectedInvitation.code },
                                { label: "Used", value: selectedInvitation.is_used ? "사용됨" : "미사용" },
                                { label: "Used by", value: selectedInvitation.used_by ?? "—" },
                                { label: "Created", value: util.string.getCurrentDate(selectedInvitation.created_at, 4) },
                                { label: "Expires", value: selectedInvitation.expire_at ? util.string.getCurrentDate(selectedInvitation.expire_at, 4) : "없음" },
                            ]} />
                            <UI.Button className="self-start rounded-[0.6rem] border border-[var(--color-red-200)] px-[1.2rem] py-[0.7rem] text-[var(--color-red-600)]" onClick={() => deleteInvitationModal(selectedInvitation)}>삭제</UI.Button>
                        </div>
                    </article>
                ) : <ManagerEmptyState variant="no-item" />}
            </ManagerDetailPane>
        </div>
    );
};

export default InvitationManager;
