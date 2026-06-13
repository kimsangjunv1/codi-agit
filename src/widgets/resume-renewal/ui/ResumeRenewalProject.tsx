"use client";

import type { RenewalProjectEntry } from "@/shared/constants/resume/resumeRenewalData";
import { resumeProfile } from "@/shared/constants/resume/resumeData";
import MiniChart from "@/widgets/resume/ui/MiniChart";
import ClippedRevealText, { ClippedRevealGroup } from "./ClippedRevealText";
import ResumeRenewalGallery from "./ResumeRenewalGallery";

type ResumeRenewalProjectProps = {
    project: RenewalProjectEntry;
    index: number;
};

const ResumeRenewalProject = ({ project, index }: ResumeRenewalProjectProps) => {
    const periodStart = project.period.split("~")[0]?.trim() ?? project.period;
    const description = [project.overview, ...project.achievements.slice(0, 2)].join(" ");

    return (
        <section className="w-full border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 tablet:grid-cols-2 min-h-[70dvh]">
                <div className="flex flex-col justify-between p-[4.8rem] tablet:p-[6.4rem] border-b tablet:border-b-0 tablet:border-r border-[#e5e5e5] bg-[#f4f4f2] order-2 tablet:order-1">
                    <div>
                        <p className="text-[1.1rem] tracking-[0.15em] uppercase text-[#888] mb-[2.4rem]">
                            Project {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="text-[1.2rem] text-[#888] mb-[0.8rem]">{project.highlight.label}</p>
                        <div className="flex items-end gap-[1.2rem] flex-wrap mb-[4.8rem]">
                            <span className="text-[2rem] font-bold text-[#ccc] line-through">
                                {project.highlight.before}
                                {project.highlight.unit ?? ""}
                            </span>
                            <span className="text-[5.6rem] tablet:text-[7.2rem] font-bold leading-none tracking-[-0.04em] text-[#111]">
                                {project.highlight.after}
                                <span className="text-[2.4rem] text-[#444]">{project.highlight.unit ?? ""}</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[16rem] max-h-[24rem]">
                        <MiniChart
                            points={project.chartPoints}
                            label={project.chartLabel}
                            chartId={`renewal-${project.id}`}
                            startLabel={periodStart}
                            endLabel="현재"
                            strokeColor="#111111"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-[1.6rem] mt-[4.8rem] pt-[4.8rem] border-t border-[#e5e5e5]/60">
                        {project.metrics.map((metric) => (
                            <div key={metric.label}>
                                <p className="text-[2rem] font-bold text-[#111]">{metric.value}</p>
                                <p className="text-[1.1rem] text-[#888] mt-[0.2rem]">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-center p-[4.8rem] tablet:p-[6.4rem] bg-white order-1 tablet:order-2">
                    <ClippedRevealGroup className="flex flex-col gap-[2.4rem]">
                        <ClippedRevealText>
                            <p className="text-[1.3rem] text-[#888]">{project.category}</p>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <h2 className="text-[2.8rem] tablet:text-[4rem] font-bold text-[#111] leading-[1.2] tracking-[-0.03em]">
                                {project.title}
                            </h2>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <p className="text-[1.8rem] tablet:text-[2rem] font-semibold text-[#333] leading-[1.4]">
                                {project.subtitle}
                            </p>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <p className="text-[1.5rem] leading-[1.8] text-[#555]">{description}</p>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <dl className="grid grid-cols-[8rem_1fr] gap-y-[0.6rem] text-[1.3rem] pt-[1.6rem] border-t border-[#eee]">
                                <dt className="text-[#999]">일정</dt>
                                <dd className="text-[#333]">{project.period}</dd>
                                <dt className="text-[#999]">기술</dt>
                                <dd className="text-[#333]">{project.techStack}</dd>
                                <dt className="text-[#999]">인력</dt>
                                <dd className="text-[#333]">{project.team}</dd>
                            </dl>
                        </ClippedRevealText>

                        <ClippedRevealText>
                            <div className="pt-[1.6rem]">
                                <p className="text-[1.3rem] text-[#888]">Frontend Developer</p>
                                <p className="text-[2.4rem] font-bold text-[#111] mt-[0.4rem]">{resumeProfile.name}</p>
                            </div>
                        </ClippedRevealText>
                    </ClippedRevealGroup>
                </div>
            </div>

            <ResumeRenewalGallery items={project.gallery} />
        </section>
    );
};

export default ResumeRenewalProject;
