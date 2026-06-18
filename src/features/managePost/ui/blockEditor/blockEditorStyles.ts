export const BLOCK_MIN_HEIGHT_CLASS = "min-h-[18rem]";
export const BLOCK_ROW_CLASS = "flex flex-col tablet:flex-row tablet:flex-wrap gap-[0.4rem] w-full min-w-0";
export const BLOCK_COLUMN_CLASS =
    "w-full min-w-0 tablet:flex-1 tablet:min-w-[calc((var(--size-tablet)-(1.6rem*10))/2)] p-[1.6rem] bg-[#ffffff] rounded-[2.4rem] flex flex-col gap-[2.4rem]";
    export const BLOCK_DETAIL_COLUMN_CLASS =
    "w-full min-w-0 tablet:min-w-[calc((var(--size-tablet)-(1.6rem*10))/2)] p-[1.6rem] bg-[#ffffff] rounded-[2.4rem]";
    // "w-full min-w-0 tablet:flex-1 tablet:min-w-[calc((var(--size-tablet)-(1.6rem*10))/2)] p-[1.6rem] bg-[#f4f4f4] rounded-[2.4rem]";
export const BLOCK_MENU_PANEL_CLASS = "rounded-[1.2rem] border border-white/10 bg-[rgba(0,0,0,0.72)] p-[0.4rem] shadow-[var(--shadow-normal)] backdrop-blur-md";
export const BLOCK_MENU_ITEM_CLASS =
    "flex w-full items-center gap-[0.8rem] rounded-[1.0rem] px-[1.2rem] py-[1.0rem] text-left text-[1.6rem] font-[500] text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40";

export const TIPTAP_PROSE_CLASS =
    "text-[1.8rem] leading-[1.5] [&_p]:!text-[1.8rem] [&_p]:!leading-[1.5] [&_p]:mb-[0.8rem] [&_p:last-child]:mb-0 [&_p:empty]:min-h-[2.7rem] [&_p:has(>br:only-child)]:min-h-[2.7rem] [&_span]:!text-[inherit] [&_span]:!leading-[inherit] [&_ul]:list-disc [&_ul]:pl-[2rem] [&_ul]:my-[0.8rem] [&_ol]:list-decimal [&_ol]:pl-[2rem] [&_ol]:my-[0.8rem] [&_blockquote]:border-l-[0.4rem] [&_blockquote]:border-[var(--color-gray-300)] [&_blockquote]:pl-[1.2rem] [&_blockquote]:text-[var(--color-gray-600)] [&_blockquote]:my-[0.8rem]";

export const POST_TIPTAP_CONTENT_CLASS =
    `post-tiptap-content w-full ${TIPTAP_PROSE_CLASS} [&_img]:my-[1.6rem] [&_img]:block [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-[2.4rem] [&_img]:shadow-[var(--shadow-normal)] [&_img[data-align='center']]:mx-auto [&_img[data-align='right']]:ml-auto [&_img[data-align='right']]:mr-0`;
