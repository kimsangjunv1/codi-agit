"use client";

import PageFrame from "@/widgets/layout/PageFrame";

import * as CategoryManagerLayer from "@/widgets/manager/category/ui";

export default function Panel() {
    return (
        <PageFrame id="manager-category" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <CategoryManagerLayer.CategoryManager />
        </PageFrame>
    );
}
