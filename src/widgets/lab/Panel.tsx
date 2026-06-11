"use client";

import PageFrame from "@/widgets/layout/PageFrame";

import * as LabLayer from "@/widgets/lab/ui";

export default function Panel() {
    return (
        <PageFrame id="lab" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <LabLayer.LabGuide />
        </PageFrame>
    );
}
