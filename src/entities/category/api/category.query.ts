import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { AgitRoutes } from "@/shared/constants/entityKeys";
import { useToastStore } from "@/shared/stores/useToastStore";
import {
    deleteCategoryFetch,
    getCategoryListFetch,
    getCategoryListOnManagerFetch,
    patchCategoryFetch,
    setCategoryFetch,
} from "@/entities/category/api/category.api";
import {
    DeleteCategoryPayload,
    GetCategoryListOnManagerResponse,
    GetCategoryListResponse,
    PatchCategoryPayload,
    SetCategoryPayload,
} from "@/entities/category/model/category.type";

export const useGetCategoryListQuery = () => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetCategoryListResponse>({
        queryKey: [AgitRoutes.KEY_CATEGORY, "list"],
        queryFn: () => getCategoryListFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

export const useGetCategoryListOnManagerQuery = () => {
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery<GetCategoryListOnManagerResponse>({
        queryKey: [AgitRoutes.KEY_CATEGORY, "manager", "list"],
        queryFn: () => getCategoryListOnManagerFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, error, isFetching, refetch };
};

export const useSetCategoryQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_CATEGORY, "set"],
        mutationFn: (payload: SetCategoryPayload) => setCategoryFetch(payload),
        onSuccess: () => {
            setToast({ msg: "카테고리를 생성했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_CATEGORY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const usePatchCategoryQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_CATEGORY, "patch"],
        mutationFn: (payload: PatchCategoryPayload) => patchCategoryFetch(payload),
        onSuccess: () => {
            setToast({ msg: "카테고리를 수정했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_CATEGORY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useDeleteCategoryQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_CATEGORY, "delete"],
        mutationFn: (payload: DeleteCategoryPayload) => deleteCategoryFetch(payload),
        onSuccess: () => {
            setToast({ msg: "카테고리를 삭제했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_CATEGORY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
