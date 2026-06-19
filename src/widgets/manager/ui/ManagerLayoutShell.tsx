import type { ReactNode } from "react";

import ManagerSidebar, { type ManagerSidebarProfile } from "./ManagerSidebar";
import ManagerThreePaneShell from "./ManagerThreePaneShell";

type ManagerLayoutShellProps = {
    children: ReactNode;
    profile: ManagerSidebarProfile;
};

const ManagerLayoutShell = ({ children, profile }: ManagerLayoutShellProps) => {
    return (
        <ManagerThreePaneShell sidebar={<ManagerSidebar profile={profile} />}>
            {children}
        </ManagerThreePaneShell>
    );
};

export default ManagerLayoutShell;
