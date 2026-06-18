import type { ReactNode } from "react";

type ManagerThreePaneShellProps = {
    sidebar: ReactNode;
    children: ReactNode;
};

const ManagerThreePaneShell = ({ sidebar, children }: ManagerThreePaneShellProps) => {
    return (
        <div className="grid h-[100svh] min-w-[100rem] grid-cols-[24rem_minmax(28rem,36rem)_minmax(32rem,1fr)] overflow-hidden pt-[var(--header-height)]">
            {sidebar}
            <div className="col-span-2 grid min-h-0 min-w-0 grid-cols-[minmax(28rem,36rem)_minmax(32rem,1fr)] [&>*:only-child]:col-span-2 [&>main]:h-full [&>main]:min-h-0 [&>main]:overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default ManagerThreePaneShell;
