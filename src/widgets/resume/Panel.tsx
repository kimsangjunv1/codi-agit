"use client";

import { getRenewalExperienceAnchorId, renewalExperiences } from "@/shared/constants/resume/resumeRenewalData";

import * as Layer from "./ui";
import { R } from "./ui/renewalStyles";

export default function Panel() {
    return (
        <article className={`relative w-full bg-white ${R.root}`}>
            <Layer.TocNav />
            <Layer.Hero />
            <Layer.SkillSection />
            {renewalExperiences.map((experience) => (
                <Layer.Experience
                    key={experience.id}
                    experience={experience}
                    anchorId={getRenewalExperienceAnchorId(experience.id)}
                />
            ))}
            <Layer.SideProject />
            <Layer.Footer />
            <Layer.EmailBannerSection />
            <Layer.Modal />
        </article>
    );
}
