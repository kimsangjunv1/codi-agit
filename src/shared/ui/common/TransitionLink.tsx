"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import useNavigate from "@/shared/hooks/useNavigate";

type TransitionLinkProps = ComponentProps<typeof Link>;

const isModifiedClick = (event: React.MouseEvent<HTMLAnchorElement>) =>
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const TransitionLink = ({ href, onClick, ...props }: TransitionLinkProps) => {
    const { pushToUrl } = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        if (event.defaultPrevented || isModifiedClick(event)) return;

        event.preventDefault();
        pushToUrl(typeof href === "string" ? href : href.pathname ?? "/");
    };

    return <Link href={href} onClick={handleClick} {...props} />;
};

export default TransitionLink;
