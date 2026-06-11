import { useQuery, useMutation, useQueryClient, type QueryClient } from "@tanstack/react-query";

import { useToastStore } from "@/shared/stores/useToastStore";
import { getPostLatestListFetch, getPostListFetch, getPostManagerListFetch, deletePostManagerFetch, patchPostFetch, setPostFetch, setPostViewIncrementFetch, setPostLikeIncrementFetch } from "@/entities/post/api/post.api";

import { GetPostDetailResponseType, GetPostLatestListResponseType, GetPostListResponseType, GetPostManagerListResponseType, PatchPostResponseType, SetIncrementPostLikeType, SetIncrementPostViewType, SetPostResponseType, deletePostManagerPayloadType } from "@/entities/post/model/post.type";
import useNavigate from "@/shared/hooks/useNavigate";

const POST_QUERY_KEY = "post";

const removePostFromListCaches = (queryClient: QueryClient, deletedIdx: number) => {
    queryClient.setQueryData<GetPostListResponseType>([POST_QUERY_KEY, "useGetPostListQuery"], (old) => {
        if (!old?.result) return old;

        return {
            ...old,
            result: old.result.filter((item) => item.idx !== deletedIdx),
        };
    });

    queryClient.setQueryData<GetPostLatestListResponseType>([POST_QUERY_KEY, "useGetPostLatestListQuery"], (old) => {
        if (!old?.result) return old;

        return {
            ...old,
            result: old.result.filter((item) => item.idx !== deletedIdx),
        };
    });

    queryClient.setQueryData<GetPostManagerListResponseType>([POST_QUERY_KEY, "useGetPostManagerListQuery"], (old) => {
        if (!old?.result) return old;

        return {
            ...old,
            result: old.result.filter((item) => item.idx !== deletedIdx),
        };
    });

    queryClient.removeQueries({
        queryKey: [POST_QUERY_KEY, "useGetPostDetailQuery", deletedIdx],
    });

    // 이전에 잘못 사용하던 쿼리 키 캐시 정리
    queryClient.removeQueries({
        queryKey: ["comment", "useGetPostLatestListQuery"],
    });
};

/**
 * 포스트 - 글 목록 불러오기
 */
export const useGetPostListQuery = () => {
    const MUTATION_KEY = "post";

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery<GetPostListResponseType>({
        queryKey: [MUTATION_KEY, "useGetPostListQuery"],
        queryFn: () => getPostListFetch(),
        staleTime: 0,
        throwOnError: false,
    });

    return { data, isLoading, isError, error, isFetching, refetch };
};

/**
 * 포스트 - 최신 글 목록 불러오기
 */
export const useGetPostLatestListQuery = (initialData?: GetPostLatestListResponseType) => {
    const hasValidInitialData = initialData?.resultCode === "SUCCESS";

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery<GetPostLatestListResponseType>({
        queryKey: [POST_QUERY_KEY, "useGetPostLatestListQuery"],
        queryFn: () => getPostLatestListFetch(),
        staleTime: 0,
        initialData: hasValidInitialData ? initialData : undefined,
        throwOnError: false,
    });

    return { data, isLoading, isError, error, isFetching, refetch };
};

/**
 * 포스트 - 글 상세 불러오기
 */
export const useGetPostDetailQuery = (postIdx?: number) => {
    const MUTATION_KEY = "post";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetPostDetailResponseType>({
        queryKey: [MUTATION_KEY, "useGetPostDetailQuery", postIdx],
        queryFn: () => getPostListFetch(postIdx),
        staleTime: 0,
        enabled: !!postIdx,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 글 생성
 */
export const useSetPostQuery = () => {
    const { replaceToUrl } = useNavigate();
    const { setToast } = useToastStore();

    const MUTATION_KEY = "post";
    const queryClient = useQueryClient();

    const {
        data,
        mutate,
        mutateAsync,
        error,
        isError,
        isSuccess,
        isIdle,
        isPending,
        isPaused,
        reset,
    } = useMutation({
        mutationKey: [MUTATION_KEY, "useSetProdGroupSimpleQuery"],
        mutationFn: (payload: any) => setPostFetch(payload),
        onSuccess: (data) => {
            const RESULT = data?.result?.statusCode;

            if (RESULT) {
                setToast({ msg: "게시물을 생성했어요", time: 2 });
                replaceToUrl(`/post/${data.result.postIdx}`);
            } else {
                setToast({ msg: "글 등록에 문제가 발생했습니다.", time: 2 });
            }

            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "서버 통신 중 오류가 발생했습니다.", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

/**
 * 포스트 - 글 수정
 */
export const usePatchPostQuery = () => {
    const { replaceToUrl } = useNavigate();
    const { setToast } = useToastStore();

    const MUTATION_KEY = "post";
    const queryClient = useQueryClient();

    const {
        data,
        mutate,
        mutateAsync,
        error,
        isError,
        isSuccess,
        isIdle,
        isPending,
        isPaused,
        reset,
    } = useMutation({
        mutationKey: [MUTATION_KEY, "usePatchPostQuery"],
        mutationFn: (payload: { data: any; idx: number }) => patchPostFetch(payload),
        onSuccess: (data) => {
            const RESULT = data?.result?.statusCode;

            if (RESULT) {
                setToast({ msg: "게시물을 수정했어요.", time: 2 });
                replaceToUrl(`/post/${data.result.postIdx}`);
            } else {
                setToast({ msg: "글 등록에 문제가 발생했습니다.", time: 2 });
            }
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useSetIncrementViewQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "post";
    const queryClient = useQueryClient();

    const {
        data,
        mutate,
        mutateAsync,
        error,
        isError,
        isSuccess,
        isIdle,
        isPending,
        isPaused,
        reset,
    } = useMutation({
        mutationKey: [MUTATION_KEY, "useSetIncrementViewQuery"],
        mutationFn: (payload: { postId: number; userId?: string }) => setPostViewIncrementFetch(payload),
        onSuccess: () => {
            setToast({ msg: "조회수를 수정했어요.", time: 2 });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useSetLikeIncrementQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "post";
    const queryClient = useQueryClient();

    const {
        data,
        mutate,
        mutateAsync,
        error,
        isError,
        isSuccess,
        isIdle,
        isPending,
        isPaused,
        reset,
    } = useMutation({
        mutationKey: [MUTATION_KEY, "useSetLikeIncrementQuery"],
        mutationFn: (payload: { postId: number; userId?: string }) => setPostLikeIncrementFetch(payload),
        onSuccess: (data) => {
            if (data?.result?.alreadyLiked) {
                setToast({ msg: "이미 좋아요를 눌렀어요", time: 2 });
            } else if (data?.result?.likesIncremented) {
                setToast({ msg: "좋아요!", time: 2 });
            }
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useGetPostManagerListQuery = () => {
    const MUTATION_KEY = "post";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetPostManagerListResponseType>({
        queryKey: [MUTATION_KEY, "useGetPostManagerListQuery"],
        queryFn: () => getPostManagerListFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

export const useDeletePostManagerQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "post";
    const queryClient = useQueryClient();

    const {
        data,
        mutate,
        mutateAsync,
        error,
        isError,
        isSuccess,
        isIdle,
        isPending,
        isPaused,
        reset,
    } = useMutation({
        mutationKey: [MUTATION_KEY, "useDeletePostManagerQuery"],
        mutationFn: (payload: deletePostManagerPayloadType) => deletePostManagerFetch(payload),
        onSuccess: async (_, variables) => {
            removePostFromListCaches(queryClient, variables.idx);
            setToast({ msg: "게시물을 삭제했어요", time: 2 });
            await queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
