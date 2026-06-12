import type { Metadata } from "next";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/shared/lib/authOptions";
import { NOINDEX_METADATA } from "@/shared/lib/seo/metadata";

export const metadata: Metadata = NOINDEX_METADATA;

export default async function LoginGroupLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return children;
}
