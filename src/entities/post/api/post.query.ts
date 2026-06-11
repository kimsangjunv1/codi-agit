import { useQuery, useMutation, useQueryClient, type QueryClient } from "@tanstack/react-query";

import { AgitRoutes } from "@/shared/constants/entityKeys";
import { useToastStore } from "@/shared/stores/useToastStore";
import {
    deletePostManagerFetch,
    getPostDetailFetch,
    getPostLatestListFetch,
    getPostListFetch,
    getPostManagerListFetch,
    patchPostFetch,
    setPostFetch,
    setPostLikeIncrementFetch,
    setPostViewIncrementFetch,
} from "@/entities/post/api/post.api";
import {
    DeletePostManagerPayload,
    GetPostDetailResponse,
    GetPostLatestListResponse,
    GetPostListResponse,
    GetPostManagerListResponse,
} from "@/entities/post/model/post.type";
import useNavigate from "@/shared/hooks/useNavigate";

const removePostFromListCaches = (queryClient: QueryClient, deletedIdx: number) => {
    queryClient.setQueryData<GetPostListResponse>([AgitRoutes.KEY_POST, "list"], (old) => {
        if (!old?.result) return old;

        return {
            ...old,
            result: old.result.filter((item) => item.idx !== deletedIdx),
        };
    });

    queryClient.setQueryData<GetPostLatestListResponse>([AgitRoutes.KEY_POST, "latest"], (old) => {
        if (!old?.result) return old;

        return {
            ...old,
            result: old.result.filter((item) => item.idx !== deletedIdx),
        };
    });

    queryClient.setQueryData<GetPostManagerListResponse>([AgitRoutes.KEY_POST, "manager", "list"], (old) => {
        if (!old?.result) return old;

        return {
            ...old,
            result: old.result.filter((item) => item.idx !== deletedIdx),
        };
    });

    queryClient.removeQueries({
        queryKey: [AgitRoutes.KEY_POST, "detail", deletedIdx],
    });
};

export const useGetPostListQuery = () => {
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery<GetPostListResponse>({
        queryKey: [AgitRoutes.KEY_POST, "list"],
        queryFn: () => getPostListFetch(),
        staleTime: 0,
        throwOnError: false,
    });

    return { data, isLoading, isError, error, isFetching, refetch };
};

export const useGetPostLatestListQuery = (initialData?: GetPostLatestListResponse) => {
    const hasValidInitialData = initialData?.resultCode === "SUCCESS";

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery<GetPostLatestListResponse>({
        queryKey: [AgitRoutes.KEY_POST, "latest"],
        queryFn: () => getPostLatestListFetch(),
        staleTime: 0,
        initialData: hasValidInitialData ? initialData : undefined,
        throwOnError: false,
    });

    return { data, isLoading, isError, error, isFetching, refetch };
};

export const useGetPostDetailQuery = (postIdx?: number) => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetPostDetailResponse>({
        queryKey: [AgitRoutes.KEY_POST, "detail", postIdx],
        queryFn: () => getPostDetailFetch(postIdx!),
        staleTime: 0,
        enabled: !!postIdx,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

export const useSetPostQuery = () => {
    const { replaceToUrl } = useNavigate();
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_POST, "set"],
        mutationFn: (payload: unknown) => setPostFetch(payload),
        onSuccess: (data) => {
            const RESULT = data?.result?.statusCode;

            if (RESULT) {
                setToast({ msg: "게시물을 생성했어요", time: 2 });
                replaceToUrl(`/post/${data.result.postIdx}`);
            } else {
                setToast({ msg: "글 등록에 문제가 발생했습니다.", time: 2 });
            }

            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_POST] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "서버 통신 중 오류가 발생했습니다.", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const usePatchPostQuery = () => {
    const { replaceToUrl } = useNavigate();
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_POST, "patch"],
        mutationFn: (payload: { data: unknown; idx: number }) => patchPostFetch(payload),
        onSuccess: (data) => {
            const RESULT = data?.result?.statusCode;

            if (RESULT) {
                setToast({ msg: "게시물을 수정했어요.", time: 2 });
                replaceToUrl(`/post/${data.result.postIdx}`);
            } else {
                setToast({ msg: "글 등록에 문제가 발생했습니다.", time: 2 });
            }
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_POST] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useSetIncrementViewQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_POST, "increment-view"],
        mutationFn: (payload: { postId: number; userId?: string }) => setPostViewIncrementFetch(payload),
        onSuccess: () => {
            setToast({ msg: "조회수를 수정했어요.", time: 2 });
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_POST] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useSetLikeIncrementQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_POST, "increment-like"],
        mutationFn: (payload: { postId: number; userId?: string }) => setPostLikeIncrementFetch(payload),
        onSuccess: (data) => {
            if (data?.result?.alreadyLiked) {
                setToast({ msg: "이미 좋아요를 눌렀어요", time: 2 });
            } else if (data?.result?.likesIncremented) {
                setToast({ msg: "좋아요!", time: 2 });
            }
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_POST] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useGetPostManagerListQuery = () => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetPostManagerListResponse>({
        queryKey: [AgitRoutes.KEY_POST, "manager", "list"],
        queryFn: () => getPostManagerListFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

export const useDeletePostManagerQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_POST, "manager", "delete"],
        mutationFn: (payload: DeletePostManagerPayload) => deletePostManagerFetch(payload),
        onSuccess: async (_, variables) => {
            removePostFromListCaches(queryClient, variables.idx);
            setToast({ msg: "게시물을 삭제했어요", time: 2 });
            await queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_POST] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
