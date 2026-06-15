"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import UI from '@/shared/ui/common/UIComponent'
import IconComponent from "@/shared/ui/common/IconComponent"
import TextShimmer from "@/shared/ui/common/TextShimmerComponent"

import useNavigate from "@/shared/hooks/useNavigate"
import { useGetCategoryListQuery } from "@/entities/category/api/category.query"
import { getPostRouteFlags } from "@/features/managePost"

import { useLayoutStore } from "@/shared/stores/useLayoutStore"

const Header = () => {
    const [ showMenu, setShowMenu ] = useState(false);
    
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useLayoutStore();
    const { currentPathName, pushToUrl } = useNavigate();
    const { mainViewMode, setMainViewMode, categoryFilter, setCategoryFilter  } = useLayoutStore();

    const { data: getCategoryListData } = useGetCategoryListQuery();
    const { IS_ROUTE_POST } = getPostRouteFlags(currentPathName);
    const IS_ROUTE_HOME = currentPathName === "/";
    const IS_ROUTE_RESUME = currentPathName === "/resume";
    const IS_ROUTE_MANAGER = currentPathName.startsWith("/manager");
    const MANAGER_HEADER_TITLE: Record<string, string> = {
        "/manager": "관리자",
        "/manager/category": "카테고리 관리",
        "/manager/invitation": "초대코드 관리",
        "/manager/post": "게시물 관리",
        "/manager/user": "유저 관리",
        "/manager/comment": "댓글 관리",
    };
    const managerHeaderTitle =
        MANAGER_HEADER_TITLE[currentPathName] ??
        (IS_ROUTE_MANAGER ? "관리자" : "");

    if ( IS_ROUTE_POST ) return null;

    return (
        <header>
            <div className="header-inner">
                <section className="menu flex gap-[4.8rem]">
                    <button
                        type="button"
                        onClick={() => pushToUrl("/") }
                    >
                        <IconComponent
                            type={`graphic-logo-horizontal`}
                            alt={ "코디 아지트" }
                            width={138}
                            height={42}
                        />
                    </button>

                    <section className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex items-center justify-center gap-[1.6rem]">
                        <AnimatePresence mode="popLayout">
                            { IS_ROUTE_HOME &&
                                <UI.Button
                                    onClick={() => {
                                        window.scrollTo({ top: 0, left: 0 });
                                        setMainViewMode( 1 )
                                    }}
                                    className="text-black text-[1.8rem] font-bold"
                                >
                                    <TextShimmer
                                        as="h2"
                                        duration={3}
                                        style={{
                                            color: "#000000",
                                            fontSize: "2.4rem",
                                        }}
                                        color={{
                                            start: "#000000",
                                            end: "#9393a0"
                                        }}
                                        className="font-extrabold text-[2.4rem]"
                                    >
                                        최신글
                                    </TextShimmer>
                                </UI.Button>
                            }

                            { IS_ROUTE_HOME ? <div key={"hr"} className="h-[1.6rem] w-[0.1rem] bg-[var(--color-gray-400)]" /> : "" }

                            { IS_ROUTE_HOME && mainViewMode === 1 &&
                                <motion.section
                                    key={"slider"}
                                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                                    animate={{ opacity: 1, transform: "scale(1)" }}
                                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                                    transition={{
                                        // delay: 0.05 * (i + 1),
                                        type: "spring",
                                        mass: 0.1,
                                        stiffness: 100,
                                        damping: 10,
                                    }}
                                    className="flex gap-[1.6rem] flex-1 justify-center"
                                >
                                    
                                    {/* <UI.Button
                                        onClick={() => {
                                            window.scrollTo({
                                                top: 0,
                                                left: 0,
                                                // behavior: "smooth"
                                            });
                                            setMainViewMode( 1 )
                                        }}
                                        className="text-black text-[1.8rem] font-bold"
                                    >
                                        <TextShimmer
                                            as="h2"
                                            duration={3}
                                            style={{
                                                color: "#000000",
                                                fontSize: "2.4rem",
                                            }}
                                            color={{
                                                start: "#000000",
                                                end: "#9393a0"
                                            }}
                                            className="font-extrabold text-[2.4rem]"
                                        >
                                            갓 구운 글
                                        </TextShimmer>
                                    </UI.Button> */}
                    
                                    {/* <div className='h-[1.2rem] w-[0.1rem] bg-[#ffffff50]' /> */}
                    
                                    <UI.Button
                                        onClick={() => setMainViewMode( 2 )}
                                        className="font-extrabold text-[2.4rem] text-[#00000050]"
                                    >
                                        리스트
                                    </UI.Button>
                                </motion.section>
                            }

                            { IS_ROUTE_HOME && mainViewMode === 2 &&
                                <motion.section
                                    key={"list"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        // delay: 0.05 * (i + 1),
                                        type: "spring",
                                        mass: 0.1,
                                        stiffness: 100,
                                        damping: 10,
                                    }}
                                    className="flex gap-[2.0em] flex-1 justify-center"
                                >
                                    <motion.section
                                        key="category-all"
                                        initial={{ opacity: 0, transform: "scale(0.8)" }}
                                        animate={{ opacity: 1, transform: "scale(1)" }}
                                        exit={{ opacity: 0, transform: "scale(0.8)" }}
                                        transition={{
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 100,
                                            damping: 10,
                                        }}
                                        onClick={() => setCategoryFilter(999)}
                                        className={`flex gap-[1.6rem] ${ categoryFilter === 999 ? "text-black" : "text-[#00000050]" }`}
                                    >
                                        <UI.Button className={"font-extrabold text-[2.4rem]"}>
                                            전체
                                        </UI.Button>
                                    </motion.section>
                                    { getCategoryListData?.result?.filter((e) => e.is_enabled).map((e, i) =>
                                        <motion.section
                                            key={`${e}-${i}`}
                                            initial={{ opacity: 0, transform: "scale(0.8)" }}
                                            animate={{ opacity: 1, transform: "scale(1)" }}
                                            exit={{ opacity: 0, transform: "scale(0.8)" }}
                                            transition={{
                                                delay: 0.05 * (i + 1),
                                                type: "spring",
                                                mass: 0.1,
                                                stiffness: 100,
                                                damping: 10,
                                            }}
                                            onClick={() => setCategoryFilter(e.idx)}
                                            className={`flex gap-[1.6rem] ${ categoryFilter === e.idx ? "text-black" : "text-[#00000050]" }`}
                                        >
                                            <UI.Button
                                                key={i}
                                                className={"font-extrabold text-[2.4rem]"}
                                            >
                                                { e.title }
                                            </UI.Button>
                                        </motion.section>
                                    )}
                                </motion.section>
                            }

                            { IS_ROUTE_MANAGER &&
                                <section className="flex flex-col gap-[0.8rem]">
                                    <motion.section
                                        key={"post_title"}
                                        initial={{ opacity: 0, transform: "scale(0.8)" }}
                                        animate={{ opacity: 1, transform: "scale(1)" }}
                                        exit={{ opacity: 0, transform: "scale(0.8)" }}
                                        transition={{
                                            // delay: 0.05 * (i + 1),
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 100,
                                            damping: 10,
                                        }}
                                        className="flex gap-[1.6rem] flex-1 justify-center"
                                    >
                                        <TextShimmer
                                            as="h2"
                                            duration={3}
                                            style={{
                                                color: "#000000",
                                                fontSize: "2.4rem",
                                            }}
                                            color={{
                                                start: "#000000",
                                                end: "#9393a0"
                                            }}
                                            className="font-extrabold"
                                        >
                                            {managerHeaderTitle}
                                        </TextShimmer>
                                    </motion.section>
                                </section>
                            }

                            { IS_ROUTE_RESUME &&
                                <motion.section
                                    key={"resume_title"}
                                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                                    animate={{ opacity: 1, transform: "scale(1)" }}
                                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                                    transition={{
                                        type: "spring",
                                        mass: 0.1,
                                        stiffness: 100,
                                        damping: 10,
                                    }}
                                    className="flex gap-[1.6rem] flex-1 justify-center"
                                >
                                    <TextShimmer
                                        as="h2"
                                        duration={3}
                                        style={{
                                            color: "#000000",
                                            fontSize: "2.4rem",
                                        }}
                                        color={{
                                            start: "#000000",
                                            end: "#9393a0"
                                        }}
                                        className="font-extrabold"
                                    >
                                        RESUME
                                    </TextShimmer>
                                </motion.section>
                            }

                        </AnimatePresence>
                    </section>
                </section>
            </div>
            
            {/* 모바일 버튼 */}
            <button
                className="hamburger w-[1.6rem] h-[1.6rem] px-[4.0rem] py-[2.0rem] absolute top-[50%] right-0 transform translate-x-[0] translate-y-[-50%] text-[2.4rem] z-[10000]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <div
                    className={`w-[2.4rem] h-[0.3rem] bg-[var(--color-gray-1000)] absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        showMenu ? "top-[calc(50%-0rem)] rotate-[225deg]" : "top-[calc(50%-0.8rem)] rotate-0"
                    }`}
                />
                <div
                    className={`w-[2.4rem] h-[0.3rem] bg-[var(--color-gray-1000)] absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        showMenu ? "top-[calc(50%+0rem)] rotate-[135deg]" : "top-[calc(50%+0.8rem)] rotate-0"
                    }`}
                />
            </button>
            {/* 모바일 버튼 END */}
        </header>
    )
}

export default Header