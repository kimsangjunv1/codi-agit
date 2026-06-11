"use client"

import { useParams, useRouter } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import UI from "@/shared/ui/common/UIComponent"
import IconComponent from "@/shared/ui/common/IconComponent"

import useNavigate from "@/shared/hooks/useNavigate"
import useScrollProgress from "@/shared/hooks/useScrollProgress"
import { useDeletePostManagerQuery, useGetPostDetailQuery, usePatchPostQuery, useSetLikeIncrementQuery, useSetPostQuery } from "@/entities/post/api/post.query"
import { preparePostPayloadForSave } from "@/features/managePost/lib/preparePostSave"

import { useCreatePostStore } from "@/shared/stores/useCreatePostStore"
import { useModalStore } from "@/shared/stores/useModalStore"
import { useBlockStore } from "@/widgets/post/model/useEditorBlockStore"
import { useToastStore } from "@/shared/stores/useToastStore"

const Navigation = () => {
    const params = useParams();
    const router = useRouter();

    const [ showMenu, setShowMenu ] = useState(false);
    
    const { scrollValue } = useScrollProgress();
    const { currentPathName, pushToUrl } = useNavigate();

    const { rows } = useBlockStore();
    const { setToast } = useToastStore();
    const { setModal } = useModalStore();
    const { title, summary, thumbnail, category_idx, post_idx } = useCreatePostStore();
    
    const { mutateAsync: patchPostFetchAsync, isPending: isPatchPending } = usePatchPostQuery();
    const { mutateAsync: setPostFetchAsync, isPending: isSetPending } = useSetPostQuery();
    const { mutate: likeIncrementFetch } = useSetLikeIncrementQuery();
    const { mutateAsync: deletePostFetchAsync, isPending: isDeletePending } = useDeletePostManagerQuery();
    const { data: getPostListData } = useGetPostDetailQuery(parseInt( (params?.id) as string ));

    const IS_ROUTE_POST = /\/post(\/|$)/.test(currentPathName);
    const IS_ROUTE_POST_VIEW = currentPathName.includes("post") && !currentPathName.includes("modify") && !currentPathName.includes("create");
    const IS_ROUTE_POST_EDIT = currentPathName.includes("post") && currentPathName.includes("modify");
    const IS_ROUTE_POST_CREATE = currentPathName.includes("post") && currentPathName.includes("create");

    const postId = parseInt(params?.id as string);

    const AdditionalFunctionList = [
        {
            title: "공유하기",
            icon: "outlined-copy",
            action: "share" as const,
        },
        {
            title: "게시물 삭제하기",
            icon: "outlined-cross",
            action: "delete" as const,
        },
        {
            title: "좋아요",
            icon: "outlined-like",
            action: "like" as const,
        },
        {
            title: "수정하기",
            icon: "outlined-edit",
            action: "edit" as const,
        },
    ];

    const deletePostModal = () => {
        const postTitle = getPostListData?.result?.title;

        setModal({
            type: "CHECK",
            title: "게시물을 삭제할까요?",
            content: (
                <article className="flex flex-col gap-[1.2rem]">
                    <p className="text-[var(--color-gray-600)]">삭제 대상: {postTitle}</p>
                    <p className="text-[1.2rem] text-[var(--color-gray-500)]">
                        연결된 댓글과 조회 기록도 함께 삭제됩니다.
                    </p>
                </article>
            ),
            cancel: { text: "취소" },
            confirm: {
                text: "삭제하기",
                onClick: async () => {
                    await deletePostFetchAsync({ idx: postId });
                    router.refresh();
                    pushToUrl("/");
                },
            },
            isOpen: true,
        });
    };

    useEffect(() => {
        if ( showMenu ) {
            setShowMenu( false )
        }
    }, [ currentPathName ])

    if ( !IS_ROUTE_POST ) return null;

    return (
        <nav className="fixed tablet:top-[calc(1.6rem*3)] mobile:top-[calc(1.6rem*2)] left-[50%] tablet:px-[calc(1.6rem*2)] mobile:px-0 transform translate-x-[-50%] z-[1000] w-[calc(100dvw-(1.6rem*2))]">
            <div className="nav-inner menu flex justify-between gap-[4.8rem] w-full">
                <UI.Button
                    type="button"
                    onClick={() => pushToUrl("/") }
                    className="bg-[#00000090] hover:bg-[var(--color-blue-500)] transition-colors p-[1.2rem] rounded-full flex gap-[0.8rem] items-center"
                >
                    <IconComponent
                        type={`outlined-arrow-below`}
                        alt={ "나가기" }
                        width={32}
                        height={32}
                        className="rotate-90 invert-100"
                    />
                    <p className="text-white mr-[1.6rem] text-[1.6rem] font-semibold tablet:block mobile:hidden">{ IS_ROUTE_POST_VIEW ? "돌아가기" : "이전으로"}</p>
                </UI.Button>

                <section className="flex flex-col items-center justify-center gap-[1.6rem] flex-1 absolute left-[50%] translate-x-[-50%]">
                    <AnimatePresence mode="popLayout">
                        { IS_ROUTE_POST_VIEW &&
                            <section className="flex flex-col gap-[0.8rem]">
                                <motion.section
                                    key={"post_title_view"}
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
                                    <h2 className="tablet:text-[2.4rem] mobile:text-[2.0rem] font-bold text-white">{ getPostListData?.result?.title }</h2>
                                </motion.section>
                            </section>
                        }

                        { IS_ROUTE_POST_EDIT &&
                            <section className="flex flex-col gap-[0.8rem]">
                                <motion.section
                                    key={"post_title_edit"}
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
                                    <h2 className="tablet:text-[2.4rem] mobile:text-[2.0rem] font-bold text-white">{`${ getPostListData?.result?.title } | 수정중`}</h2>
                                </motion.section>
                            </section>
                        }

                        { IS_ROUTE_POST_CREATE &&
                            <section className="flex flex-col gap-[0.8rem]">
                                <motion.section
                                    key={"post_title_create"}
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
                                    <h2 className="tablet:text-[2.4rem] mobile:text-[2.0rem] font-bold text-white">생성 중</h2>
                                </motion.section>
                            </section>
                        }
                    </AnimatePresence>

                    <div className="w-[7.2rem] h-[0.8rem] p-[0.2rem] bg-[#ffffff40] backdrop-blur-sm rounded-full shadow-[var(--shadow-normal)]">
                        <motion.div
                            className="h-full shadow-[var(--shadow-normal)] rounded-full"
                            animate={{
                                width: `${ scrollValue }%`,
                                backgroundColor: scrollValue >= 99 ? IS_ROUTE_POST_VIEW ? "#000000" : "var(--color-brand-500)" : IS_ROUTE_POST_VIEW ? "#ffffff" : "#000000"
                                // backgroundColor: scrollValue >= 99 ? "var(--color-brand-500)" : "#ffffff"
                            }}
                            transition={{
                                // delay: 0.05 * (i + 1),
                                type: "spring",
                                mass: 0.1,
                                stiffness: 100,
                                damping: 10,
                            }}
                        />
                    </div>
                    
                    <div className={`absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,_transparent,_#000000ee,_transparent)] blur-lg z-[-1]`} />
                </section>

                <section className="menu flex gap-[0.4rem] tablet:relative tablet:flex-row tablet:right-auto mobile:absolute mobile:flex-col mobile:right-0">
                    { IS_ROUTE_POST_EDIT || IS_ROUTE_POST_CREATE ? (
                        <Fragment>
                            <UI.Button
                                type="button"
                                disabled={isPatchPending || isSetPending}
                                onClick={async () => {
                                    if ( !title ) {
                                        setToast({ msg: "제목을 입력해주세요", time: 2 })

                                        return;
                                    }

                                    if ( !summary ) {
                                        setToast({ msg: "요약을 입력해주세요", time: 2 })
                                        
                                        return;
                                    }

                                    if ( !thumbnail ) {
                                        setToast({ msg: "썸네일을 선택해주세요", time: 2 })
                                        
                                        return;
                                    }

                                    try {
                                        const PAYLOAD = await preparePostPayloadForSave({
                                            title,
                                            summary,
                                            thumbnail,
                                            category_idx,
                                            contents: rows,
                                        });

                                        if ( IS_ROUTE_POST_CREATE ) {
                                            await setPostFetchAsync(PAYLOAD);
                                        } else {
                                            await patchPostFetchAsync({ data: PAYLOAD, idx: post_idx });
                                        }
                                    } catch (error) {
                                        const message = error instanceof Error ? error.message : "저장 중 오류가 발생했습니다.";
                                        setToast({ msg: message, time: 2 });
                                    }
                                }}
                                className="bg-[#00000090] hover:bg-[var(--color-blue-500)] transition-colors p-[1.2rem] rounded-full flex gap-[0.8rem] items-center disabled:opacity-60"
                            >
                                <IconComponent
                                    type={`outlined-arrow-below`}
                                    alt={ "나가기" }
                                    width={32}
                                    height={32}
                                    className="rotate-90 invert-100"
                                />
                                
                                <p className="text-white mr-[1.6rem] text-[1.6rem] font-semibold tablet:block mobile:hidden">{ IS_ROUTE_POST_CREATE ? "작성하기" : "수정완료"}</p>
                            </UI.Button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            { AdditionalFunctionList.map((e) => {
                                const isLiked = e.action === "like" && getPostListData?.result?.alreadyLiked;
                                const isDelete = e.action === "delete";

                                return (
                                    <UI.Button
                                        key={ e.action }
                                        type="button"
                                        disabled={ isDelete && isDeletePending }
                                        className={`flex justify-center items-center transition-colors rounded-full gap-[0.8rem] w-[5.6rem] h-[5.6rem] disabled:opacity-60 ${
                                            isLiked
                                                ? "bg-[var(--color-pink-500)]"
                                                : isDelete
                                                  ? "bg-[#00000090] hover:bg-[var(--color-pink-500)]"
                                                  : "bg-[#00000090] hover:bg-[var(--color-blue-500)]"
                                        }`}
                                        onClick={() => {
                                            if ( e.action === "like" ) {
                                                likeIncrementFetch({ postId });
                                            } else if ( e.action === "edit" ) {
                                                pushToUrl(`/post/${post_idx}/modify`);
                                            } else if ( e.action === "delete" ) {
                                                deletePostModal();
                                            }
                                        }}
                                    >
                                        <IconComponent
                                            type={ e.icon }
                                            alt={ e.title }
                                            width={ 24 }
                                            height={ 24 }
                                            className="invert-100"
                                        />
                                    </UI.Button>
                                );
                            })}
                        </Fragment>
                    )}
                </section>
            </div>
        </nav>
    )
}

export default Navigation