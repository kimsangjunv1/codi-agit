/** Next.js ISR revalidate (seconds). ISR page routes must use this same value literally in `export const revalidate`. */
export const PUBLIC_ISR_REVALIDATE_SECONDS = 300;

export const POST_DETAIL_REVALIDATE_SECONDS = PUBLIC_ISR_REVALIDATE_SECONDS;
export const POST_DETAIL_STALE_TIME_MS = POST_DETAIL_REVALIDATE_SECONDS * 1000;
