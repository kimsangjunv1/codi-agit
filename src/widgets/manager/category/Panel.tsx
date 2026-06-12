"use client";

import { CategoryManagerPageProvider } from "./model/CategoryManagerContext";
import * as CategoryManagerLayer from "@/widgets/manager/category/ui";

export default function Panel() {
    return (
        <CategoryManagerPageProvider>
            <CategoryManagerLayer.CategoryManager />
            <CategoryManagerLayer.Modal />
        </CategoryManagerPageProvider>
    );
}
