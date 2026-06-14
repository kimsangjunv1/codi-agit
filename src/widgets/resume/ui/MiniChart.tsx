type MiniChartProps = {
    points: number[];
    label: string;
    chartId: string;
    startLabel?: string;
    endLabel?: string;
    strokeColor?: string;
};

const MiniChart = ({
    points,
    label,
    chartId,
    startLabel = "시작",
    endLabel = "현재",
    strokeColor = "#646cff",
}: MiniChartProps) => {
    const width = 400;
    const height = 160;
    const padding = { top: 20, right: 16, bottom: 28, left: 16 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const min = Math.min(...points) * 0.9;
    const max = Math.max(...points) * 1.05;

    const coords = points.map((v, i) => {
        const x = padding.left + (i / (points.length - 1)) * chartW;
        const y = padding.top + chartH - ((v - min) / (max - min)) * chartH;
        return { x, y };
    });

    const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
    const areaPath = `${linePath} L${coords[coords.length - 1].x},${padding.top + chartH} L${coords[0].x},${padding.top + chartH} Z`;

    return (
        <div className="flex flex-col h-full">
            <p className="text-[1.4rem] text-[#888] mb-[0.8rem]">{label}</p>
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full flex-1"
                preserveAspectRatio="none"
                aria-hidden
            >
                <defs>
                    <linearGradient id={`grad-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={strokeColor} stopOpacity="0.02" />
                    </linearGradient>
                </defs>
                <path d={areaPath} fill={`url(#grad-${chartId})`} />
                <path d={linePath} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex justify-between text-[1.1rem] text-[#999] mt-[0.4rem]">
                <span>{startLabel}</span>
                <span>{endLabel}</span>
            </div>
        </div>
    );
};

export default MiniChart;
