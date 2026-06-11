"use client";

import PageFrame from "@/widgets/layout/PageFrame";

import * as InvitationManagerLayer from "@/widgets/manager/invitation/ui";

export default function Panel() {
    return (
        <PageFrame id="manager-invitation" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <InvitationManagerLayer.InvitationManager />
        </PageFrame>
    );
}
