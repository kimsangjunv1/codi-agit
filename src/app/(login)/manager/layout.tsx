import { ReactNode } from "react";

import ManagerLayoutView from "@/views/manager/ManagerLayoutView";

export default function ManagerLayout({ children }: { children: ReactNode }) {
    return <ManagerLayoutView>{children}</ManagerLayoutView>;
}
