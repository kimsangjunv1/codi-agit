import UI from "@/shared/ui/common/UIComponent";

export const FeedLoading = ({ className }: { className?: string }) => (
    <section className={`flex items-center justify-center w-full min-h-[50dvh] ${className ?? ""}`}>
        <UI.Loading />
    </section>
);

export const FeedError = ({ message, onRetry }: { message?: string; onRetry: () => void }) => (
    <article className="flex flex-col items-center justify-center gap-[1.6rem] w-full min-h-[50dvh]">
        <div className="flex flex-col gap-[0.8rem] text-center px-[1.6rem]">
            <p className="text-[1.8rem] font-bold">게시물을 불러오지 못했습니다</p>
            {message ? <p className="text-[1.4rem] text-[#00000090]">{message}</p> : null}
        </div>
        <UI.Button
            onClick={onRetry}
            className="p-[1.2rem_2.4rem] shadow-[var(--shadow-normal)] bg-[var(--color-orange-500)] text-white rounded-[1.2rem] font-bold"
        >
            다시 시도
        </UI.Button>
    </article>
);

export const FeedEmpty = ({ title = "등록된 게시물이 없습니다" }: { title?: string }) => (
    <UI.Empty title={title} className="min-h-[50dvh]" />
);
