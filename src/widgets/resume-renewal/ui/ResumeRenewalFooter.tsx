"use client";

import RenewalRightBlocks from "./RenewalRightBlocks";
import RenewalSplitSection from "./RenewalSplitSection";
import { R } from "./renewalStyles";

const ResumeRenewalFooter = () => {
    return (
        <RenewalSplitSection
            divider
            className="bg-[#00ff61]"
        >
            <RenewalRightBlocks
                label={<p className={R.label}>End</p>}
                headline={<p className={R.keyline}>사용자에게 닿는 화면을 코드로 옮기는 일, 그 과정이 여전히 가장 즐겁습니다.</p>}
                description={
                    <p className={R.bodyMuted}>
                        2년 1개월차 프론트엔드 개발자로서, 읽기 좋은 코드와 팀에 도움이 되는 구현을 꾸준히 만들어가고 싶습니다. 함께 더 나은 제품을 만들 수 있는 자리를 기대합니다.
                    </p>
                }
                details={<p className={R.meta}>© {new Date().getFullYear()} Kim Sangjun</p>}
            />
        </RenewalSplitSection>
    );
};

export default ResumeRenewalFooter;
