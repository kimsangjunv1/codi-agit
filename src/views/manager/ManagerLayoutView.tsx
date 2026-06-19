import { ReactNode } from "react";

import ManagerLayoutShell from "@/widgets/manager/ui/ManagerLayoutShell";
import type { ManagerSidebarProfile } from "@/widgets/manager/ui/ManagerSidebar";

type ManagerLayoutViewProps = {
    children: ReactNode;
    profile: ManagerSidebarProfile;
};

export default function ManagerLayoutView({ children, profile }: ManagerLayoutViewProps) {
    return <ManagerLayoutShell profile={profile}>{children}</ManagerLayoutShell>;
}
