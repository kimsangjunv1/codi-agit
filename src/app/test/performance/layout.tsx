import { ReactNode } from "react";

type PerformanceTestLayoutProps = {
    children: ReactNode;
};

const PerformanceTestLayout = ({ children }: PerformanceTestLayoutProps) => {
    return <div className="min-h-[100dvh] w-full bg-white">{children}</div>;
};

export default PerformanceTestLayout;
