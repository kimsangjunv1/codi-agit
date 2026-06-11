"use client";

import PageFrame from "@/widgets/layout/PageFrame";

import * as ManagerLayer from "@/widgets/manager/ui";

export default function Panel() {
    return (
        <PageFrame id="manager" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <ManagerLayer.ManagerHub />
        </PageFrame>
    );
}
