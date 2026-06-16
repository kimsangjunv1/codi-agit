type PerfTestGuideProps = {
    variant: "bad" | "good";
};

const PerfTestGuide = ({ variant }: PerfTestGuideProps) => {
    const isBad = variant === "bad";

    return (
        <section className="mt-[4rem] flex w-full flex-col gap-[2rem] border-t border-neutral-200 pt-[3rem] text-[1.4rem] leading-relaxed text-neutral-700">
            <h2 className="text-[1.8rem] font-bold text-neutral-900">Performance 측정 가이드</h2>

            <ol className="flex list-decimal flex-col gap-[1.2rem] pl-[2rem]">
                <li>
                    <code className="rounded bg-neutral-100 px-[0.4rem]">npm run build &amp;&amp; npm run start</code> 로
                    프로덕션 서버를 띄웁니다. dev 모드는 HMR 때문에 수치가 왜곡됩니다.
                </li>
                <li>Chrome 시크릿 창에서 이 페이지를 엽니다.</li>
                <li>
                    DevTools → <strong>Performance</strong> 탭 → Screenshots·Web Vitals 켜기 → Record 후 새로고침
                </li>
                <li>타임라인에서 <strong>LCP</strong> 마커 시점과 하이라이트된 요소를 확인합니다.</li>
                <li>Main 스레드의 <strong>Long Task</strong>(50ms 이상 노란 막대) 유무를 봅니다.</li>
                <li>
                    <LinkBadge href="/test/performance/good" label="Good" /> 페이지도 같은 방식으로 녹화해 비교합니다.
                </li>
            </ol>

            {isBad ? (
                <div className="rounded-[0.8rem] border border-red-200 bg-red-50 p-[1.6rem]">
                    <h3 className="mb-[1rem] font-bold text-red-900">이 Bad 페이지에 의도적으로 넣은 문제</h3>
                    <ul className="flex list-disc flex-col gap-[0.6rem] pl-[2rem]">
                        <li>클라이언트 전용 렌더 — 초기 HTML에 히어로 이미지 없음</li>
                        <li>
                            <code>useEffect</code>로 약 1.5초 지연 후 이미지 표시
                        </li>
                        <li>히어로인데 <code>loading=&quot;lazy&quot;</code> 사용</li>
                        <li>
                            <code>width</code>/<code>height</code> 미지정 → 레이아웃 시프트(CLS) 유발
                        </li>
                        <li>hydration 직후 메인 스레드 동기 연산(~400ms) — Long Task</li>
                        <li>
                            <code>next/image</code> 미사용 — 원본 대용량 이미지 직접 요청
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="rounded-[0.8rem] border border-green-200 bg-green-50 p-[1.6rem]">
                    <h3 className="mb-[1rem] font-bold text-green-900">Good 페이지에서 적용한 수정</h3>
                    <ul className="flex list-disc flex-col gap-[0.6rem] pl-[2rem]">
                        <li>Server Component — HTML에 히어로가 즉시 포함</li>
                        <li>
                            <code>next/image</code> + <code>priority</code> — LCP 이미지 선로딩
                        </li>
                        <li>명시적 크기 + <code>sizes</code> — CLS 방지</li>
                        <li>동기 블로킹·인위적 지연 없음</li>
                    </ul>
                </div>
            )}

            <div className="rounded-[0.8rem] bg-neutral-100 p-[1.6rem]">
                <h3 className="mb-[1rem] font-bold text-neutral-900">Bad → Good 매핑 (실습 정리)</h3>
                <table className="w-full border-collapse text-left text-[1.3rem]">
                    <thead>
                        <tr className="border-b border-neutral-300">
                            <th className="py-[0.6rem] pr-[1rem]">Performance에서 본 것</th>
                            <th className="py-[0.6rem]">Good의 대응</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-neutral-200">
                            <td className="py-[0.8rem] pr-[1rem]">LCP가 2.5초 이후, 요소가 img</td>
                            <td className="py-[0.8rem]">SSR + next/image priority</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                            <td className="py-[0.8rem] pr-[1rem]">Scripting 구간 Long Task</td>
                            <td className="py-[0.8rem]">hydration 직후 동기 연산 제거</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                            <td className="py-[0.8rem] pr-[1rem]">이미지 로드가 JS 이후</td>
                            <td className="py-[0.8rem]">서버 HTML에 src 포함</td>
                        </tr>
                        <tr>
                            <td className="py-[0.8rem] pr-[1rem]">레이아웃 흔들림</td>
                            <td className="py-[0.8rem]">width/height·aspect-ratio 지정</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

const LinkBadge = ({ href, label }: { href: string; label: string }) => (
    <a href={href} className="font-medium text-blue-700 underline">
        {label}
    </a>
);

export default PerfTestGuide;
