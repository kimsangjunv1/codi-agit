import type { Metadata } from "next";

import { NOINDEX_METADATA } from "@/shared/lib/seo/metadata";

import BadPerfView from "../_components/BadPerfView";

export const metadata: Metadata = {
    title: "Performance Bad",
    ...NOINDEX_METADATA,
};

const BadPerformancePage = () => {
    return <BadPerfView />;
};

export default BadPerformancePage;
