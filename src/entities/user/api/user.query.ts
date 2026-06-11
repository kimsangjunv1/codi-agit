import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AgitRoutes } from "@/shared/constants/entityKeys";
import { getUserManagerListFetch, setUserFetch } from "@/entities/user/api/user.api";
import { GetUserManagerListResponse, SetUserPayload } from "@/entities/user/model/user.type";
import { useToastStore } from "@/shared/stores/useToastStore";

export const useSetUserQuery = () => {
    const { setToast } = useToastStore();
    const queryClient = useQueryClient();

    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [AgitRoutes.KEY_USER, "set"],
        mutationFn: (payload: SetUserPayload) => setUserFetch(payload),
        onSuccess: () => {
            setToast({ msg: "계정을 생성했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [AgitRoutes.KEY_USER] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useGetUserManagerListQuery = () => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetUserManagerListResponse>({
        queryKey: [AgitRoutes.KEY_USER, "manager", "list"],
        queryFn: () => getUserManagerListFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};
