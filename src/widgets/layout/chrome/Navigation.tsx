"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import UI from "@/shared/ui/common/UIComponent";
import IconComponent from "@/shared/ui/common/IconComponent";

import useNavigate from "@/shared/hooks/useNavigate";
import { useScrollProgressBar } from "@/shared/hooks/useScrollProgress";
import { getPostRouteFlags, PostSaveNavButton, usePostNavigationActions } from "@/features/managePost";
import { useBlockStore } from "@/features/managePost/model/useEditorBlockStore";

const springTransition = {
    type: "spring" as const,
    mass: 0.1,
    stiffness: 100,
    damping: 10,
};

const Navigation = () => {
    const params = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useScrollProgressBar(progressBarRef);
    const { currentPathName, pushToUrl } = useNavigate();
    const { rows } = useBlockStore();

    const { IS_ROUTE_POST, IS_ROUTE_POST_VIEW, IS_ROUTE_POST_EDIT, IS_ROUTE_POST_CREATE } = getPostRouteFlags(currentPathName);

    const postIdx = parseInt(params?.id as string);

    const { postTitle, isSavePending, savePost } = usePostNavigationActions({
        postIdx,
        isView: IS_ROUTE_POST_VIEW,
        isCreate: IS_ROUTE_POST_CREATE,
        isEdit: IS_ROUTE_POST_EDIT,
        pushToUrl,
    });

    useEffect(() => {
        if (showMenu) {
            setShowMenu(false);
        }
    }, [currentPathName]);

    if (!IS_ROUTE_POST) return null;

    return (
        <nav className="fixed tablet:top-[calc(1.6rem*3)] mobile:top-[calc(1.6rem*2)] left-[50%] tablet:px-[calc(1.6rem*2)] mobile:px-0 transform translate-x-[-50%] z-[1000] w-[calc(100dvw-(1.6rem*2))]">
            <div className="nav-inner menu flex justify-between gap-[4.8rem] w-full">
                <UI.Button
                    type="button"
                    onClick={() => pushToUrl("/")}
                    className="bg-white hover:bg-[var(--color-blue-500)] transition-colors p-[1.2rem] rounded-full shadow-[var(--shadow-normal)] flex gap-[0.8rem] items-center"
                >
                    <IconComponent
                        type={`outlined-arrow-below`}
                        alt={"나가기"}
                        width={32}
                        height={32}
                        className="rotate-90"
                    />
                    <p className="text-black mr-[1.6rem] text-[1.6rem] font-semibold tablet:block mobile:hidden">{IS_ROUTE_POST_VIEW ? "돌아가기" : "이전으로"}</p>
                </UI.Button>

                <section className="flex flex-col items-center justify-center gap-[1.6rem] flex-1 absolute left-[50%] translate-x-[-50%]">
                    <AnimatePresence mode="popLayout">
                        {IS_ROUTE_POST_VIEW && (
                            <section className="flex flex-col gap-[0.8rem]">
                                <motion.section
                                    key={"post_title_view"}
                                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                                    animate={{ opacity: 1, transform: "scale(1)" }}
                                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                                    transition={springTransition}
                                    className="flex gap-[1.6rem] flex-1 justify-center"
                                >
                                    <h2 className="tablet:text-[2.4rem] mobile:text-[2.0rem] font-bold text-white">{postTitle}</h2>
                                </motion.section>
                            </section>
                        )}

                        {IS_ROUTE_POST_EDIT && (
                            <section className="flex flex-col gap-[0.8rem]">
                                <motion.section
                                    key={"post_title_edit"}
                                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                                    animate={{ opacity: 1, transform: "scale(1)" }}
                                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                                    transition={springTransition}
                                    className="flex gap-[1.6rem] flex-1 justify-center"
                                >
                                    <h2 className="tablet:text-[2.4rem] mobile:text-[2.0rem] font-bold text-white">{`${postTitle} | 수정중`}</h2>
                                </motion.section>
                            </section>
                        )}

                        {IS_ROUTE_POST_CREATE && (
                            <section className="flex flex-col gap-[0.8rem]">
                                <motion.section
                                    key={"post_title_create"}
                                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                                    animate={{ opacity: 1, transform: "scale(1)" }}
                                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                                    transition={springTransition}
                                    className="flex gap-[1.6rem] flex-1 justify-center"
                                >
                                    <h2 className="tablet:text-[2.4rem] mobile:text-[2.0rem] font-bold text-white">생성 중</h2>
                                </motion.section>
                            </section>
                        )}
                    </AnimatePresence>

                    <div className="w-[7.2rem] h-[0.8rem] p-[0.2rem] bg-[#ffffff40] backdrop-blur-sm rounded-full shadow-[var(--shadow-normal)]">
                        <div
                            ref={progressBarRef}
                            className="h-full w-0 rounded-full bg-white shadow-[var(--shadow-normal)] will-change-[width]"
                        />
                    </div>

                    <div className={`absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,_transparent,_#000000ee,_transparent)] blur-lg z-[-1]`} />
                </section>

                {IS_ROUTE_POST_EDIT || IS_ROUTE_POST_CREATE ? (
                    <section className="menu flex gap-[0.4rem] tablet:relative tablet:flex-row tablet:right-auto mobile:absolute mobile:flex-col mobile:right-0">
                        <PostSaveNavButton
                            isCreate={IS_ROUTE_POST_CREATE}
                            isPending={isSavePending}
                            onSave={() => savePost(rows)}
                        />
                    </section>
                ) : null}
            </div>
        </nav>
    );
};

export default Navigation;
