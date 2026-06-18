"use client";

import { usePathname } from "next/navigation";

import TransitionLink from "@/shared/ui/common/TransitionLink";
import { MaterialIcon } from "@/shared/ui/common/MaterialIcon";

import { MANAGER_MENUS } from "./managerMenus";

export type ManagerSidebarProfile = {
    name?: string | null;
    email?: string | null;
};

type ManagerSidebarProps = {
    profile: ManagerSidebarProfile;
};

const MENU_ICONS: Record<string, string> = {
    "/manager/category": "category",
    "/manager/invitation": "confirmation_number",
    "/manager/post": "article",
    "/manager/user": "group",
    "/manager/comment": "chat_bubble",
    "/manager/images": "image",
};

const ManagerSidebar = ({ profile }: ManagerSidebarProps) => {
    const pathname = usePathname();
    const profileName = profile.name || "관리자";
    const profileInitial = profileName.trim().charAt(0).toUpperCase() || "A";

    return (
        <aside className="flex min-h-0 flex-col border-r border-[var(--color-gray-300)] bg-[var(--color-gray-100)] px-[2rem] py-[2.4rem]">
            <TransitionLink
                href="/manager"
                className="mb-[3.2rem] flex items-center gap-[1rem] text-[1.5rem] font-bold tracking-[0.08em]"
            >
                <span className="flex size-[2.8rem] items-center justify-center rounded-[0.6rem] bg-[var(--color-gray-1000)] text-[1.2rem] text-white">
                    A
                </span>
                AGIT ADMIN
            </TransitionLink>

            <p className="mb-[1rem] px-[1rem] text-[1.1rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                Management
            </p>
            <nav className="flex flex-col gap-[0.4rem]" aria-label="관리자 메뉴">
                {MANAGER_MENUS.map((menu) => {
                    const isActive = pathname === menu.url || pathname.startsWith(`${menu.url}/`);

                    return (
                        <TransitionLink
                            key={menu.url}
                            href={menu.url}
                            aria-current={isActive ? "page" : undefined}
                            className={`flex items-center gap-[1.2rem] rounded-[0.8rem] px-[1rem] py-[1rem] text-[1.4rem] font-medium transition-colors ${
                                isActive
                                    ? "bg-white text-[var(--color-gray-1000)] shadow-[var(--shadow-normal)]"
                                    : "text-[var(--color-gray-600)] hover:bg-white/70 hover:text-[var(--color-gray-900)]"
                            }`}
                        >
                            <MaterialIcon name={MENU_ICONS[menu.url] ?? "settings"} size={18} />
                            {menu.title}
                        </TransitionLink>
                    );
                })}
            </nav>

            <div className="mt-auto flex items-center gap-[1rem] border-t border-[var(--color-gray-300)] pt-[1.6rem]">
                <span className="flex size-[3.6rem] shrink-0 items-center justify-center rounded-full bg-[var(--color-gray-800)] text-[1.3rem] font-bold text-white">
                    {profileInitial}
                </span>
                <div className="min-w-0">
                    <p className="truncate text-[1.3rem] font-semibold text-[var(--color-gray-900)]">{profileName}</p>
                    <p className="truncate text-[1.1rem] text-[var(--color-gray-500)]">{profile.email}</p>
                </div>
            </div>
        </aside>
    );
};

export default ManagerSidebar;
