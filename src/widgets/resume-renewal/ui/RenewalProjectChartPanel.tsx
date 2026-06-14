import type { ResumeProject } from "@/shared/constants/resume/resumeData";
import MiniChart from "@/widgets/resume/ui/MiniChart";
import { R } from "./renewalStyles";

type RenewalProjectChartPanelProps = {
    index: number;
    period: string;
    projectId: string;
    highlight: ResumeProject["highlight"];
    chartLabel: string;
    chartPoints: number[];
    metrics: ResumeProject["metrics"];
};

const RenewalProjectChartPanel = ({
    index,
    period,
    projectId,
    highlight,
    chartLabel,
    chartPoints,
    metrics,
}: RenewalProjectChartPanelProps) => {
    const periodStart = period.split("~")[0]?.trim() ?? period;

    return (
        <div className="flex flex-col justify-between w-full h-full min-h-[32rem] gap-[3.2rem]">
            <div>
                <p className={`${R.label} mb-[2rem]`}>Project {String(index + 1).padStart(2, "0")}</p>
                <p className={R.meta}>{highlight.label}</p>
                <div className="flex items-end gap-[1rem] mt-[1.2rem]">
                    <span className="text-[1.6rem] text-[#000000] line-through">
                        {highlight.before}
                        {highlight.unit ?? ""}
                    </span>
                    <span className="text-[4.8rem] font-bold leading-none tracking-[-0.04em] text-[#000000]">
                        {highlight.after}
                        <span className="text-[1.8rem] text-[#000000]">{highlight.unit ?? ""}</span>
                    </span>
                </div>
            </div>

            <div className="flex-1 min-h-[14rem]">
                <MiniChart
                    points={chartPoints}
                    label={chartLabel}
                    chartId={`renewal-${projectId}-case-study`}
                    startLabel={periodStart}
                    endLabel="현재"
                    strokeColor="#000000"
                    labelClassName="text-[1.6rem] text-[#000000] mb-[0.8rem]"
                    axisClassName="flex justify-between text-[1.6rem] text-[#000000] mt-[0.4rem]"
                />
            </div>

            <div className={`grid grid-cols-3 gap-[1.6rem] ${R.divider} pt-[2.4rem]`}>
                {metrics.map((metric) => (
                    <div key={metric.label}>
                        <p className="text-[1.8rem] font-bold text-[#000000]">{metric.value}</p>
                        <p className={`${R.meta} mt-[0.2rem]`}>{metric.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RenewalProjectChartPanel;
