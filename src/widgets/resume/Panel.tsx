"use client";

import { renewalExperiences } from "@/shared/constants/resume/resumeRenewalData";

import * as Layer from "./ui";
import { R } from "./ui/renewalStyles";

export default function Panel() {
    return (
        <article className={`relative w-full overflow-x-hidden bg-white mobile:px-[1.6rem] pc:px-0 ${R.root}`}>
            <Layer.TocNav />
            <Layer.Hero />
            <Layer.Worklog entries={renewalExperiences} />
            <Layer.ProjectGrid />
            <Layer.SkillSection />
            <Layer.SideProject />
            <Layer.Footer />
            <Layer.EmailBannerSection />
            <Layer.Modal />
        </article>
    );
}
