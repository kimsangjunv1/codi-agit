"use client";

import { useGetUserManagerListQuery } from "@/entities/user/api/user.query";
import { util } from "@/shared/lib/util";
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

const UserManager = () => {
    const { data, isLoading, isError, error, refetch } = useGetUserManagerListQuery();
    const { selectedItem, setSelectedItem } = useManagerSelection();
    const list = data?.result ?? [];
    const selectedUser = list.find((item) => item.id === selectedItem);

    return (
        <div className="contents">
            <ManagerListPane>
                <ManagerListPaneHeader title="유저 관리" count={list.length} description="가입된 회원 목록을 조회합니다." />
                <div className="p-[1.2rem]">
                    {isLoading ? <ManagerListSkeleton /> : isError || data?.resultCode === "ERROR" ? (
                        <ManagerListError message={isError ? error?.message : data?.resultMessage} onRetry={() => refetch()} />
                    ) : list.length === 0 ? <ManagerEmptyState variant="no-list" title="등록된 회원이 없습니다" /> : (
                        <section className="flex flex-col gap-[0.8rem]">
                            {list.map((item) => (
                                <ManagerListItemCard key={item.id} isSelected={selectedItem === item.id} onClick={() => setSelectedItem(item.id)}>
                                    <p className="truncate text-[1.4rem] font-semibold">{item.name}</p>
                                    <p className="mt-[0.4rem] truncate text-[1.2rem] text-[var(--color-gray-600)]">{item.email}</p>
                                    <p className="mt-[0.4rem] text-[1.1rem] text-[var(--color-gray-500)]">가입 {util.string.getCurrentDate(item.created_at)}</p>
                                </ManagerListItemCard>
                            ))}
                        </section>
                    )}
                </div>
            </ManagerListPane>
            <ManagerDetailPane>
                {selectedUser ? (
                    <article>
                        <ManagerDetailPaneHeader title={selectedUser.name} description={selectedUser.email} />
                        <div className="p-[2.4rem]">
                            <ManagerDetailMetaGrid items={[
                                { label: "Name", value: selectedUser.name },
                                { label: "Email", value: selectedUser.email },
                                { label: "Member ID", value: selectedUser.id },
                                { label: "Joined", value: util.string.getCurrentDate(selectedUser.created_at, 4) },
                            ]} />
                        </div>
                    </article>
                ) : <ManagerEmptyState variant="no-item" />}
            </ManagerDetailPane>
        </div>
    );
};

export default UserManager;
