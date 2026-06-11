import { ReactNode } from "react";

import ManagerLayoutShell from "@/widgets/manager/ui/ManagerLayoutShell";

type ManagerLayoutViewProps = {
    children: ReactNode;
};

export default function ManagerLayoutView({ children }: ManagerLayoutViewProps) {
    return <ManagerLayoutShell>{children}</ManagerLayoutShell>;
}
