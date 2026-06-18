import type { ReactNode } from "react";

type ManagerListPaneProps = {
    children: ReactNode;
    className?: string;
};

const ManagerListPane = ({ children, className = "" }: ManagerListPaneProps) => {
    return (
        <section
            aria-label="관리 항목 목록"
            className={`min-h-0 min-w-0 overflow-y-auto border-r border-[var(--color-gray-300)] bg-[var(--color-gray-50)] ${className}`}
        >
            {children}
        </section>
    );
};

export default ManagerListPane;
