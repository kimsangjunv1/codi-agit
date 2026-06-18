import type { ReactNode } from "react";

type ManagerDetailPaneProps = {
    children: ReactNode;
    className?: string;
};

const ManagerDetailPane = ({ children, className = "" }: ManagerDetailPaneProps) => {
    return (
        <section
            aria-label="선택 항목 상세정보"
            className={`min-h-0 min-w-0 overflow-y-auto bg-white ${className}`}
        >
            {children}
        </section>
    );
};

export default ManagerDetailPane;
