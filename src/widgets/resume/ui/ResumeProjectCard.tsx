import type { ResumeProject } from "@/shared/constants/resume/resumeData";
import MiniChart from "./MiniChart";

type ResumeProjectCardProps = {
    project: ResumeProject;
    index: number;
};

const ResumeProjectCard = ({ project, index }: ResumeProjectCardProps) => {
    const periodStart = project.period.split("~")[0]?.trim() ?? project.period;

    return (
        <section className="w-full border-b border-[#e5e5e5]">
            <div className="px-[2.4rem] py-[4.8rem] tablet:py-[6.4rem]">
                <p className="text-[1.2rem] text-[#888] mb-[0.8rem]">Project {String(index + 1).padStart(2, "0")}</p>
                <h2 className="text-[2rem] tablet:text-[2.8rem] font-bold text-[#111] tracking-[-0.02em]">
                    {project.title}
                </h2>
                <p className="text-[1.4rem] text-[#666] mt-[0.4rem]">{project.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 border-t border-[#e5e5e5]">
                <div className="border-b tablet:border-b-0 tablet:border-r border-[#e5e5e5] p-[2.4rem] tablet:p-[4.8rem] flex flex-col justify-between min-h-[20rem]">
                    <p className="text-[1.2rem] text-[#888] mb-[1.6rem]">{project.highlight.label}</p>
                    <div className="flex items-end gap-[1.2rem] flex-wrap">
                        <span className="text-[2.4rem] tablet:text-[3.2rem] font-bold text-[#ccc] line-through decoration-[#ccc]">
                            {project.highlight.before}
                            {project.highlight.unit ?? ""}
                        </span>
                        <span className="text-[4.8rem] tablet:text-[6.4rem] font-bold text-[#111] leading-none tracking-[-0.03em]">
                            {project.highlight.after}
                            <span className="text-[2.4rem] tablet:text-[3.2rem] text-[#646cff]">{project.highlight.unit ?? ""}</span>
                        </span>
                    </div>
                </div>

                <div className="p-[2.4rem] tablet:p-[4.8rem] min-h-[20rem]">
                    <MiniChart
                        points={project.chartPoints}
                        label={project.chartLabel}
                        chartId={project.id}
                        startLabel={periodStart}
                        endLabel="현재"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-3 border-t border-[#e5e5e5]">
                {project.metrics.map((metric, i) => (
                    <div
                        key={metric.label}
                        className={`p-[2.4rem] tablet:p-[3.2rem] ${i < project.metrics.length - 1 ? "border-b tablet:border-b-0 tablet:border-r border-[#e5e5e5]" : ""}`}
                    >
                        <p className="text-[2.4rem] tablet:text-[3.2rem] font-bold text-[#111] leading-none">
                            {metric.value}
                        </p>
                        <p className="text-[1.3rem] text-[#888] mt-[0.6rem]">{metric.label}</p>
                        {metric.sub && <p className="text-[1.1rem] text-[#aaa] mt-[0.2rem]">{metric.sub}</p>}
                    </div>
                ))}
            </div>

            <div className="border-t border-[#e5e5e5] p-[2.4rem] tablet:p-[4.8rem]">
                <dl className="grid grid-cols-1 tablet:grid-cols-2 gap-x-[4.8rem] gap-y-[0.8rem] text-[1.3rem] mb-[2.4rem] bg-[#f8f9fa] rounded-[0.6rem] p-[1.6rem]">
                    <div className="grid grid-cols-[8rem_1fr] gap-[0.8rem]">
                        <dt className="font-bold text-[#666]">일정</dt>
                        <dd className="text-[#333]">{project.period}</dd>
                    </div>
                    <div className="grid grid-cols-[8rem_1fr] gap-[0.8rem]">
                        <dt className="font-bold text-[#666]">참여 인력</dt>
                        <dd className="text-[#333]">{project.team}</dd>
                    </div>
                    <div className="grid grid-cols-[8rem_1fr] gap-[0.8rem] tablet:col-span-2">
                        <dt className="font-bold text-[#666]">기술 스택</dt>
                        <dd className="text-[#333]">{project.techStack}</dd>
                    </div>
                    <div className="grid grid-cols-[8rem_1fr] gap-[0.8rem] tablet:col-span-2">
                        <dt className="font-bold text-[#666]">서비스 개요</dt>
                        <dd className="text-[#333]">{project.overview}</dd>
                    </div>
                </dl>

                <ul className="flex flex-col gap-[0.8rem]">
                    {project.achievements.map((item) => (
                        <li key={item} className="text-[1.4rem] leading-[1.65] text-[#333] pl-[1.6rem] relative before:content-[''] before:absolute before:left-0 before:top-[0.9rem] before:w-[0.5rem] before:h-[0.5rem] before:rounded-full before:bg-[#646cff]">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ResumeProjectCard;
