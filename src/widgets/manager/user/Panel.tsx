"use client";

import PageFrame from "@/widgets/layout/PageFrame";

import * as UserManagerLayer from "@/widgets/manager/user/ui";

export default function Panel() {
    return (
        <PageFrame id="manager-user" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <UserManagerLayer.UserManager />
        </PageFrame>
    );
}
