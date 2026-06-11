"use client";

import { ManagerPageProvider } from "./model/ManagerContext";
import * as ManagerLayer from "@/widgets/manager/ui";

export default function Panel() {
    return (
        <ManagerPageProvider>
            <ManagerLayer.ManagerHub />
            <ManagerLayer.Modal />
        </ManagerPageProvider>
    );
}
