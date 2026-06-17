import NProgress from "nprogress";

let configured = false;

/** PageRevealOverlay가 로딩 UI를 담당 — 상단 bar는 비활성화 */
export function configureNProgress() {
    if (configured || typeof window === "undefined") return;

    configured = true;
    NProgress.configure({
        showSpinner: false,
        trickle: false,
        minimum: 0.08,
    });
}

export function finishNProgress() {
    configureNProgress();
    NProgress.done();
}
