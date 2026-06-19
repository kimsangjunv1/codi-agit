import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/shared/lib/authOptions";
import ManagerLayoutView from "@/views/manager/ManagerLayoutView";

export default async function ManagerLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "admin") {
        redirect("/");
    }

    return <ManagerLayoutView profile={{ name: session.user.name, email: session.user.email }}>{children}</ManagerLayoutView>;
}
