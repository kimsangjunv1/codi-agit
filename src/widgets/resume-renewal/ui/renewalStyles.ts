/** resume-renewal 전용 — 16px(1.6rem) 기준, 흑백만 */
export const R = {
    /** 2단: 왼쪽 시각 / 오른쪽 텍스트 */
    split: "grid grid-cols-1 tablet:grid-cols-2",
    left: "hidden tablet:flex tablet:items-center tablet:justify-center tablet:min-h-[48rem] px-[4rem] py-[8rem]",
    leftInner: "w-full max-w-[40rem]",
    right: "py-[6rem] tablet:py-[10rem] tablet:col-start-2",
    // right: "px-[2.4rem] tablet:px-[8rem] py-[6rem] tablet:py-[10rem] tablet:col-start-2",
    rightInner: "max-w-[56rem] flex flex-col gap-[2.4rem]",
    // rightInner: "max-w-[56rem] ml-0 tablet:ml-auto flex flex-col gap-[2.4rem]",
    section: "w-full scroll-mt-[8rem]",
    divider: "border-t border-black/10",
    /** typography */
    label: "text-[1.2rem] tracking-[0.12em] uppercase text-[#888]",
    category: "text-[1.4rem] text-[#666]",
    title: "text-[2.4rem] tablet:text-[3.2rem] font-bold text-black leading-[1.25] tracking-[-0.02em]",
    subtitle: "text-[1.8rem] font-semibold text-[#111] leading-[1.4]",
    body: "text-[1.6rem] leading-[1.75] text-[#333]",
    bodyMuted: "text-[1.6rem] leading-[1.75] text-[#666]",
    meta: "text-[1.4rem] text-[#888]",
    role: "text-[1.4rem] text-[#666]",
    name: "text-[2rem] tablet:text-[2.4rem] font-bold text-black mt-[0.4rem]",
    link: "text-[1.4rem] text-[#333] underline underline-offset-[0.3rem] decoration-black/20 hover:decoration-black transition-[text-decoration-color]",
} as const;
