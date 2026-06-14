"use client";

import { renewalContact } from "@/shared/constants/resume/resumeRenewalData";
import { R } from "./renewalStyles";

const ResumeRenewalEmailBannerSection = () => {
    return (
        <section className={`${R.root} w-full overflow-hidden`}>
            <a
                href={`mailto:${renewalContact.email}`}
                className="block w-full text-[12.0rem] font-bold uppercase leading-none text-[#000000] hover:opacity-70 transition-opacity"
            >
                {renewalContact.email}
            </a>
        </section>
    );
};

export default ResumeRenewalEmailBannerSection;
