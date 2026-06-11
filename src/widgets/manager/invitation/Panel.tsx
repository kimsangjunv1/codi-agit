"use client";

import { InvitationManagerPageProvider } from "./model/InvitationManagerContext";
import * as InvitationManagerLayer from "@/widgets/manager/invitation/ui";

export default function Panel() {
    return (
        <InvitationManagerPageProvider>
            <InvitationManagerLayer.InvitationManager />
            <InvitationManagerLayer.Modal />
        </InvitationManagerPageProvider>
    );
}
