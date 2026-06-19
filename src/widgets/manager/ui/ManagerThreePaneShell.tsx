"use client";

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";

type ManagerThreePaneShellProps = {
    sidebar: ReactNode;
    children: ReactNode;
};

const ManagerThreePaneShell = ({ sidebar, children }: ManagerThreePaneShellProps) => {
    const hasSelection = useSearchParams().has("item");

    return (
        <div className="grid h-[100svh] grid-cols-1 grid-rows-[auto_minmax(0,1fr)] overflow-hidden pt-[calc(var(--header-height)/2)] md:grid-cols-[20rem_minmax(0,1fr)] md:grid-rows-1 md:pt-[var(--header-height)] lg:grid-cols-[24rem_minmax(0,1fr)]">
            <div className="min-w-0">{sidebar}</div>
            <div
                className={`grid min-h-0 min-w-0 grid-cols-1 lg:grid-cols-[minmax(28rem,36rem)_minmax(32rem,1fr)] [&>*:only-child]:col-span-full [&>main]:h-full [&>main]:min-h-0 [&>main]:overflow-y-auto ${
                    hasSelection
                        ? "[&>[data-manager-pane='list']]:hidden lg:[&>[data-manager-pane='list']]:block"
                        : "[&>[data-manager-pane='detail']]:hidden lg:[&>[data-manager-pane='detail']]:block"
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default ManagerThreePaneShell;
