import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { AgitRoutes } from "@/shared/constants/entityKeys";
import {
    deleteCommentManagerFetch,
    getCommentLatestListFetch,
    getCommentListFetch,
    getCommentManagerListFetch,
    setCommentFetch,
} from "@/entities/comment/api/comment.api";
import {
    DeleteCommentManagerPayload,
    GetCommentDetailResponse,
    GetCommentLatestListResponse,
    GetCommentManagerListResponse,
} from "@/entities/comment/model/comment.type";
import { useToastStore } from "@/shared/stores/useToastStore";

export const useGetCommentDetailQuery = (commentIdx?: number) => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetCommentDetailResponse>({
        queryKey: [AgitRoutes.KEY_COMMENT, "detail", commentIdx],
        queryFn: () => getCommentListFetch(commentIdx!),
        staleTime: 0,
        enabled: !!commentIdx,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

export const useGetCommentLatestListQuery = () => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetCommentLatestListResponse>({
        queryKey: [AgitRoutes.KEY_COMMENT, "latest"],
        queryFn: () => getCommentLatestListFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

export const useSetCommentQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_COMMENT, "set"],
        mutationFn: (payload: unknown) => setCommentFetch(payload),
        onSuccess: () => {
            setToast({ msg: "댓글을 생성했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_COMMENT] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useGetCommentManagerListQuery = () => {
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery<GetCommentManagerListResponse>({
        queryKey: [AgitRoutes.KEY_COMMENT, "manager", "list"],
        queryFn: () => getCommentManagerListFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, error, isFetching, refetch };
};

export const useDeleteCommentManagerQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_COMMENT, "manager", "delete"],
        mutationFn: (payload: DeleteCommentManagerPayload) => deleteCommentManagerFetch(payload),
        onSuccess: () => {
            setToast({ msg: "댓글을 삭제했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_COMMENT] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
