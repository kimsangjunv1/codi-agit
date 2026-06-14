"use client";

import { ReactNode } from "react";

import { R } from "./renewalStyles";

type RenewalSplitSectionProps = {
    id?: string;
    left?: ReactNode;
    children: ReactNode;
    className?: string;
    divider?: boolean;
};

const RenewalSplitSection = ({ id, left, children, className = "", divider = false }: RenewalSplitSectionProps) => {
    return (
        <section id={id} className={`${R.section} ${divider ? R.divider : ""} ${className}`}>
            <div className={R.split}>
                {left ? (
                    <div className="flex items-center justify-center px-[2.4rem] tablet:px-[4rem] py-[4rem] tablet:py-[8rem] min-h-[24rem] tablet:min-h-[48rem]">
                        <div className={R.leftInner}>{left}</div>
                    </div>
                ) : (
                    <div className="hidden tablet:block" aria-hidden />
                )}

                <div className={R.right}>
                    <div className={R.rightInner}>{children}</div>
                </div>
            </div>
        </section>
    );
};

export default RenewalSplitSection;
