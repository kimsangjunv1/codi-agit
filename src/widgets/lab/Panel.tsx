"use client";

import { LabPageProvider } from "./model/LabContext";
import * as LabLayer from "@/widgets/lab/ui";

export default function Panel() {
    return (
        <LabPageProvider>
            <LabLayer.LabGuide />
            <LabLayer.Modal />
        </LabPageProvider>
    );
}
