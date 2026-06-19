import ManagerDetailPane from "@/widgets/manager/ui/ManagerDetailPane";
import ManagerEmptyState from "@/widgets/manager/ui/ManagerEmptyState";
import ManagerListPane from "@/widgets/manager/ui/ManagerListPane";

export default function ManagerView() {
    return (
        <div className="contents">
            <ManagerListPane>
                <ManagerEmptyState variant="no-menu" />
            </ManagerListPane>
            <ManagerDetailPane>
                <ManagerEmptyState
                    variant="no-item"
                    title="이곳에 선택하신 아이템의 상세정보가 나와요"
                    description="목록에서 항목을 선택하면 상세 내용이 표시됩니다."
                />
            </ManagerDetailPane>
        </div>
    );
}
