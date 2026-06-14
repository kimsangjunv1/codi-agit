import type { ResumeProject } from "@/shared/constants/resume/resumeData";

type RenewalProjectChartPanelProps = {
    index: number;
    period: string;
    projectId: string;
    highlight: ResumeProject["highlight"];
    chartLabel: string;
    chartPoints: number[];
    metrics: ResumeProject["metrics"];
};

const RenewalProjectChartPanel = ({ index, highlight, chartLabel, metrics }: RenewalProjectChartPanelProps) => {
    return (
        <div className="w-full">
            <p className="mb-[1.6rem] text-[1.4rem] font-medium text-[#666666]">
                Project {String(index + 1).padStart(2, "0")}
            </p>

            <div className="w-full overflow-hidden rounded-[0.8rem] border border-[#E5E5E5] bg-white">
                <div className="grid grid-cols-1 border-b border-[#E5E5E5] tablet:grid-cols-2">
                    <div className="flex flex-col justify-between gap-[2.4rem] border-b border-[#E5E5E5] p-[2.4rem] tablet:min-h-[16rem] tablet:border-b-0 tablet:border-r tablet:p-[3.2rem]">
                        <p className="text-[1.4rem] text-[#666666]">{highlight.label}</p>
                        <div className="flex items-center gap-[1.2rem]">
                            <span className="text-[2.4rem] font-bold leading-none tracking-[-0.04em] text-[#666666] tablet:text-[3.2rem]">
                                {highlight.before}
                            </span>
                            <span
                                className="text-[2rem] text-[#666666]"
                                aria-hidden
                            >
                                →
                            </span>
                            <span className="text-[3.2rem] font-bold leading-none tracking-[-0.04em] text-[#000000] tablet:text-[4.8rem]">
                                {highlight.after}
                                {highlight.unit ? (
                                    <span className="text-[1.8rem] tablet:text-[2.4rem]">{highlight.unit}</span>
                                ) : null}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col p-[2.4rem] tablet:min-h-[16rem] tablet:p-[3.2rem]">
                        <div className="inline-flex items-center gap-[0.6rem] self-start rounded-full border border-[#E5E5E5] px-[1.2rem] py-[0.6rem] text-[1.4rem] text-[#000000]">
                            <span aria-hidden>⚡</span>
                            {chartLabel}
                            <span
                                className="text-[1.2rem] text-[#666666]"
                                aria-hidden
                            >
                                ⌵
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3">
                    {metrics.map((metric, metricIndex) => (
                        <div
                            key={metric.label}
                            className={`flex flex-col gap-[0.4rem] p-[2.4rem] tablet:p-[3.2rem] ${
                                metricIndex < metrics.length - 1 ? "border-r border-[#E5E5E5]" : ""
                            }`}
                        >
                            <p className="text-[1.8rem] font-bold leading-tight text-[#000000] tablet:text-[2rem]">
                                {metric.value}
                            </p>
                            <p className="text-[1.4rem] leading-snug text-[#666666]">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RenewalProjectChartPanel;
